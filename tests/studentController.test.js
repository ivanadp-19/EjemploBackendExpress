const StudentController = require('../controllers/studentController');

describe('StudentController', () => {
  let mockService;
  let controller;

  beforeEach(() => {
    mockService = {
      getAllStudents: jest.fn(),
      getStudentByMatricula: jest.fn(),
      createStudent: jest.fn(),
      updateStudent: jest.fn(),
      deleteStudent: jest.fn(),
    };
    controller = new StudentController(mockService);
  });

  test('should get all students', async () => {
    const students = [
      { matricula: 'A001', nombre: 'Juan Pérez', estatus: 'Activo' }
    ];
    mockService.getAllStudents.mockResolvedValue(students);

    const result = await controller.getAll();
    expect(result).toEqual(students);
    expect(mockService.getAllStudents).toHaveBeenCalledTimes(1);
  });

  test('should get student by matricula', async () => {
    const student = { matricula: 'A001', nombre: 'Juan Pérez', estatus: 'Activo' };
    mockService.getStudentByMatricula.mockResolvedValue(student);

    const result = await controller.getByMatricula('A001');
    expect(result).toEqual(student);
    expect(mockService.getStudentByMatricula).toHaveBeenCalledWith('A001');
  });

  test('should throw an error if student not found', async () => {
    mockService.getStudentByMatricula.mockResolvedValue(null);

    await expect(controller.getByMatricula('A999')).rejects.toThrow('Estudiante no encontrado');
  });

  test('should create a student', async () => {
    const newStudent = { matricula: 'A004', nombre: 'Ana López', estatus: 'Activo' };
    mockService.createStudent.mockResolvedValue(newStudent);

    const result = await controller.create('Ana López', 'Activo');
    expect(result).toEqual(newStudent);
    expect(mockService.createStudent).toHaveBeenCalledWith('Ana López', 'Activo');
  });

  test('should update a student', async () => {
    const updatedStudent = { matricula: 'A001', nombre: 'Juan Pérez', estatus: 'Inactivo' };
    mockService.updateStudent.mockResolvedValue(updatedStudent);

    const result = await controller.update('A001', 'Juan Pérez', 'Inactivo');
    expect(result).toEqual(updatedStudent);
    expect(mockService.updateStudent).toHaveBeenCalledWith('A001', 'Juan Pérez', 'Inactivo');
  });

  test('should throw error when updating non-existent student', async () => {
    mockService.updateStudent.mockResolvedValue(null);

    await expect(controller.update('A999', 'No Existe', 'Activo')).rejects.toThrow('Estudiante no encontrado');
  });

  test('should delete a student', async () => {
    mockService.deleteStudent.mockResolvedValue(true);

    const result = await controller.delete('A001');
    expect(result).toEqual({ message: 'Estudiante eliminado' });
    expect(mockService.deleteStudent).toHaveBeenCalledWith('A001');
  });

  test('should throw error when deleting non-existent student', async () => {
    mockService.deleteStudent.mockResolvedValue(false);

    await expect(controller.delete('A999')).rejects.toThrow('Estudiante no encontrado');
  });
});

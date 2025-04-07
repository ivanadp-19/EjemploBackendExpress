class StudentController {
  constructor(studentService) {
    this.studentService = studentService;
  }

  async getAll() {
    return await this.studentService.getAllStudents();
  }

  async getByMatricula(matricula) {
    const student = await this.studentService.getStudentByMatricula(matricula);
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }
    return student;
  }

  async create(nombre, estatus) {
    return await this.studentService.createStudent(nombre, estatus);
  }

  async update(matricula, nombre, estatus) {
    const student = await this.studentService.updateStudent(matricula, nombre, estatus);
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }
    return student;
  }

  async delete(matricula) {
    const deleted = await this.studentService.deleteStudent(matricula);
    if (!deleted) {
      throw new Error('Estudiante no encontrado');
    }
    return { message: 'Estudiante eliminado' };
  }
}

module.exports = StudentController;

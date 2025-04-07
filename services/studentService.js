const students = require('../mockData');

class StudentService {
  async getAllStudents() {
    return students;
  }

  async getStudentByMatricula(matricula) {
    return students.find(student => student.matricula === matricula) || null;
  }

  async createStudent(nombre, estatus) {
    const matricula = `A${String(students.length + 1).padStart(3, '0')}`;
    const newStudent = { matricula, nombre, estatus };
    students.push(newStudent);
    return newStudent;
  }

  async updateStudent(matricula, nombre, estatus) {
    const index = students.findIndex(student => student.matricula === matricula);
    if (index === -1) return null;
    
    students[index] = { ...students[index], nombre, estatus };
    return students[index];
  }

  async deleteStudent(matricula) {
    const index = students.findIndex(student => student.matricula === matricula);
    if (index === -1) return false;
    
    students.splice(index, 1);
    return true;
  }
}

module.exports = StudentService;

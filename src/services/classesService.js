const classesRepository = require('../repositories/classesRepository');
const ApiError = require('../utils/ApiError');

class ClassesService {
  async getAll() {
    const classes = await classesRepository.getAll();

    if (!classes || classes.length === 0) {
      throw new ApiError(404, 'Não há classes cadastradas!', 'classesService.getAll');
    }

    return classes;
  }

  async getRandomClass() {
    const classe = await classesRepository.getRandomClass();

    if (!classe || classe.length === 0) {
      throw new ApiError(404, 'Não foi possível obter uma classe aleatória!', 'classesService.getRandomClass');
    }

    return classe;
  }
}

module.exports = new ClassesService();
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

  async getById(id) {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId)) {
      throw new ApiError(400, 'ID inválido!', 'classesService.getById');
    }

    const classe = await classesRepository.getById(parsedId);

    if (!classe || classe.length === 0) {
      throw new ApiError(404, 'Classe não encontrada!', 'classesService.getById');
    }

    return classe;
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
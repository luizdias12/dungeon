const classesRepository = require('../repositories/classesRepository');
const ApiError = require('../utils/ApiError');
const { buildPaginationMeta } = require('../helpers/paginationHelper');

class ClassesService {
  async getAll(pagination) {
    const { data, total } = await classesRepository.getAll(pagination);

    const lastPage = pagination.limit > 0
      ? Math.ceil(total / pagination.limit)
      : 0;

    return {
      data,
      meta: buildPaginationMeta(total, pagination)
    };
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
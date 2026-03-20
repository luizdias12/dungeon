const namesRepository = require('../repositories/namesRepository');
const ApiError = require('../utils/ApiError');
const { buildPaginationMeta } = require('../helpers/paginationHelper');

class NamesService {
  async getAll(pagination) {
    const { data, total } = await namesRepository.getAll(pagination);

    const lastPage = pagination.limit > 0
      ? Math.ceil(total / pagination.limit)
      : 0;

    return {
      data,
      meta: buildPaginationMeta(total, pagination)
    };
  }

  async getRandomName(genderId, raceId) {
    const name = await namesRepository.getRandomName(genderId, raceId);

    if (!name || name.length === 0) {
      throw new ApiError(404, 'Não foi possível obter um nome aleatório!', 'namesService.getRandomName');
    }

    return name;
  }
}

module.exports = new NamesService();
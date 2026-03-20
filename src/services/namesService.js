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

  async getById(id) {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId)) {
      throw new ApiError(400, 'ID inválido!', 'namesService.getById');
    }

    const name = await namesRepository.getById(parsedId);

    if (!name || name.length === 0) {
      throw new ApiError(404, 'Nome não encontrado!', 'namesService.getById');
    }

    return name;
  }

  async getByRace(raceId) {
    const parsedRaceId = Number(raceId);

    if (!Number.isInteger(parsedRaceId)) {
      throw new ApiError(400, 'ID de raça inválido!', 'namesService.getByRace');
    }

    const name = await namesRepository.getByRace(parsedRaceId);

    if (!name || name.length === 0) {
      throw new ApiError(404, 'Nenhum nome encontrado para essa raça!', 'namesService.getByRace');
    }

    return name;
  }

  async getByGender(genderId) {
    const parsedGenderId = Number(genderId);

    if (!Number.isInteger(parsedGenderId)) {
      throw new ApiError(400, 'ID de gênero inválido!', 'namesService.getByGender');
    }

    const name = await namesRepository.getByGender(parsedGenderId);

    if (!name || name.length === 0) {
      throw new ApiError(404, 'Nenhum nome encontrado para esse gênero!', 'namesService.getByGender');
    }

    return name;
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
const racesRepository = require('../repositories/racesRepository');
const ApiError = require('../utils/ApiError');

class RacesService {
  async getAll() {
    const races = await racesRepository.getAll();

    if (!races || races.length === 0) {
      throw new ApiError(404, 'Nao ha raças cadastradas!', 'raceService.getAll');
    }

    return races;
  }

  async getById(id) {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId)) {
      throw new ApiError(400, 'ID inválido!', 'raceService.getById');
    }

    const race = await racesRepository.getById(parsedId);

    if (!race || race.length === 0) {
      throw new ApiError(404, 'Raça não encontrada!', 'raceService.getById');
    }

    return race;
  }

  async getRandomRace() {
    const race = await racesRepository.getRandomRace();

    if (!race || race.length === 0) {
      throw new ApiError(404, 'Não foi possível obter uma raça aleatória!', 'raceService.getRandomRace');
    }

    return race;  
  }
}

module.exports = new RacesService();
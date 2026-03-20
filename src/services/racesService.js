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

  async getRandomRace() {
    const race = await racesRepository.getRandomRace();

    if (!race || race.length === 0) {
      throw new ApiError(404, 'Não foi possível obter uma raça aleatória!', 'raceService.getRandomRace');
    }

    return race;  
  }
}

module.exports = new RacesService();
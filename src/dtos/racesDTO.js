function racesResponseDTO(race) {
  return {
    id: race.id,
    nome: race.race,
  };
}

function racesDTO(data) {
    if(Array.isArray(data)) {
        return data.map(racesResponseDTO);
    }
  return racesResponseDTO(data);
}

module.exports = {
  racesDTO
};

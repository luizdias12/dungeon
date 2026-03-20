function classesResponseDTO(classe) {
  return {
    id: classe.id,
    nome: classe.class,
    habilidadeChave1: classe.key_ability,
    habilidadeChave2: classe.key_ability_2,
  };
}

function classesDTO(data) {
    if(Array.isArray(data)) {
        return data.map(classesResponseDTO);
    }
  return classesResponseDTO(data);
}

module.exports = {
  classesDTO
};
function namesDTO(data) {
  if (!Array.isArray(data)) {
    data = [data];
  }

  return data.map(name => ({
    id: name.id,
    idGenero: name.gender_id,
    idRaca: name.race_id,
    nome: name.first_name
  }));
}

module.exports = {
  namesDTO
};
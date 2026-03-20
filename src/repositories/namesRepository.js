const db = require('../config/db');
const BaseRepository = require('./baseRepository');

const baseRepository = new BaseRepository(db, 'names');

class NamesRepository {
  async getAll(pagination) {
    return baseRepository.paginate(pagination, {
      searchFields: ['name'],
      sortFields: ['id', 'name', 'gender_id', 'race_id'],
      filterFields: ['gender_id', 'race_id']
    });
  }

  async getRandomName(genderId, raceId) {
    const query = `SELECT * FROM names
      WHERE id >= (
        SELECT FLOOR(RAND() * (SELECT MAX(id) FROM names))
      )
        AND gender_id = ? AND race_id = ?
      LIMIT 1`;
    const rows = await db.query(query, [genderId, raceId]);
    return rows[0] || null;
  }
}

module.exports = new NamesRepository();
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
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM names
      WHERE gender_id = ? AND race_id = ?
    `;

    const countResult = await db.query(countQuery, [genderId, raceId]);
    const total = countResult[0].total;

    if (total === 0) return null;

    const randomOffset = Math.floor(Math.random() * total);

    const dataQuery = `
      SELECT *
      FROM names
      WHERE gender_id = ? AND race_id = ?
      LIMIT 1 OFFSET ?
    `;

    const result = await db.query(dataQuery, [genderId, raceId, randomOffset]);
    return result[0] || null;
  }
}

module.exports = new NamesRepository();
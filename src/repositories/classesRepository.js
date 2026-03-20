const db = require('../config/db');
const BaseRepository = require('./baseRepository');

const baseRepository = new BaseRepository(db, 'classes');

class ClassesRepository {
  async getAll(pagination) {
    return baseRepository.paginate(pagination, {
      searchFields: ['class'],
      sortFields: ['id', 'class'],
      filterFields: ['id']
    });
  }

  async getRandomClass() {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM classes
    `;

    const countResult = await db.query(countQuery, []);
    const total = countResult[0].total;

    if (total === 0) return null;

    const randomOffset = Math.floor(Math.random() * total);

    const dataQuery = `
      SELECT *
      FROM classes
      LIMIT 1 OFFSET ?
    `;

    const result = await db.query(dataQuery, [randomOffset]);
    return result[0] || null;
  }
}

module.exports = new ClassesRepository();
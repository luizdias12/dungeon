const db = require('../config/db');

class RacesRepository {
  async getAll() {
    const query = `SELECT * FROM races ORDER BY id`;
    return await db.query(query);
  }

  async getRandomRace() {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM races
    `;

    const countResult = await db.query(countQuery, []);
    const total = countResult[0].total;

    if (total === 0) return null;

    const randomOffset = Math.floor(Math.random() * total);

    const dataQuery = `
      SELECT *
      FROM races
      LIMIT 1 OFFSET ?
    `;

    const result = await db.query(dataQuery, [randomOffset]);
    return result[0] || null;
  }
}

module.exports = new RacesRepository();
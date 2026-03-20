const db = require('../config/db');

class RacesRepository {
  async getAll() {
    const query = `SELECT * FROM races ORDER BY id`;
    return await db.query(query);
  }

  async getRandomRace() {
    const query = `SELECT * FROM races
      WHERE id >= (
        SELECT FLOOR(RAND() * (SELECT MAX(id) FROM races))
      )
      LIMIT 1`;
    const rows = await db.query(query);
    return rows[0] || null;
  }
}

module.exports = new RacesRepository();
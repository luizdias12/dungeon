const db = require('../config/db');

class ClassesRepository {
  async getAll() {
    const query = `SELECT * FROM classes ORDER BY id`;
    return db.query(query);
  }

  async getById(id) {
    const query = `SELECT * FROM classes WHERE id = ? ORDER BY id`;
    const rows = await db.query(query, [id]);
    return rows[0] || null;
  }

  async getRandomClass() {
    const query = `SELECT * FROM classes
      WHERE id >= (
        SELECT FLOOR(RAND() * (SELECT MAX(id) FROM classes))
      )
      LIMIT 1`;
    const rows = await db.query(query);
    return rows[0] || null;
  }
}

module.exports = new ClassesRepository();
class BaseRepository {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

    async paginate(pagination, options = {}) {
    const { limit, offset, search, sort, order, filters } = pagination;

    let query = `SELECT * FROM ${this.table}`;
    let countQuery = `SELECT COUNT(*) as total FROM ${this.table}`;
    const params = [];
    const countParams = [];

    // 1. search
    if (search && options.searchFields?.length) {
        const conditions = options.searchFields
        .map(field => `${field} LIKE ?`)
        .join(' OR ');

        query += ` WHERE (${conditions})`;
        countQuery += ` WHERE (${conditions})`;

        options.searchFields.forEach(() => {
        params.push(`%${search}%`);
        countParams.push(`%${search}%`);
        });
    }

    // 2. filtros
    if (options.filterFields?.length) {
        const filterConditions = [];

        options.filterFields.forEach(field => {
        if (filters[field] !== undefined) {
            filterConditions.push(`${field} = ?`);
            params.push(filters[field]);
            countParams.push(filters[field]);
        }
        });

        if (filterConditions.length > 0) {
        const clause = filterConditions.join(' AND ');

        if (query.includes('WHERE')) {
            query += ` AND ${clause}`;
            countQuery += ` AND ${clause}`;
        } else {
            query += ` WHERE ${clause}`;
            countQuery += ` WHERE ${clause}`;
        }
        }
    }

    // 3. ordenação
    const allowedSortFields = options.sortFields || ['id'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'id';
    const sortOrder = order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    query += ` ORDER BY ${sortField} ${sortOrder}`;
    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const data = await this.db.query(query, params);
    const countResult = await this.db.query(countQuery, countParams);

    const total = countResult?.[0]?.total ?? 0;

    return {
        data,
        total
    };
    }
}

module.exports = BaseRepository;
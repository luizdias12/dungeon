const mysql = require('mysql2/promise');
require('dotenv').config();

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

requiredEnv.forEach((env) => {
    if (!process.env[env]) {
        throw new Error(`❌ Variável de ambiente não definida: ${env}`);
    }
});

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 10000, // idle connections timeout, in milliseconds, the default value 10000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

async function query(sql, params) {
    const [rows] = await pool.query(sql, params);
    return rows;
}

module.exports = {
    pool,
    query
};
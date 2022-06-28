const mariadb = require("mariadb");
const { config } = require("../config");

const configDB = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  connectionLimit: 5,
  acquireTimeout: 300,
};

const pool = mariadb.createPool(configDB);

async function getConnection() {
  try {
    const conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getConnection };

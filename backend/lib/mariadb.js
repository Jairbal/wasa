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

pool.getConnection((err, connection) => {
  if(err){
      if (err.code === 'PROTOCOL_CONNECTION_LOST'){
          console.error('Database connection lost');
      }
      if (err.code === 'ER_CON_COUNT_ERROR'){
          console.error('Database has too many connection');
      }
      if (err.code === 'ECONNREFUSED'){
          console.error('Database connection was refused');
      }
  }
  if(connection) connection.release();

  return;
});

module.exports = { pool };

/* async function getConnection() {
  try {
    const conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.log(err);
  }
}

async function end() {
  pool.end();
}

module.exports = { getConnection, end }; */

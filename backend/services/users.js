const pool = require("../lib/mariadb");
const { DateTime } = require("luxon");

class UsersService {
  constructor() {
    this.table = "tb_users";
    this.pool = pool;
  }

  async getUser(data) {
    let query;
    if (data.hasOwnProperty("user_email")) {
      query = `SELECT * FROM ${this.table} WHERE user_email = '${data.user_email}'`;
    } else if (data.hasOwnProperty("user_id")) {
      query = `SELECT * FROM ${this.table} WHERE user_id = '${data.user_id}'`;
    } else if (data.hasOwnProperty("user_phone")) {
      query = `SELECT * FROM ${this.table} WHERE user_phone = '${data.user_phone}'`;
    }
    const conn = await this.pool.getConnection();
    try {
      const [user] = await conn.query(query);
      conn.end();
      return user;
    } catch (err) {
      conn.end();
      console.log(err);
    }
  }

  async createUser({ user }) {
    const {
      user_name,
      user_lastname,
      user_username,
      user_email,
      user_urlPhoto,
      user_state = "Hola, estoy usando Wasa",
    } = user;
    const user_lastConnection = DateTime.now();
    const conn = await this.pool.getConnection();
    try {
      const query = `INSERT INTO ${this.table} (user_name, user_lastname, user_username, user_email, user_urlPhoto, user_state, user_lastConnection) VALUES ("${user_name}", "${user_lastname}", "${user_username}", "${user_email}", "${user_urlPhoto}", "${user_state}", "${user_lastConnection}")`;

      await conn.query(query);
      const result = await this.getUser({ user_email: user.user_email });
      conn.end();
      return result;
    } catch (err) {
      conn.end();
      console.log(err);
    }
  }

  async getOrCreateUser({ user }) {
    const existedUser = await this.getUser({ user_email: user.user_email });
    if (!existedUser) {
      const result = await this.createUser({ user });
      return result;
    }
    return existedUser;
  }

  async updateUser({ user }) {
    const query = `UPDATE ${this.table} SET user_name="${user.user_name}", user_lastname="${user.user_lastname}", user_username="${user.user_username}", user_email="${user.user_email}", user_urlPhoto="${user.user_urlPhoto}", user_state="${user.user_state}", user_phone="${user.user_phone}", user_lastConnection="${user.user_lastConnection}" WHERE user_id=${user.user_id}`;
    const existedUser = await this.getUser({ user_id: user.user_id });
    if (existedUser) {
      const conn = await this.pool.getConnection();
      try {
        await conn.query(query);
        const result = await this.getUser({ user_id: user.user_id });
        conn.end();
        return result;
      } catch (err) {
        conn.end();
        return err.code;
      }
    }
  }
}

module.exports = UsersService;

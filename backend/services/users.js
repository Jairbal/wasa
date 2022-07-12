const { pool } = require("../lib/mariadb");
const { DateTime } = require("luxon");

class UsersService {
  constructor() {
    this.table = "tb_users";
    this.pool = pool;
  }

  async getUser(data) {
    let query;
    if (data.hasOwnProperty("user_email")) {
      query = `SELECT * FROM ${
        this.table
      } WHERE user_email = ${this.pool.escape(data.user_email)}`;
    } else if (data.hasOwnProperty("user_id")) {
      query = `SELECT * FROM ${this.table} WHERE user_id = ${this.pool.escape(
        data.user_id
      )}`;
    } else if (data.hasOwnProperty("user_phone")) {
      query = `SELECT * FROM ${
        this.table
      } WHERE user_phone = ${this.pool.escape(data.user_phone)}`;
    }
    try {
      const [user] = await this.pool.query(query);
      return user;
    } catch (err) {
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
    try {
      const query = `INSERT INTO ${
        this.table
      } (user_name, user_lastname, user_username, user_email, user_urlPhoto, user_state, user_lastConnection) VALUES (${this.pool.escape(
        user_name
      )}, ${this.pool.escape(user_lastname)}, ${this.pool.escape(
        user_username
      )}, ${this.pool.escape(user_email)}, ${this.pool.escape(
        user_urlPhoto
      )}, ${this.pool.escape(user_state)}, ${this.pool.escape(
        user_lastConnection
      )})`;

      await this.pool.query(query);
      const result = await this.getUser({ user_email: user.user_email });
      return result;
    } catch (err) {
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
    const query = `UPDATE ${this.table} SET user_name=${this.pool.escape(
      user.user_name
    )}, user_lastname=${this.pool.escape(
      user.user_lastname
    )}, user_username=${this.pool.escape(
      user.user_username
    )}, user_email=${this.pool.escape(
      user.user_email
    )}, user_urlPhoto=${this.pool.escape(
      user.user_urlPhoto
    )}, user_state=${this.pool.escape(
      user.user_state
    )}, user_phone=${this.pool.escape(
      user.user_phone
    )}, user_lastConnection=${this.pool.escape(
      user.user_lastConnection
    )} WHERE user_id=${this.pool.escape(user.user_id)}`;
    const existedUser = await this.getUser({ user_id: user.user_id });
    if (existedUser) {
      try {
        await this.pool.query(query);
        const result = await this.getUser({ user_id: user.user_id });
        return result;
      } catch (err) {
        return err.code;
      }
    }
  }

  async userConnected({ user_id }) {
    const query = `UPDATE ${
      this.table
    } SET user_lastConnection="en línea" WHERE user_id=${this.pool.escape(
      user_id
    )}`;
    try {
      await this.pool.query(query);
      return true;
    } catch (err) {
      return err.code;
    }
  }

  async userDisconnected({ user_id }) {
    const lastConnection = DateTime.now();
    const query = `UPDATE ${
      this.table
    } SET user_lastConnection=${this.pool.escape(
      lastConnection
    )} WHERE user_id=${this.pool.escape(user_id)}`;
    try {
      await this.pool.query(query);
      return lastConnection;
    } catch (err) {
      return err.code;
    }
  }
}

module.exports = UsersService;

const { pool } = require("../lib/mariadb");

class SocketsServices {
  constructor() {
    this.table = "tb_sockets";
    this.table_contacts = "tb_contacts";
    this.table_users = "tb_users";
    this.pool = pool;
  }

  async getSockets({ sock_user_id }) {
    let sockets = [];
    const query = `SELECT sock_id FROM ${
      this.table
    } WHERE sock_user_id = '${this.pool.escape(sock_user_id)}'`;

    try {
      const result = await this.pool.query(query);
      result.forEach((socket) => {
        sockets.push(socket);
      });
      return sockets;
    } catch (err) {
      console.log(err);
    }
  }

  async getContactSockestId({ cont_id }) {
    let socketsId = [];
    const query = `SELECT s.sock_id FROM ${this.table_contacts} AS c, ${
      this.table
    } AS s, ${
      this.table_users
    } AS u WHERE s.sock_user_id = u.user_id AND c.cont_user_id = u.user_id AND c.cont_id = ${this.pool.escape(
      cont_id
    )}`;
    try {
      const result = await this.pool.query(query);
      result.forEach((fila) => {
        socketsId.push(fila);
      });
      return socketsId;
    } catch (err) {
      console.log(err);
    }
  }

  async createSocket({ sock_user_id, sock_id }) {
    const query = `INSERT INTO ${
      this.table
    } (sock_user_id, sock_id) VALUES (${this.pool.escape(
      sock_user_id
    )}, ${this.pool.escape(sock_id)})`;
    try {
      await this.pool.query(query);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSocket({ sock_user_id, sock_id }) {
    const query = `DELETE FROM ${
      this.table
    } WHERE sock_user_id = ${this.pool.escape(
      sock_user_id
    )} AND sock_id = ${this.pool.escape(sock_id)}`;
    try {
      await this.pool.query(query);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SocketsServices;

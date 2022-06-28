const pool = require("../lib/mariadb");
const { DateTime } = require("luxon");

class ContactsService {
  constructor() {
    this.table = "tb_contacts";
    this.table_users = "tb_users";
    this.pool = pool;
  }

  async getAll({ cont_owner_user_id }) {
    let contacts = [];
    const query = `SELECT c.cont_displayName, c.cont_user_id, c.cont_id, u.user_urlPhoto, u.user_state, u.user_phone, u.user_lastConnection FROM ${this.table} AS c, ${this.table_users} AS u WHERE c.cont_user_id = u.user_id AND c.cont_owner_user_id = ${cont_owner_user_id}`;
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(query);
      result.forEach((fila) => {
        contacts.push(fila);
      });
      // SE ORDENA LOS CONTACTOS ALFABETICAMENTE POR EL DISPLAYNAME
      contacts.sort(function (a, b) {
        if (a.cont_displayName > b.cont_displayName) {
          return 1;
        }
        if (a.cont_displayName < b.cont_displayName) {
          return -1;
        }
        return 0;
      });
      conn.end();
      return contacts;
    } catch (err) {
      console.log(err);
      conn.end();
    }
  }

  async getContact({ cont_id }) {
    const query = `SELECT c.cont_displayName, c.cont_user_id, c.cont_id, u.user_urlPhoto, u.user_state, u.user_phone, u.user_lastConnection FROM ${this.table} AS c, ${this.table_users} AS u WHERE c.cont_user_id = u.user_id AND c.cont_id = ${cont_id}`;

    const conn = await this.pool.getConnection();
    try {
      const [contact] = await conn.query(query);
      conn.end();
      return contact;
    } catch (err) {
      console.log(err);
      conn.end();
    }
  }

  async createContact({ contact }) {
    const { cont_displayName, cont_owner_user_id, cont_user_id } = contact;
    const conn = await this.pool.getConnection();
    try {
      const query = `INSERT INTO ${this.table} (cont_displayName, cont_owner_user_id, cont_user_id) VALUES ("${cont_displayName}", "${cont_owner_user_id}", "${cont_user_id}") RETURNING cont_id`;
      const result = await conn.query(query);
      const { cont_id } = result[0];
      const contactCreated = await this.getContact({ cont_id });
      conn.end();
      return contactCreated;
    } catch (err) {
      console.log(err);
      conn.end();
    }
  }
}

module.exports = ContactsService;

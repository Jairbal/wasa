const { pool } = require("../lib/mariadb");

class ContactsService {
  constructor() {
    this.table = "tb_contacts";
    this.table_users = "tb_users";
    this.table_sockets = "tb_sockets";
    this.pool = pool;
  }

  async getAll({ cont_owner_user_id }) {
    let contacts = [];
    const query = `SELECT c.cont_displayName, c.cont_user_id, c.cont_id, u.user_urlPhoto, u.user_state, u.user_phone, u.user_lastConnection FROM ${
      this.table
    } AS c, ${
      this.table_users
    } AS u WHERE c.cont_user_id = u.user_id AND c.cont_owner_user_id = ${this.pool.escape(
      cont_owner_user_id
    )}`;
    try {
      const result = await this.pool.query(query);
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
      return contacts;
    } catch (err) {
      console.log(err);
    }
  }

  async getContact({ cont_id }) {
    const query = `SELECT c.cont_displayName, c.cont_user_id, c.cont_id, u.user_urlPhoto, u.user_state, u.user_phone, u.user_lastConnection FROM ${
      this.table
    } AS c, ${
      this.table_users
    } AS u WHERE c.cont_user_id = u.user_id AND c.cont_id = ${this.pool.escape(
      cont_id
    )}`;

    try {
      const [contact] = await this.pool.query(query);
      return contact;
    } catch (err) {
      console.log(err);
    }
  }

  async getContactByuserId({ cont_user_id }) {
    const query = `SELECT c.cont_displayName, c.cont_user_id, c.cont_id, u.user_urlPhoto, u.user_state, u.user_phone, u.user_lastConnection FROM ${
      this.table
    } AS c, ${
      this.table_users
    } AS u WHERE c.cont_user_id = u.user_id AND c.cont_user_id = ${this.pool.escape(
      cont_user_id
    )}`;
    try {
      const [contact] = await this.pool.query(query);
      return contact;
    } catch (err) {
      console.log(err);
    }
  }

  async createContact({ contact }) {
    const { cont_displayName, cont_owner_user_id, cont_user_id } = contact;
    try {
      const query = `INSERT INTO ${
        this.table
      } (cont_displayName, cont_owner_user_id, cont_user_id) VALUES (${this.pool.escape(
        cont_displayName
      )}, ${this.pool.escape(cont_owner_user_id)}, ${this.pool.escape(
        cont_user_id
      )}) RETURNING cont_id`;
      const result = await this.pool.query(query);
      const { cont_id } = result[0];
      const contactCreated = await this.getContact({ cont_id });
      return contactCreated;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ContactsService;

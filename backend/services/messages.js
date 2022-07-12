const { DateTime } = require("luxon");
const { pool } = require("../lib/mariadb");

class MessagesServices {
  constructor() {
    this.table = "tb_messages";
    this.pool = pool;
  }

  async createMessage({ message }) {
    console.log(message)
    message.mess_viewed = false;
    message.mess_hourViewed = null;
    if(!message.mess_isMedia){
      message.mess_urlMedia = null;
    }
    const query = `INSERT INTO ${
      this.table
    } (mess_message, mess_viewed, mess_hourSend, mess_hourViewed, mess_isMedia, mess_urlMedia, mess_chat_id, mess_user_id_sent) VALUES (
      ${this.pool.escape(message.mess_message)}, 
      ${this.pool.escape(message.mess_viewed)}, 
      ${this.pool.escape(message.mess_hourSend)},
      ${this.pool.escape(message.mess_hourViewed)},
      ${this.pool.escape(message.mess_isMedia)},
      ${this.pool.escape(message.mess_urlMedia)},
      ${this.pool.escape(message.mess_chat_id)},
      ${this.pool.escape(message.mess_user_id_sent)}
      ) RETURNING mess_id`;
    try {
      const result = await this.pool.query(query);
      const { mess_id } = result[0];
      message.mess_id = mess_id;
      return message;
    } catch (err) {
      console.log(err);
    }
  }

  async seenMessage({ mess_id }) {
    const mess_hourViewed = DateTime.now();
    const query = `UPDATE ${
      this.table
    } set mess_viewed=true, mess_hourViewed=${this.pool.escape(
      mess_hourViewed
    )} WHERE mess_id=${this.pool.escape(mess_id)}`;

    try {
      await this.pool.query(query);
      return mess_hourViewed;
    } catch (err) {
      console.log(err);
    }
  }

  async getMessages({ mess_chat_id }) {
    let messages = [];
    let notRead;
    const query = `SELECT * FROM ${
      this.table
    } WHERE mess_chat_id = ${this.pool.escape(mess_chat_id)}`;
    const queryNR = `SELECT COUNT(mess_viewed) AS notRead FROM ${this.table} WHERE mess_viewed=false`;
    try {
      const result = await this.pool.query(query);
      const rows = await this.pool.query(queryNR);
      result.forEach((fila) => {
        messages.push(fila);
      });
      notRead = rows[0].notRead;
      notRead = parseInt(notRead);
      return {messages, notRead};
    } catch (err) {}
  }
}

module.exports = MessagesServices;

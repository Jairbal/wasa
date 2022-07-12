const { pool } = require("../lib/mariadb");
const { getDestinataryId } = require("../utils/helpers");
const ContactsService = require("./contacts");
const MessagesService = require("./messages");
const UsersService = require("./users");

class ChatsServices {
  constructor() {
    this.table = "tb_chats";
    this.table_contacts = "tb_contacts";
    this.table_users = "tb_users";
    this.pool = pool;
    this.contactsService = new ContactsService();
    this.messagesService = new MessagesService();
    this.usersService = new UsersService();
  }

  async createChat({ chat }) {
    let chats = [];
    const query = `SELECT * FROM ${
      this.table
    } WHERE chat_user_id_1 = ${this.pool.escape(
      chat.chat_user_id_1
    )} AND chat_user_id_2 = ${this.pool.escape(
      chat.chat_user_id_2
    )} OR chat_user_id_1 = ${chat.chat_user_id_2} AND chat_user_id_2 = ${
      chat.chat_user_id_1
    }`;
    try {
      const existedChat = await this.pool.query(query);
      existedChat.forEach((fila) => {
        chats.push(fila);
      });
      if (chats.length === 0) {
        const query = `INSERT INTO ${
          this.table
        } (chat_user_id_1, chat_user_id_2) VALUES (${this.pool.escape(
          chat.chat_user_id_1
        )}, ${this.pool.escape(chat.chat_user_id_2)}) RETURNING chat_id;`;
        const result = await this.pool.query(query);
        const { chat_id } = result[0];
        const chatCreated = await this.getChat({
          chat_id,
          owner_user_id: chat.chat_user_id_1,
        });
        return chatCreated;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getTableChat({ chat_id }) {
    const query = `SELECT * FROM ${
      this.table
    } WHERE chat_id = ${this.pool.escape(chat_id)}`;
    try {
      const [chat] = await this.pool.query(query);
      return chat;
    } catch (err) {}
  }

  async getChat({ chat_id, owner_user_id }) {
    let contact;
    const query = `SELECT * FROM ${
      this.table
    } WHERE chat_id = ${this.pool.escape(chat_id)}`;
    try {
      const [chat] = await this.pool.query(query);
      const destinataryId = getDestinataryId({ chat, owner_user_id });
      contact = await this.contactsService.getContactByuserId({
        cont_user_id: destinataryId,
      });
      if (!contact) {
        contact = await this.usersService.getUser({ user_id: destinataryId });
      }
      const {messages, notRead} = await this.messagesService.getMessages({
        mess_chat_id: chat_id,
      });
      return {
        chat,
        contact,
        messages,
        notRead
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getAllChats({ user_id }) {
    console.log(user_id);
    const resultTablechats = [];
    const chats = [];
    const query = `SELECT * FROM ${
      this.table
    } WHERE chat_user_id_1 = ${this.pool.escape(
      user_id
    )} OR chat_user_id_2 = ${this.pool.escape(user_id)}`;
    try {
      const result = await this.pool.query(query);
      result.forEach((fila) => {
        resultTablechats.push(fila);
      });
      await Promise.all(
        resultTablechats.map(async (el) => {
          const res = await this.getChat({
            chat_id: el.chat_id,
            owner_user_id: user_id,
          });
          chats.push(res);
        })
      );

      return chats;
    } catch (error) {}
  }
}
module.exports = ChatsServices;

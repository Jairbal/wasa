const fs = require("fs");
const { Server } = require("socket.io");
const { DateTime } = require("luxon");
const SocketsServices = require("../services/sockets");
const UsersService = require("../services/users");
const ContactsService = require("../services/contacts");
const { config } = require("./../config/index");
const MessagesServices = require("../services/messages");
const ChatsServices = require("../services/chats");
const { getDestinataryId } = require("../utils/helpers");

const usersService = new UsersService();
const socketsService = new SocketsServices();
const contactsService = new ContactsService();
const messagesServices = new MessagesServices();
const chatsServices = new ChatsServices();

function socketApi(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: config.clientUrl,
    },
  });

  io.on("connection", async (socket) => {
    if (socket.handshake.headers.user_id) {
      const user_id = socket.handshake.headers.user_id;
      const contacts = await contactsService.getAll({
        cont_owner_user_id: user_id,
      });
      const sock_id = socket.id;
      await socketsService.createSocket({ sock_user_id: user_id, sock_id });

      socket.on("suscribe", (data) => {
        console.log("se suscribio", data);
        socket.join(`user:${data}`);
      });

      socket.on("message:send", async (message, callback) => {
        console.log("se recibio un mensaje", message.mess_hourSend);
        // se registra el mensaje en la base de datos

        // si el mensaje contiene archivos multimedia
        if (message.mess_isMedia) {
          const sinceType = message.image.type.lastIndexOf("/") + 1;
          const untilType = message.image.type.length;
          const type = message.image.type.slice(sinceType, untilType);
          const path = `public/images/Wasa Image ${DateTime.now().toFormat(
            "yyyy-MM-dd 'a las' hh.mm.ss.SSS"
          )}.${type}`;
          message.mess_urlMedia = path;
          fs.writeFile(path, message.image.buff, (err) => {
            if (err) throw err;
          });
        }

        // si el mensaje no contiene archivos multimedia
        const newMessage = await messagesServices.createMessage({
          message,
        });

        const chat = await chatsServices.getTableChat({
          chat_id: message.mess_chat_id,
        });
        const destinataryId = getDestinataryId({
          chat,
          owner_user_id: message.mess_user_id_sent,
        });

        const socketsDestinatary = await socketsService.getSockets({
          sock_user_id: destinataryId,
        });

        socketsDestinatary.forEach((sc) => {
          socket
            .to(sc.sock_id)
            .emit("message:receive", { message: newMessage });
        });

        callback({
          message: newMessage,
        });
      });

      socket.on("message:viewed", async ({ mess_id, mess_chat_id }) => {
        const mess_hourViewed = await messagesServices.seenMessage({
          mess_id,
        });
        const chat = await chatsServices.getTableChat({
          chat_id: mess_chat_id,
        });
        const destinataryId = getDestinataryId({
          chat,
          owner_user_id: user_id,
        });

        const socketsDestinatary = await socketsService.getSockets({
          sock_user_id: destinataryId,
        });

        socketsDestinatary.forEach((sc) => {
          socket.to(sc.sock_id).emit("message:viewed", {
            mess_id,
            mess_chat_id,
            mess_hourViewed,
          });
        });
      });

      /* contacts.forEach((contact) =>
        socket.join(`message:${contact.cont_user_id}`)
      );
 */

      await usersService.userConnected({ user_id });
      io.to(`user:${user_id}`).emit(`user_${user_id}:online`, {
        user_id,
        user_lastConnection: "en línea",
      });

      socket.on("disconnect", async (reason) => {
        const user_lastConnection = await usersService.userDisconnected({
          user_id,
        });
        socket
          .to(`user:${user_id}`)
          .emit(`user_${user_id}:offline`, { user_id, user_lastConnection });
        await socketsService.deleteSocket({ sock_user_id: user_id, sock_id });
      });
    }
  });
}

module.exports = socketApi;

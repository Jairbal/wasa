const express = require("express");
const ChatsService = require("../services/chats");
const passport = require("passport");

//JWT Strategy
require("../utils/auth/strategies/jwt");

function chatsApi(app) {
  const router = express.Router();
  app.use("/api/chats", router);

  const chatsService = new ChatsService();

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        // obtenemos los datos enviados del cliente
        const { chat } = req.body;
        // verificamos si existe un usuario con el numero de telefono a agregar
        const chatCreated = await chatsService.createChat({ chat });
        res.status(201).json({
          chat: chatCreated,
          message: "Chat created",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/:chat_id/:user_id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { chat_id, user_id } = req.params;
        const chat = await chatsService.getChat({
          chat_id,
          owner_user_id: user_id,
        });
        if (chat) {
          res.status(200).json({
            chat,
            message: "Chat listed",
          });
        } else {
          res.status(404).json({
            chat: null,
            message: "Chat not found",
          });
        }
      } catch (err) {}
    }
  );

  router.get(
    "/:user_id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      const { user_id } = req.params;
      try {
        const chats = await chatsService.getAllChats({ user_id });
        res.status(200).json({
          chats,
          message: "Chats listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = chatsApi;

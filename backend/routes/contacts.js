const express = require("express");
const UsersService = require("../services/users");
const ContactsService = require("../services/contacts");
const passport = require("passport");

//JWT Strategy
require("../utils/auth/strategies/jwt");

function contactsApi(app) {
  const router = express.Router();
  app.use("/api/contacts", router);

  const usersService = new UsersService();
  const contactsService = new ContactsService();

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        // obtenemos los datos enviados del cliente
        const { contact } = req.body;
        // verificamos si existe un usuario con el numero de telefono a agregar
        const existedUser = await usersService.getUser({
          user_phone: contact.phone,
        });
        if (existedUser) {
          contact.cont_user_id = existedUser.user_id;
          const contactCrated = await contactsService.createContact({
            contact,
          });
          res.status(201).json({
            contact: contactCrated,
            message: "Contact created",
          });
        } else {
          res.status(406).json({
            contact: null,
            message: "Unregistered number",
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/:cont_owner_user_id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      const { cont_owner_user_id } = req.params;
      try {
        const existedUser = await usersService.getUser({
          user_id: cont_owner_user_id,
        });

        if (existedUser) {
          const contacts = await contactsService.getAll({ cont_owner_user_id });
          res.status(200).json({
            contacts: contacts,
            message: "Contact lited",
          });
        } else {
          res.status(406).json({
            contacts: null,
            message: "Unregistered user",
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  /* router.get(
    "/:user_id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { user } = req;

        res.status(200).json({
          user,
          message: "user retrieved",
        });
      } catch (err) {
        next(err);
      }
    }
  ); */

  /* router.put(
    "/:user_id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { user } = req.body;

        const userUpdated = await usersService.updateUser({user});

        res.status(200).json({
          user: userUpdated,
          message: "user updated",
        });
      } catch (err) {
        next(err);
      }
    }
  ); */
}

module.exports = contactsApi;

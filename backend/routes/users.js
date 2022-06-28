const express = require("express");
const UsersService = require("../services/users");
const passport = require("passport");

//JWT Strategy
require("../utils/auth/strategies/jwt");

function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);

  const usersService = new UsersService();

  router.get(
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
  );

  router.put(
    "/:user_id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { user } = req.body;

        const userUpdated = await usersService.updateUser({ user });

        if (userUpdated === "ER_DUP_ENTRY") {
          res.status(409).json({
            user: null,
            message: "Phone duplicated",
          });
        } else {
          res.status(201).json({
            user: userUpdated,
            message: "user updated",
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usersApi;

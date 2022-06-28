const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");
const { config } = require('../config');

require("../utils/auth/strategies/google.js");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  router.get("/google", async function (req, res, next) {
    passport.authenticate(
      "auth-google",
      {
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
        session: false,
      },
      function (error, user) {
        try {
          if (error || !user) {
            next(boom.unauthorized());
          }

          req.login(user, { session: false }, async function (err) {
            if (err) {
              next(err);
            }
          });

          const {user_id, user_username, user_email} = user;

          const payload = {
            user_id,
            user_username,
            user_email,
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: 60*60*24
          })

          res.cookie('ws_fi', token);
          res.cookie('user_id', user_id);
          res.redirect(`${config.clientUrl}/`);
          //return res.status(200).json({token, user});
        } catch (err) {
            console.log(err)
          next(err);
        }
      }
    )(req, res, next);
  });

}

module.exports = authApi;

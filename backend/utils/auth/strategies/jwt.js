const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const UsersService = require("../../../services/users");
const { config } = require("../../..//config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const usersService = new UsersService();

      try {
        const user = await usersService.getUser({ user_id: tokenPayload.user_id });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

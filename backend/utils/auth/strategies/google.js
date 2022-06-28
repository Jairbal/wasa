const passport = require("passport");
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");
const boom = require("@hapi/boom");
const { config } = require("../../../config");

const UsersService = require("../../../services/users");

const { googleClientId, googleClientSecret } = config;

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:3001/api/auth/google",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const usersService = new UsersService();
      const userData = {
        user_name: profile.name.givenName,
        user_lastname: profile.name.familyName,
        user_username: profile.displayName,
        user_email: profile.emails[0].value,
        user_urlPhoto: profile.photos[0].value,
      };
      try {
        const user = await usersService.getOrCreateUser({user: userData});
        if (!user) {
          return cb(boom.unauthorized().stat, false);
        }
        cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

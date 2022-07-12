require("dotenv").config()

const config = {
    dev: process.env.NODE_ENV !== "production",
    port: process.env.PORT || 3000,
    host: process.env.HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    clientUrl: process.env.CLIENT_URL
};

module.exports = {config}
const express = require("express");
const { createServer } = require("http");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const authApi = require("./routes/auth.js");
const usersApi = require("./routes/users.js");
const contactsApi = require("./routes/contacts.js");
const socketApi = require("./socket/index.js");
const { config } = require("./config/index.js");
const chatsApi = require("./routes/chats.js");

const app = express();
const httpServer = createServer(app);



// body parser
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));




authApi(app);
usersApi(app);
contactsApi(app);
chatsApi(app);
socketApi(httpServer);


httpServer.listen(config.port, () => {
  console.log(`App running in port ${config.port}`);
});

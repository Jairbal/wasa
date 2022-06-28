const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const { config } = require("./config/index.js");
const authApi = require("./routes/auth.js");
const usersApi = require("./routes/users.js");
const contactsApi = require("./routes/contacts.js");

const app = express();
/* const usersService = new UsersService();
const user = {
  name: "Jair",
  lastname: "Balcazar",
  username: "Jairbal",
  email: "Jairbalcazar3.jb@gmail.com",
  urlPhoto: "aqui va la foto",
} */

// body parser
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

authApi(app);
usersApi(app);
contactsApi(app);

app.get("/", async (req, res) => {
  res.status(200).json(result);
});

app.listen(config.port, () => {
  console.log(`App running in port ${config.port}`);
});

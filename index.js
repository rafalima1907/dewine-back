const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const rotaUser = require("./src/routes/user.routes");

app.use("/users", rotaUser);

app.use("/", (req, res) => {
  return res.status(200).send({ mensagem: "API funcionando" });
});

module.exports = app;
const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);

// app.get("/", (req, res) => {
//   res.send("API funcionando");
// });

module.exports = app;
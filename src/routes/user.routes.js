const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Rota de usuários funcionando");
});

router.post("/users", (req, res) => {
  const data = req.body;
  res.send("Usuário recebido: " + JSON.stringify(data));
});

module.exports = router;
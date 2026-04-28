const express = require("express");
const router = express.Router();

let produtos = [];

router.post("/cadastro", (req, res) => {
  try {
    const { nome, preco, categoria, descricao, ano_safra } = req.body;

    if (!nome || !preco) {
      return res.status(422).json({ message: "O nome e o preço são obrigatórios!" });
    }

    const novoProduto = {
      id_produto: produtos.length + 1,
      nome,
      preco,
      categoria,
      descricao,
      ano_safra
    };

    produtos.push(novoProduto);
    console.log("Vinho cadastrado com sucesso:", novoProduto);

    return res.status(201).json({
      message: "Produto salvo no servidor!",
      produto: novoProduto
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno", error: error.message });
  }
});

router.get("/listar", (req, res) => {
  res.status(200).json(produtos);
});

module.exports = router;
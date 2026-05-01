const express = require("express");
const router = express.Router();

let produtos = [];

router.post("/cadastro", (req, res) => {
  try {
    const { nome, preco, categoria, descricao, ano_safra, url_imagem, estoque } = req.body;

    if (!nome || !preco) {
      return res.status(422).json({ message: "O nome e o preço são obrigatórios!" });
    }

    const novoProduto = {
      id_produto: produtos.length + 1,
      nome,
      preco,
      categoria,
      descricao,
      ano_safra,
      imagem: url_imagem,
      estoque
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

router.put("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const { nome, preco, categoria, descricao, ano_safra, url_imagem, estoque } = req.body;

  const index = produtos.findIndex(p => p.id_produto === id);

  if (index === -1) {
    const produtoRecuperado = {
      id_produto: id,
      nome,
      preco,
      categoria,
      descricao,
      ano_safra,
      imagem: url_imagem,
      estoque
    };

    produtos.push(produtoRecuperado);

    return res.status(200).json({
      message: "Servidor tinha perdido a memória, mas o produto foi recuperado e atualizado!",
      produto: produtoRecuperado
    });
  }

  produtos[index] = {
    ...produtos[index],
    nome: nome !== undefined ? nome : produtos[index].nome,
    preco: preco !== undefined ? preco : produtos[index].preco,
    categoria: categoria !== undefined ? categoria : produtos[index].categoria,
    descricao: descricao !== undefined ? descricao : produtos[index].descricao,
    ano_safra: ano_safra !== undefined ? ano_safra : produtos[index].ano_safra,
    imagem: url_imagem !== undefined ? url_imagem : produtos[index].imagem,
    estoque: estoque !== undefined ? estoque : produtos[index].estoque
  };

  return res.status(200).json({
    message: "Produto atualizado com sucesso!",
    produto: produtos[index]
  });
});

router.delete("/excluir/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = produtos.findIndex(p => p.id_produto === id);

  if (index === -1) {
    return res.status(200).json({ message: "Produto já não estava no servidor. Exclusão confirmada!" });
  }

  produtos.splice(index, 1);

  return res.status(200).json({ message: "Produto excluído com sucesso" });
});

module.exports = router;
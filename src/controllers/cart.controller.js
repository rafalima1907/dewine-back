const validateAddToCart = (req, res) => {
  const { id_cliente, id_produto, nome, preco, estoque, quantidade = 1 } = req.body;

  if (!id_cliente || !id_produto)
    return res.status(400).json({ erro: "id_cliente e id_produto são obrigatórios." });
  if (!nome || preco === undefined || estoque === undefined)
    return res.status(400).json({ erro: "Dados do produto incompletos (nome, preco, estoque)." });
  if (typeof preco !== "number" || preco <= 0)
    return res.status(400).json({ erro: "Preço inválido." });
  if (quantidade <= 0 || !Number.isInteger(quantidade))
    return res.status(400).json({ erro: "Quantidade deve ser um inteiro maior que 0." });
  if (estoque < quantidade)
    return res.status(400).json({ erro: `Estoque insuficiente. Disponível: ${estoque}`, estoque_disponivel: estoque });

  return res.status(200).json({
    mensagem: "Produto validado com sucesso.",
    item: {
      id_produto,
      nome,
      preco_unitario: preco,
      quantidade,
      subtotal: parseFloat((preco * quantidade).toFixed(2)),
    },
  });
};

const checkout = (req, res) => {
  const { id_cliente, id_endereco, itens } = req.body;

  if (!id_cliente) return res.status(400).json({ erro: "id_cliente é obrigatório." });
  if (!id_endereco) return res.status(400).json({ erro: "Endereço de entrega é obrigatório." });
  if (!itens || !Array.isArray(itens) || itens.length === 0)
    return res.status(400).json({ erro: "Carrinho vazio ou inválido." });

  const erros = [];
  let valor_total = 0;

  for (const item of itens) {
    const { id_produto, nome, preco_unitario, quantidade, estoque } = item;
    if (!id_produto || !nome || preco_unitario === undefined || !quantidade) { erros.push("Item inválido: dados incompletos."); continue; }
    if (quantidade <= 0) { erros.push(`${nome}: quantidade inválida.`); continue; }
    if (estoque !== undefined && estoque < quantidade) { erros.push(`${nome}: estoque insuficiente (disponível: ${estoque}).`); continue; }
    if (preco_unitario <= 0) { erros.push(`${nome}: preço inválido.`); continue; }
    valor_total += preco_unitario * quantidade;
  }

  if (erros.length > 0)
    return res.status(400).json({ erro: "Erro na validação do carrinho.", detalhes: erros });

  valor_total = parseFloat(valor_total.toFixed(2));

  return res.status(200).json({
    mensagem: "Pedido validado com sucesso.",
    pedido: {
      id_cliente, id_endereco, valor_total,
      status: "pendente",
      data_compra: new Date().toISOString(),
      itens: itens.map((i) => ({
        id_produto: i.id_produto,
        quantidade: i.quantidade,
        preco_unitario: i.preco_unitario,
        subtotal: parseFloat((i.preco_unitario * i.quantidade).toFixed(2)),
      })),
    },
  });
};

module.exports = { validateAddToCart, checkout };
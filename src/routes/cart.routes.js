const express = require("express");
const router = express.Router();
const { validateAddToCart, checkout } = require("../controllers/cart.controller");

// POST /cart/validate : valida item antes de salvar no SQLite local
router.post("/validate", validateAddToCart);

// POST /cart/checkout : valida carrinho completo e confirma pedido
router.post("/checkout", checkout);

module.exports = router;
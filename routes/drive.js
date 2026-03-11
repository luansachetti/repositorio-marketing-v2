const express = require('express');
const router = express.Router();
const { listarCategorias, listarArquivos } = require('../controllers/driverController');

// GET /api/categorias
router.get('/categorias', listarCategorias);

// GET /api/arquivos/:pastaId
router.get('/arquivos/:pastaId', listarArquivos);

module.exports = router;
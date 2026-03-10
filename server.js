// Importar dependências
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const db = require('./database/db');

// Criar o servidor
const app = express();

// Configurações
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota de teste
app.get('/api/test', (req, res) => {
    res.json({
        mensagem: 'Servidor funcionando!',
        data: new Date()
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
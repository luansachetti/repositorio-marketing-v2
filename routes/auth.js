const express = require('express');
const router = express.Router();
const db = require('../database/db');

// POST /api/login
router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // Validação básica
    if (!usuario || !senha) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Usuário e senha são obrigatórios'
        });
    }

    // Busca no banco de dados
    const sql = `
        SELECT id, usuario, nome_exibicao, tipo, ativo
        FROM usuarios
        WHERE usuario = ? AND senha = ?
    `;

    db.get(sql, [usuario, senha], (err, row) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro no servidor'
            });
        }

        if (!row) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Usuário ou senha incorretos'
            });
        }

        if (row.ativo !== 1) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Usuário inativo'
            });
        }

        // Login bem-sucedido!
        res.json({
            sucesso: true,
            usuario: {
                id: row.id,
                usuario: row.usuario,
                nome_exibicao: row.nome_exibicao,
                tipo: row.tipo
            }
        });
    });
});

module.exports = router;
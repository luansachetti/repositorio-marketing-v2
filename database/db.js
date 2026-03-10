const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do arquivo do banco de dados
const dbPath = path.join(__dirname, 'repo.db');

// Criar conexão
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error ('Erro ao conectar no banco:', err.message);
    } else {
        console.log('Conectado ao SQLite')
    }
});

// Criar tabelas
db.serialize(() => {
    // Tabela de usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE NOT NULL,
        nome_exibicao TEXT NOT NULL,
        senha TEXT NOT NULL,
        tipo TEXT CHECK(tipo IN ('admin', 'filial')) NOT NULL,
        ativo INTEGER DEFAULT 1
        )
    `);

    console.log('Tabelas criadas/verificadas');
});

module.exports = db;

const db = require ('./db');

// Inserir usuário admin
const senha = '1234'; // senha simples para testar

db.run(`
    INSERT OR IGNORE INTO usuarios (usuario, nome_exibicao, senha, tipo, ativo)
    VALUES (?, ?, ?, ?, ?)
    `, ['admin', 'Administrador', senha, 'admin', 1], (err) => {
        if (err) {
            console.error('Erro ao criar admin:', err.message);
        } else {
            console.log('Usuário admin criado!');
        }

    db.close();
});
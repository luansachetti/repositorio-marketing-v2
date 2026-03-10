// Pega o formulário
const form = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');

// Quando submeter o formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede reload da página

    // Pega os valores dos inputs
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
        // Faz requisição para API
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, senha })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            mensagem.textContent = 'Login realizado com sucesso!';
            mensagem.className = 'sucesso';

            // Salva usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(dados.usuario));

            // Redireciona para home
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1000);

        } else {
            mensagem.textContent = dados.mensagem || 'Erro ao fazer login';
            mensagem.className = 'erro';
        }

    } catch (erro) {
        mensagem.textContent = 'Erro ao conectar com servidor';
        mensagem.className = 'erro';
        console.error(erro);
    }
});
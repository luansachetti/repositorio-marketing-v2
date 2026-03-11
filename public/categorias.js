// Verifica se está logado
const usuarioLogado = localStorage.getItem('usuario');

if (!usuarioLogado) {
    window.location.href = '/login.html';
} else {
    // Mostra informações do usuário
    const usuario = JSON.parse(usuarioLogado);
    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = `<p>Olá, <strong>${usuario.nome_exibicao}</strong>!</p>`;
}

// Carregar categorias do Drive
async function carregarCategorias() {
    const listarCategorias = document.getElementById('listarCategorias');

    try {
        const resposta = await fetch('/api/categorias');
        const dados = await resposta.json();

        if (dados.sucesso && dados.categorias.length > 0) {
            // Limpa o "Carregando..."
            listarCategorias.innerHTML = '';

            // Cria um botão para cada categoria
            dados.categorias.forEach(categoria => {
                const btn = document.createElement('button');
                btn.textContent = categoria.name;
                btn.className = 'btn-categoria';
                btn.onclick = () => {
                    // Salva ID da categoria e vai para página de arquivos
                    localStorage.setItem('categoriaAtual', JSON.stringify(categoria));
                    window.location.href = '/arquivos.html';
                };

                listarCategorias.appendChild(btn);
            });

        } else {
            listarCategorias.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
        }

    } catch (erro) {
        console.error('Erro ao carregar categorias:', erro);
        listarCategorias.innerHTML = '<p>Erro ao carregar categorias.</p>'
    }
}

// Carregar ao abrir a página
carregarCategorias();

// Botão voltar
document.getElementById('btnVoltar').addEventListener('click', () => {
    window.location.href = '/index.html';
});
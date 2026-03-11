// Verifica se está logado
const usuarioLogado = localStorage.getItem('usuario');

if (!usuarioLogado) {
  window.location.href = '/login.html';
} else {
  const usuario = JSON.parse(usuarioLogado);
  const userInfo = document.getElementById('userInfo');
  userInfo.innerHTML = `<p>Olá, <strong>${usuario.nome_exibicao}</strong>!</p>`;
}

// Pega a categoria selecionada
const categoriaAtual = localStorage.getItem('categoriaAtual');

if (!categoriaAtual) {
  window.location.href = '/categorias.html';
} else {
  const categoria = JSON.parse(categoriaAtual);
  
  // Mostra nome da categoria no título
  document.getElementById('tituloCategoria').textContent = categoria.name;
  
  // Carrega os arquivos
  carregarArquivos(categoria.id);
}

// Carregar arquivos da pasta
async function carregarArquivos(pastaId) {
  const listaArquivos = document.getElementById('listaArquivos');
  
  try {
    const resposta = await fetch(`/api/arquivos/${pastaId}`);
    const dados = await resposta.json();
    
    if (dados.sucesso && dados.arquivos.length > 0) {
      listaArquivos.innerHTML = '';
      
      dados.arquivos.forEach(arquivo => {
        const div = document.createElement('div');
        div.className = 'arquivo-item';
        
        // Ícone baseado no tipo
        const icone = arquivo.mimeType === 'application/vnd.google-apps.folder' ? '📁' : '📄';
        
        div.innerHTML = `
          <span class="arquivo-icone">${icone}</span>
          <span class="arquivo-nome">${arquivo.name}</span>
          <a href="${arquivo.webViewLink || arquivo.webContentLink || '#'}" target="_blank" class="btn-download">
            ${arquivo.mimeType === 'application/vnd.google-apps.folder' ? 'Abrir' : 'Download'}
          </a>        
        `;
        
        listaArquivos.appendChild(div);
      });
      
    } else {
      listaArquivos.innerHTML = '<p>Nenhum arquivo encontrado.</p>';
    }
    
  } catch (erro) {
    console.error('Erro ao carregar arquivos:', erro);
    listaArquivos.innerHTML = '<p>Erro ao carregar arquivos.</p>';
  }
}

// Botão voltar
document.getElementById('btnVoltar').addEventListener('click', () => {
  window.location.href = '/categorias.html';
});
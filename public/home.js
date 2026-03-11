// Verifica se está logado
const usuarioLogado = localStorage.getItem('usuario');

if (!usuarioLogado) {
    // Se não estiver logado, redireciona para login
    window.location.href = '/login.html';
} else {
    // Mostra informações do usuário
    const usuario = JSON.parse(usuarioLogado);

    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = `
        <p>Olá, <strong>${usuario.nome_exibicao}</strong>!</p>
        <p>Tipo: ${usuario.tipo}</p>
    `;
}

// Botão de logout
const btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click', () => {
    // Remove usuário do localStorage
    localStorage.removeItem('usuario');

    // Redireciona para login
    window.location.href = '/login.html';
});
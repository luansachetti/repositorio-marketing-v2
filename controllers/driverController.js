const { google } = require('googleapis');
const path = require('path');

// Autenticar com Google Drive
function getDriveClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });

    return google.drive({ version: 'v3', auth });
}

// Listar pastas da pasta raiz
async function listarCategorias(req, res) {
    try {
        const drive = getDriveClient();
        const pastaRaiz = process.env.DRIVE_FOLDER_MARKETING;

        const response = await drive.files.list({
            q: `'${pastaRaiz}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
            orderBy: 'name'
        });

        res.json({
            sucesso: true,
            categorias: response.data.files
        });

    } catch (erro) {
        console.error('Erro ao listar categorias:', erro);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar categorias do Drive'
        });
    }
}

// Listar arquivos de uma pasta específica
async function listarArquivos(req, res) {
    try {
        const drive = getDriveClient();
        const { pastaId } = req.params;

        const response = await drive.files.list({
            q: `'${pastaId}' in parents and trashed=false`,
            field: 'files(id, name, mimeType, webViewLink, webContentLink)',
            orderBy: 'name'
        });

        res.json({
            sucesso: true,
            arquivos: response.data.files
        });

    } catch (erro) {
        console.error('Erro ao listar arquivos:', erro);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar arquivos do Drive'
        });
    }
}

module.exports = { listarCategorias, listarArquivos };
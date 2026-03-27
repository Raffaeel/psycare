
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cadastroFilePath = path.join(__dirname, 'cadastro.json');

function loadCadastros() {
    if (!fs.existsSync(cadastroFilePath)) {
        fs.writeFileSync(cadastroFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(cadastroFilePath, "utf8");
    return JSON.parse(data);

}

function saveCadastros(cadastros) {
    fs.writeFileSync(cadastroFilePath, JSON.stringify(cadastros, null, 2));
}

function createCadastro(novoCadastro) {
    const cadastros = loadCadastros();
    novoCadastro.id = Date.now().toString();
    cadastros.push(novoCadastro);
    saveCadastros(cadastros);
    return novoCadastro;
}

function getAllCadastros() {
    return loadCadastros();
}

function deleteCadastro(id) {
    const cadastros = loadCadastros();
    const novaLista = cadastros.filter(
        c => String(c.id) !== String(id)
    );
    saveCadastros(novaLista);
    return novaLista;
}

export default {
    createCadastro,
    getAllCadastros,
    deleteCadastro
};

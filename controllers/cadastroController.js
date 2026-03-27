

import cadastroModel from '../modules/cadastroModel.js';

function criarCadastro(req, res) {
    const { nome, telefone, email, cpf, endereco } = req.body;

    if (!nome || !telefone || !email || !cpf || !endereco) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    const novoCadastro = cadastroModel.createCadastro({
        nome,
        telefone,
        email,
        cpf,
        endereco
    });
        res.status(201).json(novoCadastro);
}

function listarCadastros(req, res) {
    try {
        const cadastros = cadastroModel.getAllCadastros();
        res.status(200).json(cadastros);
    } catch (erro) {
        console.error("Erro ao listar cadastros:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
}

export function removerCadastro(req, res) {
    const { id } = req.params;
    const novaLista = cadastroModel.deleteCadastro(id);
    res.json({
        message: "Cadastro removido",
        cadastros: novaLista
    });
}

export default {
    criarCadastro,
    listarCadastros,
    removerCadastro
};


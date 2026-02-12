
import agendaModel from "../modules/agendaModel.js";


function criarAgendamento(req, res) {
    const { data, hora, paciente } = req.body;

    if (!data || !hora || !paciente) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    const novo = agendaModel.createAgendamento({
        data,
        hora,
        paciente
    });

    res.status(201).json(novo);
}
function listarAgendamentos(req, res) {
    try {
        const { data } = req.query;

        let agendamentos = agendaModel.getAllAgendamentos();

        if (data) {
            agendamentos = agendamentos.filter(a => a.data === data);
        }

        res.status(200).json(agendamentos);

    } catch (erro) {
        console.error("Erro ao listar agendamentos:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
}



function removerAgendamento(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "ID do agendamento é necessário" });


    agendaModel.deleteAgendamento(id);

    res.status(200).json({ mensagem: "Agendamento removido com sucesso" });
}}



export default {
    criarAgendamento,
    listarAgendamentos,
    removerAgendamento
};
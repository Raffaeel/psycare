
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






export function removerAgendamento(req, res) {
    const { id } = req.params;

    const novaAgenda = agendaModel.deleteAgendamento(id);

    res.json({
        message: "Agendamento removido",
        agenda: novaAgenda
    });
}

export default {
    criarAgendamento,
    listarAgendamentos,
    removerAgendamento
};
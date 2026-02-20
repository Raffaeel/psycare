import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const agendaFilePath = path.join(__dirname, 'agenda.json');

function loadAgenda() {
    if (!fs.existsSync(agendaFilePath)) {
        fs.writeFileSync(agendaFilePath, JSON.stringify([]));
    }

    const data = fs.readFileSync(agendaFilePath, "utf8");
    return JSON.parse(data);
}

function saveAgenda(agenda) {
    fs.writeFileSync(agendaFilePath, JSON.stringify(agenda, null, 2));
}

function createAgendamento(novoAgendamento) {
    const agenda = loadAgenda();

    novoAgendamento.id = Date.now().toString();

    agenda.push(novoAgendamento);
    saveAgenda(agenda);

    return novoAgendamento;
}

function getAllAgendamentos() {
    return loadAgenda();
}

function deleteAgendamento(id) {
    const agenda = loadAgenda();

    // remove o item pelo id
    const novaAgenda = agenda.filter(
        a => String(a.id) !== String(id)
    );

    saveAgenda(novaAgenda);

    return novaAgenda;
}

export default {
    createAgendamento,
    getAllAgendamentos,
    deleteAgendamento
};

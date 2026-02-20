let agendamentosGlobais = [];

// ================= CALENDÁRIO =================
const btnCalendario = document.getElementById('btnCalendario');
const calendario = document.getElementById('calendario');

btnCalendario.addEventListener('click', () => {
    calendario.style.display =
        calendario.style.display === 'none' ? 'block' : 'none';
});

const monthYear = document.getElementById("month-year");
const calendarGrid = document.getElementById("calendarGrid");

const btnPrev = document.querySelector(".prev-month");
const btnNext = document.querySelector(".next-month");

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

function gerarCalendario(mes, ano) {

    calendarGrid.querySelectorAll(".day").forEach(d => d.remove());

    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= totalDias; dia++) {

        const dayEl = document.createElement("div");
        dayEl.classList.add("day");
        dayEl.textContent = dia;

        const dataFormatada =
            `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        const temAgendamento =
            agendamentosGlobais.some(a => a.data === dataFormatada);

        if (temAgendamento) {
            dayEl.classList.add("has-event");
        }

        calendarGrid.appendChild(dayEl);
    }

    monthYear.textContent = `${meses[mes]} ${ano}`;
}

btnPrev.addEventListener("click", () => {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    gerarCalendario(mesAtual, anoAtual);
});

btnNext.addEventListener("click", () => {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    gerarCalendario(mesAtual, anoAtual);
});

gerarCalendario(mesAtual, anoAtual);

// ================= FORMULÁRIO =================
const dia = document.getElementById("selectedDate");
const hora = document.getElementById("selectedTime");
const paciente = document.getElementById("selectedPatient");
const btnAgendar = document.getElementById("Agendar");

btnAgendar.addEventListener("click", () => {

    const agendamento = {
        data: dia.value,
        hora: hora.value,
        paciente: paciente.value
    };

    if (!agendamento.data || !agendamento.hora || !agendamento.paciente) {
        alert("Preencha todos os campos.");
        return;
    }

    fetch("http://localhost:3000/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agendamento)
    })
        .then(async response => {
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Agendamento realizado!");

                dia.value = "";
                hora.value = "";
                paciente.value = "";

                carregarAgendamentos();
            } else {
                alert("Erro ao agendar.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao enviar.");
        });

}); // ✅ AGORA FECHADO CORRETAMENTE

// ================= API =================

function carregarAgendamentos() {
    fetch("http://localhost:3000/api/agenda")
        .then(res => res.json())
        .then(data => {
            agendamentosGlobais = data;
            renderizarLista(data);
            gerarCalendario(mesAtual, anoAtual);
        })
        .catch(error => console.error(error));
}

carregarAgendamentos();

// ================= LISTA =================
function renderizarLista(lista) {

    const ul = document.getElementById("appointmentsList");
    ul.innerHTML = "";

    if (!lista.length) {
        ul.innerHTML = "<li>Nenhum agendamento encontrado.</li>";
        return;
    }

    lista.forEach(agendamento => {

        const dataFormatada =
            new Date(agendamento.data).toLocaleDateString("pt-BR");

        const li = document.createElement("li");
        li.textContent =
            `${agendamento.paciente} - ${agendamento.hora} - ${dataFormatada}`;

        const btn = document.createElement("button");
        btn.textContent = "Cancelar";
        btn.style.marginLeft = "10px";

        btn.addEventListener("click", () =>
            cancelarAgendamento(agendamento.id)
        );

        li.appendChild(btn);
        ul.appendChild(li);
    });
}

// ================= FILTRO =================
dia.addEventListener("change", () => {
    carregarAgendamentosPorData(dia.value);
});

function carregarAgendamentosPorData(dataSelecionada) {
    fetch("http://localhost:3000/api/agenda")
        .then(res => res.json())
        .then(lista => {
            const filtrados =
                lista.filter(a => a.data === dataSelecionada);
            renderizarLista(filtrados);
        });
}

// ================= DELETE =================
function cancelarAgendamento(id) {
console.log("id recebido:", id);
    fetch(`http://localhost:3000/api/agenda/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) throw new Error();
            alert("Agendamento cancelado!");
            carregarAgendamentos();
        })
        .catch(() => alert("Erro ao cancelar."));
}

// ================= TOGGLE LISTA =================
document
    .getElementById("btnMostrarLista")
    .addEventListener("click", toggleLista);

function toggleLista() {

    const lista = document.querySelector(".appointment-list");
    const visivel = window.getComputedStyle(lista).display;

    lista.style.display = visivel === "none" ? "block" : "none";
}
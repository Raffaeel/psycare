

// Selecionar os elementos do DOM calaendario*/
const btnCalendario = document.getElementById('btnCalendario');
const calendario = document.getElementById('calendario');

btnCalendario.addEventListener('click', () => {
    if (calendario.style.display === 'none' ) {
        calendario.style.display = 'block';
    } else {
        calendario.style.display = 'none';
    }   
});

/* calendario atualizado */
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
  // remove dias antigos (mantém os nomes da semana)
  calendarGrid.querySelectorAll(".day").forEach(d => d.remove());

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  // espaços vazios antes do primeiro dia
  for (let dia = 1; dia <= totalDias; dia++) {

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = dia;

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    const temAgendamento = agendamentos.some(a => a.data === dataFormatada);

    if (temAgendamento) {
        dayEl.classList.add("has-event");
    }

    calendarGrid.appendChild(dayEl);
}

  monthYear.textContent = `${meses[mes]} ${ano}`;
}

// botões
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

// inicia
gerarCalendario(mesAtual, anoAtual);


const dia = document.getElementById("selectedDate");
const hora = document.getElementById("selectedTime");
const paciente = document.getElementById("selectedPatient");
const btnAgendar = document.getElementById("Agendar");



btnAgendar.addEventListener("click", () => {
    const dataSelecionada = dia.value;
    const horaSelecionada = hora.value;
    const pacienteSelecionado = paciente.value;

    if (!dataSelecionada || !horaSelecionada || !pacienteSelecionado) {
        alert("Por favor, preencha todos os campos para agendar.");
        return;
    }

    const agendamento = {
        data: dataSelecionada,
        hora: horaSelecionada,
        paciente: pacienteSelecionado
    };

  // ====== CRIAR AGENDAMENTO ======
fetch("http://localhost:3000/api/agenda", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(agendamento)
})
.then(async response => {
    const data = await response.json();
    console.log("Resposta do servidor:", data);

    if (response.ok) {
        alert("Agendamento realizado com sucesso!");

        dia.value = "";
        hora.value = "";
        paciente.value = "";

        // Atualiza lista depois de criar
        carregarAgendamentos();
    } else {
        alert("Erro ao agendar consulta.");
    }
})
.catch(error => {
    console.error("Erro ao enviar agendamento:", error);
    alert("Erro ao enviar agendamento.");
});


// ====== CARREGAR TODOS ======
function carregarAgendamentos() {
    fetch("http://localhost:3000/api/agenda")
        .then(res => res.json())
        .then(data => {
            console.log("Agendamentos recebidos:", data);
            renderizarLista(data);
        })
        .catch(error => console.error("Erro ao buscar agenda:", error));
}

// Carrega ao abrir a página
carregarAgendamentos();


// ====== RENDERIZAR LISTA ======
function renderizarLista(lista) {
    const ul = document.getElementById("appointmentsList");
    ul.innerHTML = "";

    if (lista.length === 0) {
        ul.innerHTML = "<li>Nenhum agendamento encontrado.</li>";
        return;
    }

    lista.forEach(agendamento => {

        const dataObj = new Date(agendamento.data);
        const dataFormatada = dataObj.toLocaleDateString("pt-BR");

        const li = document.createElement("li");
        li.textContent = `${agendamento.paciente} - ${agendamento.hora} - ${dataFormatada}`;

        const btn = document.createElement("button");
        btn.textContent = "Cancelar";
        btn.style.marginLeft = "10px";

        btn.addEventListener("click", () => {
            cancelarAgendamento(agendamento.id);
        });

        li.appendChild(btn);
        ul.appendChild(li);
    });
}




// ====== FILTRAR POR DATA ======
dia.addEventListener("change", () => {
    carregarAgendamentosPorData(dia.value);
});

function carregarAgendamentosPorData(dataSelecionada) {
    fetch("http://localhost:3000/api/agenda")
        .then(res => res.json())
        .then(agendamentos => {

            const filtrados = agendamentos.filter(a =>
                a.data === dataSelecionada
            );

            renderizarLista(filtrados);
        })
        .catch(error => console.error("Erro ao buscar por data:", error));
}

function cancelarAgendamento(id) {
    console.log("CLICOU NO CANCELAR", id);

    fetch(`http://localhost:3000/api/agenda/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        console.log("DELETE OK", data);
        carregarAgendamentos();
    })
    .catch(error => console.error("ERRO:", error));
}});




btn.addEventListener("click", () => {
    cancelarAgendamento(agendamento.id);
});


function toggleLista() {
    const lista = document.querySelector(".appointment-list");

    if (lista.style.display === "none") {
        lista.style.display = "block";
    } else {
        lista.style.display = "none";
    }
}

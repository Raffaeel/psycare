document.addEventListener("DOMContentLoaded", function () {

    const btnPaciente = document.getElementById("btnPaciente");
    const paciente = document.getElementById("paciente");
    const btnMostrarLista = document.getElementById("btnMostrarLista");
    const btnAdicionarPaciente = document.getElementById("btnAdicionarPaciente");
    const lista = document.querySelector(".appointment-list");
    const appointmentsList = document.getElementById("appointmentsList");

    // ===== MOSTRAR / ESCONDER SEÇÃO PACIENTE =====
    if (btnPaciente && paciente) {
        btnPaciente.addEventListener("click", () => {
            try {
                carregarPacientes();
            } catch (e) {
                console.error("Erro ao carregar pacientes:", e);
            }

            paciente.style.display =
                paciente.style.display === "none" ? "block" : "none";
        });
    }

    // ===== MOSTRAR / ESCONDER LISTA =====
    if (btnMostrarLista && lista) {
        btnMostrarLista.addEventListener("click", () => {
            lista.style.display =
                lista.style.display === "none" ? "block" : "none";
        });
    }

    // ===== ADICIONAR PACIENTE =====
    if (btnAdicionarPaciente) {
        btnAdicionarPaciente.addEventListener("click", async () => {

            const nome = document.getElementById("nome").value.trim();
            const data = document.getElementById("data").value;
            const telefone = document.getElementById("telefone").value.trim();
            const email = document.getElementById("email").value.trim();
            const cpf = document.getElementById("cpf").value.trim();
            const endereco = document.getElementById("endereco").value.trim();

            if (!nome || !data || !telefone || !email || !cpf || !endereco) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const novoPaciente = {
                nome,
                data,
                telefone,
                email,
                cpf,
                endereco
            };

            try {
                const response = await fetch("http://localhost:3000/api/cadastro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novoPaciente)
                });

                const dataResponse = await response.json();

                if (response.ok) {
                    alert("Paciente cadastrado com sucesso.");

                    // Limpar campos
                    document.getElementById("nome").value = "";
                    document.getElementById("data").value = "";
                    document.getElementById("telefone").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("cpf").value = "";
                    document.getElementById("endereco").value = "";

                    carregarPacientes();
                } else {
                    alert("Erro ao cadastrar paciente.");
                    console.log(dataResponse);
                }

            } catch (error) {
                console.error(error);
                alert("Erro ao enviar dados.");
            }
        });
    }

    // ===== BUSCAR PACIENTES =====
    async function carregarPacientes() {
        try {
            const response = await fetch("http://localhost:3000/api/cadastro");
            const dados = await response.json();

            renderizarLista(dados); // agora existe ✅
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
        }
    }

    // ===== RENDERIZAR LISTA (CORREÇÃO DO ERRO) =====
    function renderizarLista(pacientes) {
        if (!appointmentsList) return;

        appointmentsList.innerHTML = "";

        if (!Array.isArray(pacientes)) return;

        pacientes.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.nome} - ${p.telefone} - ${p.email}`;
            appointmentsList.appendChild(li);
        });
    }

});
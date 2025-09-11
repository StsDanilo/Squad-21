document.addEventListener("DOMContentLoaded", () => {
    const tabelaPacientes = document.getElementById("pacientes-tabela");
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    const atualizarLista = () => {
        if (!tabelaPacientes) return;
        const tbody = tabelaPacientes.querySelector("tbody");
        tbody.innerHTML = "";

        pacientes.forEach((paciente, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td data-label="Nome">${paciente.nome}</td>
                <td data-label="Telefone ou Celular">${paciente.celular || "-"}</td>
                <td data-label="Cidade">${paciente.cidade || "-"}</td>
                <td data-label="Estado">${paciente.estado || "-"}</td>
                <td data-label="Ações">
                    <button class="btn btn-edit" data-id="${paciente.id}">Editar</button>
                    <button class="btn btn-delete" data-index="${index}">Excluir</button>
                    <button class="btn btn-detail" data-id="${paciente.id}">Detalhes</button>
                    </td>
            `;
            tbody.appendChild(row);
        });

        // Adiciona event listeners para os botões "Editar"
        document.querySelectorAll(".btn-edit").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                window.location.href = `addPaciente/addPacient.html?id=${id}`;
            });
        });

        // Adiciona event listeners para os botões "Excluir"
        document.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                if (confirm("Tem certeza que deseja excluir este paciente?")) {
                    pacientes.splice(index, 1);
                    localStorage.setItem("pacientes", JSON.stringify(pacientes));
                    atualizarLista();
                }
            });
        });

        document.querySelectorAll(".btn-detail").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                window.location.href = `addPaciente/addPacient.html?mode=detalhes&id=${id}`;
            });
        });
    };

    atualizarLista();
});

document.addEventListener("DOMContentLoaded", () => {
    const tabelaPacientes = document.getElementById("pacientes-tabela");
    const searchInput = document.getElementById("search-input");
    const filterType = document.getElementById("filter-type");
    const searchButton = document.getElementById("search-button");

    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    const atualizarLista = (filtro = "", tipo = "geral") => {
        if (!tabelaPacientes) return;
        const tbody = tabelaPacientes.querySelector("tbody");
        tbody.innerHTML = "";

        pacientes
            .filter((paciente) => {
                if (!filtro) return true;

                const termo = filtro.toLowerCase();

                if (tipo === "geral") {
                    // Busca em todos os campos
                    return (paciente.nome || "").toLowerCase().includes(termo) || (paciente.celular || "").toLowerCase().includes(termo) || (paciente.cidade || "").toLowerCase().includes(termo) || (paciente.estado || "").toLowerCase().includes(termo) || (paciente.convenio || "").toLowerCase().includes(termo) || (paciente.cpf || "").toLowerCase().includes(termo);
                } else {
                    // Busca apenas no campo escolhido
                    const valorCampo = (paciente[tipo] || "").toString().toLowerCase();
                    return valorCampo.includes(termo);
                }
            })
            .forEach((paciente, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td data-label="Nome">${paciente.nome}</td>
                    <td data-label="Telefone ou Celular">${paciente.celular || "-"}</td>
                    <td data-label="Cidade">${paciente.cidade || "-"}</td>
                    <td data-label="Estado">${paciente.estado || "-"}</td>
                    <td data-label="Ações">
                        <button class="btn btn-edit" data-id="${paciente.id}">Editar</button>
                        <button class="btn btn-delete" data-index="${index}">Excluir</button>
                        <button class="btn btn-detail" data-id="${paciente.id}">Detalhes</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

        // Botões Editar
        document.querySelectorAll(".btn-edit").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                window.location.href = `addPaciente/addPacient.html?id=${id}`;
            });
        });

        // Botões Excluir
        document.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                if (confirm("Tem certeza que deseja excluir este paciente?")) {
                    pacientes.splice(index, 1);
                    localStorage.setItem("pacientes", JSON.stringify(pacientes));
                    atualizarLista();
                }
            });
        });

        document.querySelectorAll(".btn-detail").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                window.location.href = `addPaciente/addPacient.html?mode=detalhes&id=${id}`;
            });
        });
    };

    // Clique no botão de busca
    searchButton.addEventListener("click", () => {
        atualizarLista(searchInput.value, filterType.value);
    });

    // Enter no campo de busca
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            atualizarLista(searchInput.value, filterType.value);
        }
    });

    atualizarLista();
});

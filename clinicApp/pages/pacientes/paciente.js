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
    };

    atualizarLista();
});

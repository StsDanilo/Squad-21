document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    // Pega o ID do paciente da URL. Se não houver, 'editId' será null.
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get("id");

    if (form) {
        // Carrega a lista de pacientes
        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        let pacienteParaEditar = null;

        // Se houver um ID de edição na URL, encontra o paciente correspondente
        if (editId) {
            pacienteParaEditar = pacientes.find((p) => p.id == editId);
            if (pacienteParaEditar) {
                // Preenche o formulário com os dados do paciente para edição
                document.getElementById("nome").value = pacienteParaEditar.nome;
                document.getElementById("celular").value = pacienteParaEditar.celular;
                document.getElementById("cidade").value = pacienteParaEditar.cidade;
                document.getElementById("estado").value = pacienteParaEditar.estado;
            }
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Coletando os dados do formulário
            const pacienteNovoOuAtualizado = {
                nome: document.getElementById("nome").value,
                celular: document.getElementById("celular").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value,
            };

            if (pacienteParaEditar) {
                // Se for um paciente para editar, atualiza os dados dele
                Object.assign(pacienteParaEditar, pacienteNovoOuAtualizado);
            } else {
                // Se for um novo paciente, cria um ID único e o adiciona à lista
                pacienteNovoOuAtualizado.id = Date.now();
                pacientes.push(pacienteNovoOuAtualizado);
            }

            // Salva a lista atualizada de volta no localStorage
            localStorage.setItem("pacientes", JSON.stringify(pacientes));

            // Redireciona para a página de listagem
            window.location.href = "/clinicApp/pages/pacientes/paciente.html";
        });
    }
});

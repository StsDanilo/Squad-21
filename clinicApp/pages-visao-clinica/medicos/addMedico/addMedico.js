document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    // Pega o ID do paciente da URL. Se não houver, 'editId' será null.
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get("id");

    function desativarFormulario() {
        // Desativa todos os inputs, selects e textareas
        form.querySelectorAll("input, select, textarea").forEach((el) => {
            el.disabled = true;
        });

        // Remove o botão de submit
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.remove();
        }
    }

    // Exemplo: se a URL tiver ?mode=detalhes
    if (window.location.search.includes("mode=detalhes")) {
        desativarFormulario();
    }

    if (form) {
        // Carrega a lista de pacientes
        let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
        let medicoParaEditar = null;

        // Se houver um ID de edição na URL, encontra o medico correspondente
        if (editId) {
            medicoParaEditar = medicos.find((p) => p.id == editId);
            if (medicoParaEditar) {
                // Preenche o formulário com os dados do medico para edição
                document.getElementById("nome").value = medicoParaEditar.nome;
                document.getElementById("celular").value = medicoParaEditar.celular;
                document.getElementById("cidade").value = medicoParaEditar.cidade;
                document.getElementById("estado").value = medicoParaEditar.estado;
                document.getElementById("nomeSocial").value = medicoParaEditar.nomeSocial;
                document.getElementById("cpf").value = medicoParaEditar.cpf;
                document.getElementById("outrosDocs").value = medicoParaEditar.outrosDocs;
                document.getElementById("numDoc").value = medicoParaEditar.numDoc;
                document.getElementById("sexo").value = medicoParaEditar.sexo;
                document.getElementById("dataNascimento").value = medicoParaEditar.dataNascimento;
                document.getElementById("cep").value = medicoParaEditar.cep;
                document.getElementById("etnia").value = medicoParaEditar.etnia;
                document.getElementById("raca").value = medicoParaEditar.raca;
                document.getElementById("nacionalidade").value = medicoParaEditar.nacionalidade;
                document.getElementById("estadoCivil").value = medicoParaEditar.estadoCivil;
                document.getElementById("nomeMae").value = medicoParaEditar.nomeMae;
                document.getElementById("nomePai").value = medicoParaEditar.nomePai;
                document.getElementById("nomeEsposo").value = medicoParaEditar.nomeEsposo;
                document.getElementById("endereco").value = medicoParaEditar.endereco;
                document.getElementById("numero").value = medicoParaEditar.numero;
                document.getElementById("complemento").value = medicoParaEditar.complemento;
                document.getElementById("bairro").value = medicoParaEditar.bairro;
                document.getElementById("email").value = medicoParaEditar.email;
                document.getElementById("telefone1").value = medicoParaEditar.telefone1;

            }
        }

        const cpf = document.getElementById("cpf");
        const telefone = document.getElementById("telefone1");
        const celular = document.getElementById("celular");

        // Aplique as máscaras
        new Inputmask("999.999.999-99").mask(cpf);
        new Inputmask("(99) 99999-9999").mask(celular);
        new Inputmask("(99) 9999-9999").mask(telefone);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Coletando os dados do formulário
            const medicoNovoOuAtualizado = {
                nome: document.getElementById("nome").value,
                celular: document.getElementById("celular").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value,
                nomeSocial: document.getElementById("nomeSocial").value,
                cpf: document.getElementById("cpf").value.replace(/[.\-]/g, ""),
                outrosDocs: document.getElementById("outrosDocs").value,
                numDoc: document.getElementById("numDoc").value,
                sexo: document.getElementById("sexo").value,
                dataNascimento: document.getElementById("dataNascimento").value,
                etnia: document.getElementById("etnia").value,
                raca: document.getElementById("raca").value,
                nacionalidade: document.getElementById("nacionalidade").value,
                estadoCivil: document.getElementById("estadoCivil").value,
                nomeMae: document.getElementById("nomeMae").value,
                nomePai: document.getElementById("nomePai").value,
                nomeEsposo: document.getElementById("nomeEsposo").value,
                endereco: document.getElementById("endereco").value,
                numero: document.getElementById("numero").value,
                complemento: document.getElementById("complemento").value,
                bairro: document.getElementById("bairro").value,
                email: document.getElementById("email").value,
                telefone1: document.getElementById("telefone1").value,
            };

            if (medicoParaEditar) {
                // Se for um medico para editar, atualiza os dados dele
                Object.assign(medicoParaEditar, medicoNovoOuAtualizado);
            } else {
                // Se for um novo medico, cria um ID único e o adiciona à lista
                medicoNovoOuAtualizado.id = Date.now();
                medicos.push(medicoNovoOuAtualizado);
            }

            // Salva a lista atualizada de volta no localStorage
            localStorage.setItem("medicos", JSON.stringify(medicos));

            // Redireciona para a página de listagem
            window.location.href = "../crud-medico.html";
        });
    }
});

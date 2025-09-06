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
                document.getElementById("nomeSocial").value = pacienteParaEditar.nomeSocial;
                document.getElementById("cpf").value = pacienteParaEditar.cpf;
                document.getElementById("rg").value = pacienteParaEditar.rg;
                document.getElementById("outrosDocs").value = pacienteParaEditar.outrosDocs;
                document.getElementById("numDoc").value = pacienteParaEditar.numDoc;
                document.getElementById("sexo").value = pacienteParaEditar.sexo;
                document.getElementById("dataNascimento").value = pacienteParaEditar.dataNascimento;
                document.getElementById("etnia").value = pacienteParaEditar.etnia;
                document.getElementById("raca").value = pacienteParaEditar.raca;
                document.getElementById("nacionalidade").value = pacienteParaEditar.nacionalidade;
                document.getElementById("estadoCivil").value = pacienteParaEditar.estadoCivil;
                document.getElementById("nomeMae").value = pacienteParaEditar.nomeMae;
                document.getElementById("profissaoMae").value = pacienteParaEditar.profissaoMae;
                document.getElementById("nomePai").value = pacienteParaEditar.nomePai;
                document.getElementById("profissaoPai").value = pacienteParaEditar.profissaoPai;
                document.getElementById("nomeResponsavel").value = pacienteParaEditar.nomeResponsavel;
                document.getElementById("cpfResponsavel").value = pacienteParaEditar.cpfResponsavel;
                document.getElementById("nomeEsposo").value = pacienteParaEditar.nomeEsposo;
                document.getElementById("endereco").value = pacienteParaEditar.endereco;
                document.getElementById("numero").value = pacienteParaEditar.numero;
                document.getElementById("complemento").value = pacienteParaEditar.complemento;
                document.getElementById("bairro").value = pacienteParaEditar.bairro;
                document.getElementById("email").value = pacienteParaEditar.email;
                document.getElementById("telefone1").value = pacienteParaEditar.telefone1;
                document.getElementById("tipoSanguineo").value = pacienteParaEditar.tipoSanguineo;
                document.getElementById("peso").value = pacienteParaEditar.peso;
                document.getElementById("altura").value = pacienteParaEditar.altura;
                document.getElementById("alergias").value = pacienteParaEditar.alergias;
                document.getElementById("convenio").value = pacienteParaEditar.convenio;
                document.getElementById("plano").value = pacienteParaEditar.plano;
                document.getElementById("matricula").value = pacienteParaEditar.matricula;
                document.getElementById("validadeCarteira").value = pacienteParaEditar.validadeCarteira;
                document.getElementById("validadeIndeterminada").value = pacienteParaEditar.validadeIndeterminada;
                document.getElementById("codigoLegado").value = pacienteParaEditar.codigoLegado;
                document.getElementById("observacoes").value = pacienteParaEditar.observacoes;
                document.getElementById("anexos").value = pacienteParaEditar.anexos;
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
            const pacienteNovoOuAtualizado = {
                nome: document.getElementById("nome").value,
                celular: document.getElementById("celular").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value,
                nomeSocial: document.getElementById("nomeSocial").value,
                cpf: document.getElementById("cpf").value,
                rg: document.getElementById("rg").value,
                outrosDocs: document.getElementById("outrosDocs").value,
                numDoc: document.getElementById("numDoc").value,
                sexo: document.getElementById("sexo").value,
                dataNascimento: document.getElementById("dataNascimento").value,
                etnia: document.getElementById("etnia").value,
                raca: document.getElementById("raca").value,
                nacionalidade: document.getElementById("nacionalidade").value,
                estadoCivil: document.getElementById("estadoCivil").value,
                nomeMae: document.getElementById("nomeMae").value,
                profissaoMae: document.getElementById("profissaoMae").value,
                nomePai: document.getElementById("nomePai").value,
                profissaoPai: document.getElementById("profissaoPai").value,
                nomeResponsavel: document.getElementById("nomeResponsavel").value,
                cpfResponsavel: document.getElementById("cpfResponsavel").value,
                nomeEsposo: document.getElementById("nomeEsposo").value,
                endereco: document.getElementById("endereco").value,
                numero: document.getElementById("numero").value,
                complemento: document.getElementById("complemento").value,
                bairro: document.getElementById("bairro").value,
                email: document.getElementById("email").value,
                celular: document.getElementById("celular").value,
                telefone1: document.getElementById("telefone1").value,
                tipoSanguineo: document.getElementById("tipoSanguineo").value,
                peso: document.getElementById("peso").value,
                altura: document.getElementById("altura").value,
                alergias: document.getElementById("alergias").value,
                convenio: document.getElementById("convenio").value,
                plano: document.getElementById("plano").value,
                matricula: document.getElementById("matricula").value,
                validadeCarteira: document.getElementById("validadeCarteira").value,
                validadeIndeterminada: document.getElementById("validadeIndeterminada").value,
                codigoLegado: document.getElementById("codigoLegado").value,
                observacoes: document.getElementById("observacoes").value,
                anexos: document.getElementById("anexos").value,
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
            window.location.href = "/clinicApp/pages/pacientes/paciente - Copia.html";
        });
    }
});

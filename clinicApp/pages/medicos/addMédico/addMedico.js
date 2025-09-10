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

        // Se houver um ID de edição na URL, encontra o paciente correspondente
        if (editId) {
            medicoParaEditar = medicos.find((p) => p.id == editId);
            if (medicoParaEditar) {
                // Preenche o formulário com os dados do paciente para edição
                      
                
                document.getElementById("nome").value = medicoParaEditar.nome;
                document.getElementById("celular").value = medicoParaEditar.celular;
                document.getElementById("cidade").value = medicoParaEditar.cidade;
                document.getElementById("estado").value = medicoParaEditar.estado;
                document.getElementById("nomeSocial").value = medicoParaEditar.nomeSocial;
                document.getElementById("cpf").value = medicoParaEditar.cpf;
                document.getElementById("rg").value = medicoParaEditar.rg;
                document.getElementById("crm").value = medicoParaEditar.crm;
                document.getElementById("especialidade_principal").value = medicoParaEditar.especialidade_principal;
                document.getElementById("sexo").value = medicoParaEditar.sexo;
                document.getElementById("dataNascimento").value = medicoParaEditar.dataNascimento;
                document.getElementById("subespecialidade").value = medicoParaEditar.subespecialidade;
                document.getElementById("universidade").value = medicoParaEditar.universidade;
                document.getElementById("nacionalidade").value = medicoParaEditar.nacionalidade;
                document.getElementById("ano").value = medicoParaEditar.ano;
                document.getElementById("curriculo").value = medicoParaEditar.curriculo;
                document.getElementById("rqe").value = medicoParaEditar.rqe;
                document.getElementById("assinatura").value = medicoParaEditar.assinatura;
                document.getElementById("convenios").value = medicoParaEditar.convenios;
                document.getElementById("disponibilidade").value = medicoParaEditar.disponibilidade;
                document.getElementById("localAtendimento").value = medicoParaEditar.localAtendimento;
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
        const crm = document.getElementById("crm");

        // Aplique as máscaras
        new Inputmask("999.999.999-99").mask(cpf);
        new Inputmask("(99) 99999-9999").mask(celular);
        new Inputmask("(99) 9999-9999").mask(telefone);
        new Inputmask("99999999-9/AA").mask(crm);

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
                rg: document.getElementById("rg").value,
                crm: document.getElementById("crm").value,
                especialidade_principal: document.getElementById("especialidade_principal").value,
                sexo: document.getElementById("sexo").value,
                dataNascimento: document.getElementById("dataNascimento").value,
                subespecialidade: document.getElementById("subespecialidade").value,
                universidade: document.getElementById("universidade").value,
                nacionalidade: document.getElementById("nacionalidade").value,
                ano: document.getElementById("ano").value,
                curriculo: document.getElementById("curriculo").value,
                rqe: document.getElementById("rqe").value,
                assinatura: document.getElementById("assinatura").value,
                convenios: document.getElementById("convenios").value,
                disponibilidade: document.getElementById("disponibilidade").value,
                localAtendimento: document.getElementById("localAtendimento").value,
                endereco: document.getElementById("endereco").value,
                numero: document.getElementById("numero").value,
                complemento: document.getElementById("complemento").value,
                bairro: document.getElementById("bairro").value,
                email: document.getElementById("email").value,
                celular: document.getElementById("celular").value,
                telefone1: document.getElementById("telefone1").value,
            };

            if (medicoParaEditar) {
                // Se for um paciente para editar, atualiza os dados dele
                Object.assign(medicoParaEditar, medicoNovoOuAtualizado);
            } else {
                // Se for um novo paciente, cria um ID único e o adiciona à lista
                medicoNovoOuAtualizado.id = Date.now();
                medicos.push(medicoNovoOuAtualizado);
            }

            // Salva a lista atualizada de volta no localStorage
            localStorage.setItem("medicos", JSON.stringify(medicos));

            // Redireciona para a página de listagem
            window.location.href = "../medico.html";
        });
    }
});

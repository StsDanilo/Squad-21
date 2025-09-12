/*
/*********************************************************************************\
* *
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ATENÇÃO  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!      *
* *
* Esta URL aponta para um SERVIDOR DE TESTES (MOCK).                              *
* Ele serve para que possamos desenvolver e aprender sem precisar de uma API      *
* real funcionando. As respostas são SIMULADAS.                                   *
* *
\*********************************************************************************/
const baseURL = 'https://mock.apidog.com/m1/1053378-0-default';

// --- Elementos da Seção de Busca ---
const loadForm = document.getElementById('load-form');
const patientIdInput = document.getElementById('patient-id-input');

// --- Elementos da Seção de Edição ---
const editFormSection = document.getElementById('edit-form-section');
const updateForm = document.getElementById('update-form');
const editFieldset = document.getElementById('edit-fieldset');
const patientIdHidden = document.getElementById('patient-id-hidden');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');
const dataNascimentoInput = document.getElementById('data_nascimento');
const sexoInput = document.getElementById('sexo');
const celularInput = document.getElementById('celular');

// --- Elemento da Seção de Resposta ---
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FASE 1: FUNÇÃO PARA CARREGAR DADOS DO PACIENTE
========================================
*/
const handleLoadPatientData = async (event) => {
    event.preventDefault();
    const patientId = patientIdInput.value.trim();

    if (!patientId) {
        apiResponseViewer.textContent = 'Por favor, insira um ID.';
        return;
    }

    try {
        apiResponseViewer.textContent = `Buscando dados do paciente ID: ${patientId}...`;
        editFormSection.style.display = 'none';
        editFieldset.disabled = true;

        const response = await fetch(`${baseURL}/pacientes/${patientId}`);

        if (!response.ok) {
            throw new Error(`Paciente com ID ${patientId} não encontrado.`);
        }

        const patient = await response.json();
        const patientData = patient.data;

        // Preenche os campos do formulário
        patientIdHidden.value = patientData.id;
        nomeInput.value = patientData.nome;
        dataNascimentoInput.value = patientData.data_nascimento.split('T')[0];
        sexoInput.value = patientData.sexo;

        // Aplica a máscara nos dados que vêm da API
        cpfInput.value = formatCPF(patientData.cpf);
        celularInput.value = formatPhone(patientData.contato.celular);

        // Exibe e habilita o formulário de edição
        editFormSection.style.display = 'block';
        editFieldset.disabled = false;
        apiResponseViewer.textContent = `Dados de "${patientData.nome}" carregados. Você pode editar abaixo.`;

    } catch (error) {
        console.error('Erro ao carregar dados do paciente:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  FASE 2: FUNÇÃO PARA ATUALIZar o PACIENTE (PUT)
========================================
*/
const handleUpdatePatient = async (event) => {
    event.preventDefault();
    
    const patientId = patientIdHidden.value;
    if (!patientId) {
        alert('Nenhum paciente carregado para atualização.');
        return;
    }

    // Limpa os dados mascarados antes de enviar
    const cleanCpf = cpfInput.value.replace(/\D/g, '');
    const cleanCelular = celularInput.value.replace(/\D/g, '');

    const updatedPatientData = {
        nome: nomeInput.value,
        cpf: cleanCpf,
        data_nascimento: dataNascimentoInput.value,
        sexo: sexoInput.value,
        contato: {
            celular: cleanCelular
        }
    };

    try {
        apiResponseViewer.textContent = 'Enviando alterações...';

        const response = await fetch(`${baseURL}/pacientes/${patientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPatientData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Falha ao atualizar o paciente.');
        }

        apiResponseViewer.innerHTML = `<span class="success">Paciente atualizado com sucesso!</span>\n\n${JSON.stringify(result, null, 2)}`;
        editFormSection.style.display = 'none';
        loadForm.reset();

    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO AS FUNÇÕES AOS EVENTOS
========================================
*/
loadForm.addEventListener('submit', handleLoadPatientData);
updateForm.addEventListener('submit', handleUpdatePatient);

/*
========================================
  BLOCO UNIVERSAL DE MÁSCARAS (v2)
========================================
*/
const formatCPF = (value) => {
    return value
        .toString()
        .replace(/\D/g, '')
        .substring(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};

const formatPhone = (value) => {
    return value
        .toString()
        .replace(/\D/g, '')
        .substring(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
};

const formatName = (value) => {
    return value.replace(/[0-9]/g, '');
};

const handleInputMask = (event) => {
    const input = event.target;
    const maskType = input.dataset.mask;

    if (maskType === 'cpf') {
        input.value = formatCPF(input.value);
    } else if (maskType === 'phone') {
        input.value = formatPhone(input.value);
    } else if (maskType === 'name') {
        input.value = formatName(input.value);
    }
};

document.querySelectorAll('input[data-mask]').forEach(input => {
    input.addEventListener('input', handleInputMask);
});
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

/*
========================================
  SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
========================================
*/
const patientForm = document.getElementById('patient-form');
const patientIdInput = document.getElementById('patient-id');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');
const dataNascimentoInput = document.getElementById('data_nascimento');
const sexoInput = document.getElementById('sexo');
const celularInput = document.getElementById('celular');
const patientListBody = document.getElementById('patient-list');
const apiResponseViewer = document.getElementById('api-response');
const clearFormBtn = document.getElementById('clear-form-btn');

/*
========================================
  FUNÇÃO PARA BUSCAR E EXIBIR PACIENTES (READ)
========================================
*/
const fetchAndDisplayPatients = async () => {
    patientListBody.innerHTML = '<tr><td colspan="3">Carregando pacientes...</td></tr>';
    try {
        const response = await fetch(`${baseURL}/pacientes`);
        const responseData = await response.json();
        
        apiResponseViewer.textContent = JSON.stringify(responseData, null, 2);

        const patients = responseData.data;
        patientListBody.innerHTML = '';

        if (!Array.isArray(patients) || patients.length === 0) {
            patientListBody.innerHTML = '<tr><td colspan="3">Nenhum paciente encontrado.</td></tr>';
            return;
        }

        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.nome}</td>
                <td>${formatCPF(patient.cpf)}</td>
                <td>
                    <button class="edit-btn" data-id="${patient.id}">Editar</button>
                    <button class="delete-btn" data-id="${patient.id}">Excluir</button>
                </td>
            `;
            patientListBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        patientListBody.innerHTML = '<tr><td colspan="3">Erro ao carregar pacientes.</td></tr>';
    }
};

/*
========================================
  FUNÇÃO PARA LIDAR COM CRIAÇÃO/ATUALIZAÇÃO (CREATE/UPDATE)
========================================
*/
const handleFormSubmit = async (event) => {
    event.preventDefault();

    const cleanCpf = cpfInput.value.replace(/\D/g, '');
    const cleanCelular = celularInput.value.replace(/\D/g, '');

    const patientData = {
        nome: nomeInput.value,
        cpf: cleanCpf,
        data_nascimento: dataNascimentoInput.value,
        sexo: sexoInput.value,
        contato: { celular: cleanCelular }
    };

    const patientId = patientIdInput.value;
    const isUpdating = !!patientId;

    const url = isUpdating ? `${baseURL}/pacientes/${patientId}` : `${baseURL}/pacientes`;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData),
        });

        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);

        if (!response.ok) throw new Error('A resposta da API não foi bem-sucedida.');
        
        patientForm.reset();
        patientIdInput.value = '';
        fetchAndDisplayPatients();
    } catch (error) {
        console.error('Erro ao salvar paciente:', error);
        alert('Não foi possível salvar o paciente.');
    }
};

/*
========================================
  FUNÇÃO PARA PREENCHER O FORMULÁRIO PARA EDIÇÃO
========================================
*/
const handleEditPatient = async (id) => {
    try {
        const response = await fetch(`${baseURL}/pacientes/${id}`);
        const responseData = await response.json();
        const patient = responseData.data;

        patientIdInput.value = patient.id;
        nomeInput.value = patient.nome;
        
        cpfInput.value = formatCPF(patient.cpf);
        celularInput.value = formatPhone(patient.contato.celular);
        
        dataNascimentoInput.value = patient.data_nascimento.split('T')[0];
        sexoInput.value = patient.sexo;
        
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Erro ao buscar dados do paciente para edição:', error);
        alert('Não foi possível carregar os dados para edição.');
    }
};

/*
========================================
  FUNÇÃO PARA EXCLUIR UM PACIENTE (DELETE)
========================================
*/
const handleDeletePatient = async (id) => {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
        try {
            const response = await fetch(`${baseURL}/pacientes/${id}`, {
                method: 'DELETE',
            });
            
            const result = await response.json();
            apiResponseViewer.textContent = JSON.stringify(result, null, 2);

            fetchAndDisplayPatients();
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            alert('Não foi possível excluir o paciente.');
        }
    }
};

/*
========================================
  CONECTANDO AS FUNÇÕES AOS EVENTOS DO USUÁRIO
========================================
*/
patientForm.addEventListener('submit', handleFormSubmit);

clearFormBtn.addEventListener('click', () => {
    patientForm.reset();
    patientIdInput.value = '';
});

patientListBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const id = event.target.dataset.id;
        handleEditPatient(id);
    }
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.dataset.id;
        handleDeletePatient(id);
    }
});

/*
========================================
  INICIALIZAÇÃO DA APLICAÇÃO
========================================
*/
document.addEventListener('DOMContentLoaded', fetchAndDisplayPatients);


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
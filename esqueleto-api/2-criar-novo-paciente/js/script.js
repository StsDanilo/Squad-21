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
const patientForm = document.getElementById('create-patient-form');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');
const dataNascimentoInput = document.getElementById('data_nascimento');
const sexoInput = document.getElementById('sexo');
const celularInput = document.getElementById('celular');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA LIDAR COM A CRIAÇÃO DO PACIENTE (CREATE)
========================================
*/
const handleCreatePatient = async (event) => {
    event.preventDefault();

    // Limpa os dados mascarados antes de enviar para a API
    const cleanCpf = cpfInput.value.replace(/\D/g, '');
    const cleanCelular = celularInput.value.replace(/\D/g, '');

    const patientData = {
        nome: nomeInput.value,
        cpf: cleanCpf,
        data_nascimento: dataNascimentoInput.value,
        sexo: sexoInput.value,
        contato: {
            celular: cleanCelular
        }
    };

    try {
        apiResponseViewer.textContent = 'Enviando dados para a API...';
        
        const response = await fetch(`${baseURL}/pacientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        const result = await response.json();

        if (response.ok) {
            apiResponseViewer.innerHTML = `<span class="success">Paciente cadastrado com sucesso!</span>\n\n${JSON.stringify(result, null, 2)}`;
            patientForm.reset();
        } else {
            throw new Error(result.message || 'Não foi possível cadastrar o paciente.');
        }

    } catch (error) {
        console.error('Erro ao cadastrar paciente:', error);
        apiResponseViewer.innerHTML = `<span class="error">Erro:</span> ${error.message}`;
    }
};


/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
patientForm.addEventListener('submit', handleCreatePatient);

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
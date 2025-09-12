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

const cpfForm = document.getElementById('cpf-validation-form');
const cpfInput = document.getElementById('cpf-input');
const submitButton = document.getElementById('submit-button'); // Novo seletor
const validationStatus = document.getElementById('validation-status');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA MASCARAR E VALIDAR O INPUT
========================================
*/
const handleCpfInput = () => {
    // 1. Limpa o valor, mantendo apenas dígitos.
    let cleanValue = cpfInput.value.replace(/\D/g, '');

    // 2. Limita a 11 dígitos.
    cleanValue = cleanValue.substring(0, 11);

    // 3. Aplica a máscara.
    let maskedValue = cleanValue;
    if (cleanValue.length > 3) {
        maskedValue = cleanValue.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (cleanValue.length > 6) {
        maskedValue = maskedValue.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (cleanValue.length > 9) {
        maskedValue = maskedValue.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    // 4. Atualiza o valor do input com a máscara.
    cpfInput.value = maskedValue;

    // 5. Habilita ou desabilita o botão de submit.
    if (cleanValue.length === 11) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
};

/*
========================================
  FUNÇÃO PARA CHAMAR A API E VALIDAR O CPF
========================================
*/
const handleCpfValidation = async (event) => {
    event.preventDefault();

    const cpf = cpfInput.value;
    const cleanCpf = cpf.replace(/\D/g, '');

    // Verificação extra de segurança, embora o botão devesse estar desabilitado.
    if (cleanCpf.length !== 11) {
        validationStatus.textContent = 'O CPF deve conter 11 dígitos.';
        validationStatus.className = 'invalid';
        return;
    }
    
    try {
        validationStatus.textContent = 'Validando...';
        validationStatus.className = 'validating';
        apiResponseViewer.textContent = 'Enviando requisição para a API...';

        const url = `${baseURL}/pacientes/validar-cpf`;
        const requestBody = { cpf: cleanCpf };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);

        if (response.ok && result.data.status === 'valido') {
            validationStatus.textContent = 'CPF Válido!';
            validationStatus.className = 'valid';
        } else {
            validationStatus.textContent = 'CPF Inválido!';
            validationStatus.className = 'invalid';
        }
    } catch (error) {
        console.error('Erro na validação do CPF:', error);
        validationStatus.textContent = 'Erro ao consultar a API.';
        validationStatus.className = 'invalid';
        apiResponseViewer.textContent = `{ "error": "${error.message}" }`;
    }
};

/*
========================================
  CONECTANDO AS FUNÇÕES AOS EVENTOS
========================================
*/
// Evento para aplicar a máscara em tempo real.
cpfInput.addEventListener('input', handleCpfInput);

// Evento para chamar a API quando o formulário for enviado.
cpfForm.addEventListener('submit', handleCpfValidation);
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

const cepForm = document.getElementById('cep-form');
const cepInput = document.getElementById('cep-input');
const statusMessage = document.getElementById('status-message');

const logradouroSpan = document.getElementById('logradouro');
const bairroSpan = document.getElementById('bairro');
const cidadeSpan = document.getElementById('cidade');
const estadoSpan = document.getElementById('estado');

/*
========================================
  FUNÇÃO PARA LIMPAR E RESETAR OS RESULTADOS
========================================
*/
const clearAddressFields = () => {
    logradouroSpan.textContent = '-';
    bairroSpan.textContent = '-';
    cidadeSpan.textContent = '-';
    estadoSpan.textContent = '-';
    statusMessage.textContent = '';
    statusMessage.className = '';
};

/*
========================================
  FUNÇÃO PARA BUSCAR DADOS DO CEP (GET)
========================================
*/
const handleCepSearch = async (event) => {
    event.preventDefault();
    clearAddressFields();

    const cep = cepInput.value.trim();
    
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
        statusMessage.textContent = 'CEP inválido. Por favor, digite 8 números.';
        statusMessage.className = 'error';
        return;
    }

    try {
        statusMessage.textContent = 'Buscando...';
        
        const url = `${baseURL}/utils/cep/${cleanCep}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('CEP não encontrado ou erro na busca.');
        }

        const result = await response.json();
        const address = result.data;

        logradouroSpan.textContent = address.logradouro;
        bairroSpan.textContent = address.bairro;
        cidadeSpan.textContent = address.cidade;
        estadoSpan.textContent = address.estado;
        
        statusMessage.textContent = '';

    } catch (error) {
        console.error('Erro na busca do CEP:', error);
        statusMessage.textContent = error.message;
        statusMessage.className = 'error';
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
cepForm.addEventListener('submit', handleCepSearch);


/*
========================================
  BLOCO DE MÁSCARA DE CEP
========================================
*/
const formatCEP = (value) => {
    return value
        .replace(/\D/g, '')
        .substring(0, 8)
        .replace(/(\d{5})(\d)/, '$1-$2');
};

cepInput.addEventListener('input', (event) => {
    event.target.value = formatCEP(event.target.value);
});
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

const searchForm = document.getElementById('search-form');
const patientIdInput = document.getElementById('patient-id-input');
const searchResultViewer = document.getElementById('search-result');

/*
========================================
  FUNÇÃO PARA BUSCAR PACIENTE POR ID (READ ONE)
========================================
*/
const handleSearchPatientById = async (event) => {
    // Impede o recarregamento da página, que é o comportamento padrão do 'submit'.
    event.preventDefault();

    // Pega o valor digitado no campo de input e remove espaços em branco extras.
    const patientId = patientIdInput.value.trim();

    // Validação simples para garantir que o ID não está vazio.
    if (!patientId) {
        searchResultViewer.textContent = 'Por favor, digite um ID para buscar.';
        return;
    }

    // Bloco try...catch para tratar erros de forma elegante.
    try {
        searchResultViewer.textContent = `Buscando paciente com ID: ${patientId}...`;

        // Constrói a URL final usando o ID fornecido.
        const url = `${baseURL}/pacientes/${patientId}`;

        // Faz a requisição GET para a URL específica.
        const response = await fetch(url);

        // Verifica se a resposta da API foi um sucesso (ex: status 200).
        if (response.ok) {
            // Se foi sucesso, converte a resposta para JSON.
            const patientData = await response.json();
            // Exibe os dados do paciente formatados no visualizador.
            searchResultViewer.textContent = JSON.stringify(patientData, null, 2);
        } else {
            // Se a resposta NÃO foi 'ok' (ex: status 404 Not Found).
            // Lança um erro com uma mensagem específica para ser pego pelo 'catch'.
            throw new Error(`Paciente com ID ${patientId} não encontrado.`);
        }

    } catch (error) {
        // Captura qualquer erro que tenha ocorrido no bloco 'try'.
        console.error('Erro na busca:', error);
        // Exibe a mensagem de erro no visualizador para o usuário.
        searchResultViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
// Adiciona o "ouvinte" que chama a função 'handleSearchPatientById'
// sempre que o formulário for submetido.
searchForm.addEventListener('submit', handleSearchPatientById);
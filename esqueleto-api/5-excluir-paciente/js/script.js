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

const deleteForm = document.getElementById('delete-form');
const patientIdInput = document.getElementById('patient-id-input');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA EXCLUIR PACIENTE POR ID (DELETE)
========================================
*/
const handleDeletePatient = async (event) => {
    // Impede o comportamento padrão do formulário de recarregar a página.
    event.preventDefault();

    // Pega o valor do ID digitado pelo usuário.
    const patientId = patientIdInput.value.trim();

    if (!patientId) {
        apiResponseViewer.textContent = 'Por favor, digite um ID para excluir.';
        return;
    }

    // --- ETAPA DE CONFIRMAÇÃO ---
    // A função window.confirm mostra um pop-up e retorna true (OK) or false (Cancelar).
    const isConfirmed = window.confirm(
        `Tem certeza que deseja excluir o paciente com ID ${patientId}?\nEsta ação não pode ser desfeita.`
    );

    // Se o usuário clicou em "Cancelar", a função para aqui.
    if (!isConfirmed) {
        apiResponseViewer.textContent = 'Exclusão cancelada pelo usuário.';
        return;
    }
    
    // O código a partir daqui só executa se o usuário confirmar.
    try {
        apiResponseViewer.textContent = `Excluindo paciente com ID: ${patientId}...`;

        const response = await fetch(`${baseURL}/pacientes/${patientId}`, {
            method: 'DELETE' // O método que solicita a remoção do recurso.
        });

        // Verifica se a resposta foi bem-sucedida.
        if (response.ok) {
            // A API de mock retorna um JSON na exclusão, então vamos processá-lo.
            // Em outras APIs, a resposta poderia ser vazia (status 204).
            const result = await response.json();
            apiResponseViewer.innerHTML = `<span class="success">Paciente excluído com sucesso!</span>\n\n${JSON.stringify(result, null, 2)}`;
            deleteForm.reset(); // Limpa o formulário após o sucesso.
        } else {
            // Se o paciente não foi encontrado (404) ou outro erro ocorreu.
            throw new Error(`Não foi possível excluir. Paciente com ID ${patientId} não encontrado ou erro no servidor.`);
        }

    } catch (error) {
        // Captura e exibe qualquer erro que tenha ocorrido.
        console.error('Erro na exclusão:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
deleteForm.addEventListener('submit', handleDeletePatient);
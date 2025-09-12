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

const deletePhotoForm = document.getElementById('delete-photo-form');
const patientIdInput = document.getElementById('patient-id-input');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA REMOVER FOTO DO PACIENTE (DELETE)
========================================
*/
const handleDeletePhoto = async (event) => {
    // Impede o comportamento padrão do formulário, que é recarregar a página.
    event.preventDefault();

    const patientId = patientIdInput.value.trim();

    if (!patientId) {
        apiResponseViewer.textContent = 'Por favor, digite o ID do paciente.';
        return;
    }

    // Etapa de confirmação para evitar exclusão acidental.
    const isConfirmed = window.confirm(
        `Tem certeza que deseja remover a foto do paciente com ID ${patientId}?`
    );

    // Se o usuário clicar em "Cancelar", a função é interrompida.
    if (!isConfirmed) {
        apiResponseViewer.textContent = 'Remoção cancelada pelo usuário.';
        return;
    }
    
    // O código abaixo só é executado se o usuário confirmar.
    try {
        apiResponseViewer.textContent = `Removendo foto do paciente ID: ${patientId}...`;

        // A URL é específica para o recurso "foto" dentro do paciente "id".
        const url = `${baseURL}/pacientes/${patientId}/foto`;

        const response = await fetch(url, {
            method: 'DELETE' // Método para remover o recurso.
        });

        // Verifica se a resposta da API foi de sucesso.
        if (response.ok) {
            const result = await response.json();
            apiResponseViewer.innerHTML = `<span class="success">Foto removida com sucesso!</span>\n\n${JSON.stringify(result, null, 2)}`;
            deletePhotoForm.reset(); // Limpa o formulário.
        } else {
            // Caso o paciente ou a foto não existam (404), ou outro erro ocorra.
            const errorResult = await response.json();
            throw new Error(errorResult.message || `Erro ao remover a foto do paciente ${patientId}.`);
        }

    } catch (error) {
        console.error('Erro na remoção da foto:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
deletePhotoForm.addEventListener('submit', handleDeletePhoto);
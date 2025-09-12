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

const addAttachmentForm = document.getElementById('add-attachment-form');
const patientIdInput = document.getElementById('patient-id-input');
const attachmentInput = document.getElementById('attachment-input');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA ADICIONAR ANEXO (POST com FormData)
========================================
*/
const handleAddAttachment = async (event) => {
    event.preventDefault();

    const patientId = patientIdInput.value.trim();
    const attachmentFile = attachmentInput.files[0];

    if (!patientId || !attachmentFile) {
        alert('Por favor, preencha o ID do paciente e selecione um arquivo.');
        return;
    }

    // Cria o "envelope" FormData para o envio do arquivo.
    const formData = new FormData();

    // Adiciona o arquivo ao envelope com a chave 'anexo'.
    // A API deve estar esperando um campo com este nome.
    formData.append('anexo', attachmentFile);

    try {
        apiResponseViewer.textContent = 'Enviando anexo...';

        const url = `${baseURL}/pacientes/${patientId}/anexos`;

        const response = await fetch(url, {
            method: 'POST',
            body: formData, // Passa o envelope FormData diretamente no corpo.
            // Nenhum header 'Content-Type' é definido aqui! O navegador cuida disso.
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Falha ao adicionar o anexo.');
        }

        apiResponseViewer.textContent = `Anexo adicionado com sucesso!\n\n${JSON.stringify(result, null, 2)}`;
        addAttachmentForm.reset();

    } catch (error) {
        console.error('Erro ao adicionar anexo:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
addAttachmentForm.addEventListener('submit', handleAddAttachment);
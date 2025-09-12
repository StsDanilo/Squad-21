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

const removeAttachmentForm = document.getElementById('remove-attachment-form');
const patientIdInput = document.getElementById('patient-id-input');
const attachmentIdInput = document.getElementById('attachment-id-input');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA REMOVER ANEXO ESPECÍFICO (DELETE)
========================================
*/
const handleRemoveAttachment = async (event) => {
    event.preventDefault();

    // Coleta os dois IDs necessários dos campos de input.
    const patientId = patientIdInput.value.trim();
    const attachmentId = attachmentIdInput.value.trim();

    if (!patientId || !attachmentId) {
        apiResponseViewer.textContent = 'Por favor, preencha o ID do paciente e o ID do anexo.';
        return;
    }

    // Pede confirmação ao usuário, informando ambos os IDs para clareza.
    const isConfirmed = window.confirm(
        `Tem certeza que deseja remover o anexo com ID ${attachmentId} do paciente com ID ${patientId}?`
    );

    if (!isConfirmed) {
        apiResponseViewer.textContent = 'Remoção cancelada pelo usuário.';
        return;
    }
    
    try {
        apiResponseViewer.textContent = `Removendo anexo ${attachmentId}...`;

        // Constrói a URL com os dois parâmetros dinâmicos.
        const url = `${baseURL}/pacientes/${patientId}/anexos/${attachmentId}`;

        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.ok) {
            const result = await response.json();
            apiResponseViewer.innerHTML = `<span class="success">Anexo removido com sucesso!</span>\n\n${JSON.stringify(result, null, 2)}`;
            removeAttachmentForm.reset();
        } else {
            const errorResult = await response.json();
            throw new Error(errorResult.message || `Erro ao remover o anexo.`);
        }

    } catch (error) {
        console.error('Erro na remoção do anexo:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
removeAttachmentForm.addEventListener('submit', handleRemoveAttachment);
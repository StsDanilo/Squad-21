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

const listForm = document.getElementById('list-attachments-form');
const patientIdInput = document.getElementById('patient-id-input');
const attachmentsTbody = document.getElementById('attachments-tbody'); // Selecionamos o corpo da tabela

/*
========================================
  FUNÇÃO PARA LISTAR ANEXOS DO PACIENTE (GET Collection)
========================================
*/
const handleListAttachments = async (event) => {
    event.preventDefault();

    const patientId = patientIdInput.value.trim();

    if (!patientId) {
        alert('Por favor, digite o ID do paciente.');
        return;
    }

    try {
        // Limpa a tabela e mostra uma mensagem de carregamento.
        attachmentsTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Carregando anexos...</td></tr>';
        
        const url = `${baseURL}/pacientes/${patientId}/anexos`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Paciente com ID ${patientId} não encontrado ou erro no servidor.`);
        }

        const responseData = await response.json();
        const attachments = responseData.data; // A API de mock retorna os dados em um array 'data'.
        
        // Limpa a tabela novamente antes de adicionar os novos dados.
        attachmentsTbody.innerHTML = '';

        // Verifica se o array de anexos está vazio.
        if (!Array.isArray(attachments) || attachments.length === 0) {
            attachmentsTbody.innerHTML = '<tr class="empty-message"><td colspan="3">Nenhum anexo encontrado para este paciente.</td></tr>';
            return;
        }

        // Itera sobre cada anexo no array e cria uma linha na tabela para ele.
        attachments.forEach(anexo => {
            // Cria uma nova linha de tabela (tr) como uma string de HTML.
            const row = `
                <tr>
                    <td>${anexo.id}</td>
                    <td>${anexo.nome_arquivo}</td>
                    <td><a href="${anexo.url}" target="_blank">Link</a></td>
                </tr>
            `;
            // Adiciona a nova linha ao corpo da tabela.
            attachmentsTbody.innerHTML += row;
        });

    } catch (error) {
        console.error('Erro ao listar anexos:', error);
        attachmentsTbody.innerHTML = `<tr class="empty-message"><td colspan="3" style="color:red;">${error.message}</td></tr>`;
    }
};

/*
========================================
  CONECTANDO A FUNÇÃO AO EVENTO DO FORMULÁRIO
========================================
*/
listForm.addEventListener('submit', handleListAttachments);
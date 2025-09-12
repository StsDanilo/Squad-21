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

const uploadForm = document.getElementById('upload-form');
const patientIdInput = document.getElementById('patient-id-input');
const photoInput = document.getElementById('photo-input');
const uploadButton = document.getElementById('upload-button');
const imagePreview = document.getElementById('image-preview');
const previewText = document.getElementById('preview-text');
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  FUNÇÃO PARA PRÉ-VISUALIZAÇÃO DA IMAGEM
========================================
*/
const handleImagePreview = () => {
    // Pega o primeiro arquivo selecionado pelo usuário.
    const file = photoInput.files[0];

    if (file) {
        // Habilita o botão de upload somente se um arquivo foi selecionado.
        uploadButton.disabled = false;
        
        // Cria um objeto FileReader para ler o arquivo.
        const reader = new FileReader();

        // Define o que acontece quando o arquivo for lido com sucesso.
        reader.onload = (e) => {
            // Mostra a tag de imagem.
            imagePreview.style.display = 'block';
            // Define o 'src' da imagem como o resultado da leitura (uma URL de dados).
            imagePreview.src = e.target.result;
            // Esconde o texto de aviso.
            previewText.style.display = 'none';
        };

        // Inicia a leitura do arquivo. O resultado será uma URL de dados (base64).
        reader.readAsDataURL(file);
    } else {
        // Se nenhum arquivo for selecionado, desabilita o botão e reseta a pré-visualização.
        uploadButton.disabled = true;
        imagePreview.style.display = 'none';
        previewText.style.display = 'block';
    }
};


/*
========================================
  FUNÇÃO PARA FAZER O UPLOAD DO ARQUIVO (POST com FormData)
========================================
*/
const handleUpload = async (event) => {
    event.preventDefault();

    const patientId = patientIdInput.value.trim();
    const photoFile = photoInput.files[0];

    // Validação para garantir que todos os campos estão preenchidos.
    if (!patientId || !photoFile) {
        alert('Por favor, preencha o ID do paciente e selecione uma foto.');
        return;
    }

    // 1. Cria a "caixa" FormData.
    const formData = new FormData();

    // 2. Adiciona o arquivo à caixa com a chave 'foto' (que a API espera).
    // O segundo argumento é o objeto do arquivo em si.
    formData.append('foto', photoFile);

    try {
        apiResponseViewer.textContent = 'Enviando arquivo...';

        const url = `${baseURL}/pacientes/${patientId}/foto`;

        const response = await fetch(url, {
            method: 'POST',
            body: formData, // 3. Passa a caixa inteira no body.
            // 4. NÃO definimos o header 'Content-Type'. O navegador faz isso por nós.
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Falha no upload da foto.');
        }

        apiResponseViewer.textContent = `Upload concluído com sucesso!\n\n${JSON.stringify(result, null, 2)}`;
        uploadForm.reset();
        handleImagePreview(); // Reseta a pré-visualização

    } catch (error) {
        console.error('Erro no upload:', error);
        apiResponseViewer.innerHTML = `<span class="error">${error.message}</span>`;
    }
};

/*
========================================
  CONECTANDO AS FUNÇÕES AOS EVENTOS
========================================
*/
// Quando o usuário seleciona um arquivo, a função de preview é chamada.
photoInput.addEventListener('change', handleImagePreview);

// Quando o formulário é enviado, a função de upload é chamada.
uploadForm.addEventListener('submit', handleUpload);
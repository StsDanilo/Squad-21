/*
/*********************************************************************************\
* *
* Lógica Central da Single-Page Application (SPA) de Pacientes *
* *
\*********************************************************************************/
const baseURL = 'https://mock.apidog.com/m1/1053378-0-default';
const apiResponseViewer = document.getElementById('api-response');

/*
========================================
  1. LÓGICA DE NAVEGAÇÃO DA SPA
========================================
*/
const navButtons = document.querySelectorAll('.nav-button');
const pageSections = document.querySelectorAll('.page-section');

const handleNavigation = (event) => {
    const targetId = event.target.dataset.target;
    navButtons.forEach(btn => btn.classList.remove('active'));
    pageSections.forEach(sec => sec.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(targetId).classList.add('active');
    apiResponseViewer.textContent = '{ "message": "Aguardando ação..." }';
};

navButtons.forEach(button => button.addEventListener('click', handleNavigation));

/*
========================================
  2. BLOCO UNIVERSAL DE MÁSCARAS
========================================
*/
const formatCPF = (v) => v.toString().replace(/\D/g, '').substring(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
const formatPhone = (v) => v.toString().replace(/\D/g, '').substring(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
const formatName = (v) => v.replace(/[0-9]/g, '');
const formatCEP = (v) => v.replace(/\D/g, '').substring(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

const handleInputMask = (event) => {
    const { target } = event;
    const { mask } = target.dataset;
    if (mask === 'cpf') target.value = formatCPF(target.value);
    if (mask === 'phone') target.value = formatPhone(target.value);
    if (mask === 'name') target.value = formatName(target.value);
    if (mask === 'cep') target.value = formatCEP(target.value);
};

/*
========================================
  3. SELETORES DE ELEMENTOS DO DOM
========================================
*/
// --- CRUD ---
const crud_patientForm = document.getElementById('crud-patient-form');
const crud_patientIdInput = document.getElementById('crud-patient-id');
const crud_nomeInput = document.getElementById('crud-nome');
const crud_cpfInput = document.getElementById('crud-cpf');
const crud_dataNascimentoInput = document.getElementById('crud-data-nascimento');
const crud_sexoInput = document.getElementById('crud-sexo');
const crud_celularInput = document.getElementById('crud-celular');
const crud_patientListBody = document.getElementById('crud-patient-list');
const crud_clearFormBtn = document.getElementById('crud-clear-form-btn');
// --- Foto ---
const uploadPhoto_form = document.getElementById('upload-photo-form');
const uploadPhoto_idInput = document.getElementById('upload-photo-id');
const uploadPhoto_fileInput = document.getElementById('upload-photo-file');
const deletePhoto_form = document.getElementById('delete-photo-form');
const deletePhoto_idInput = document.getElementById('delete-photo-id');
// --- Anexos ---
const listAttachments_form = document.getElementById('list-attachments-form');
const listAttachments_idInput = document.getElementById('list-attach-id');
const listAttachments_tbody = document.getElementById('attachments-tbody');
const addAttachment_form = document.getElementById('add-attachment-form');
const addAttachment_patientIdInput = document.getElementById('add-attach-patient-id');
const addAttachment_fileInput = document.getElementById('add-attach-file');
const removeAttachment_form = document.getElementById('remove-attachment-form');
const removeAttachment_patientIdInput = document.getElementById('remove-attach-patient-id');
const removeAttachment_idInput = document.getElementById('remove-attach-id');
// --- Utilitários ---
const validateCpf_form = document.getElementById('cpf-validation-form');
const validateCpf_input = document.getElementById('validate-cpf-input');
const validateCpf_status = document.getElementById('cpf-validation-status');
const cep_form = document.getElementById('cep-form');
const cep_input = document.getElementById('cep-input');
const cep_logradouroSpan = document.getElementById('logradouro');
const cep_bairroSpan = document.getElementById('bairro');
const cep_cidadeSpan = document.getElementById('cidade');
const cep_estadoSpan = document.getElementById('estado');

/*
========================================
  4. FUNÇÕES DAS FUNCIONALIDADES DA API
========================================
*/

// --- CRUD ---
const fetchAndDisplayPatients = async () => {
    crud_patientListBody.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';
    try {
        const response = await fetch(`${baseURL}/pacientes`);
        const responseData = await response.json();
        apiResponseViewer.textContent = JSON.stringify(responseData, null, 2);
        crud_patientListBody.innerHTML = '';
        const patients = responseData.data;
        if (!Array.isArray(patients) || patients.length === 0) {
            crud_patientListBody.innerHTML = '<tr><td colspan="3">Nenhum paciente.</td></tr>';
            return;
        }
        patients.forEach(p => {
            const row = `<tr><td>${p.nome}</td><td>${formatCPF(p.cpf)}</td><td><button class="edit-btn" data-id="${p.id}">Editar</button><button class="delete-btn" data-id="${p.id}">Excluir</button></td></tr>`;
            crud_patientListBody.innerHTML += row;
        });
    } catch (error) { console.error('Erro ao buscar pacientes:', error); }
};
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const patientData = {
        nome: crud_nomeInput.value,
        cpf: crud_cpfInput.value.replace(/\D/g, ''),
        data_nascimento: crud_dataNascimentoInput.value,
        sexo: crud_sexoInput.value,
        contato: { celular: crud_celularInput.value.replace(/\D/g, '') }
    };
    const patientId = crud_patientIdInput.value;
    const isUpdating = !!patientId;
    const url = isUpdating ? `${baseURL}/pacientes/${patientId}` : `${baseURL}/pacientes`;
    const method = isUpdating ? 'PUT' : 'POST';
    try {
        const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patientData) });
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        if (!response.ok) throw new Error('Falha ao salvar paciente.');
        crud_patientForm.reset();
        crud_patientIdInput.value = '';
        fetchAndDisplayPatients();
    } catch (error) { alert(error.message); }
};
const handleEditPatient = async (id) => {
    try {
        const response = await fetch(`${baseURL}/pacientes/${id}`);
        const patient = (await response.json()).data;
        crud_patientIdInput.value = patient.id;
        crud_nomeInput.value = patient.nome;
        crud_cpfInput.value = formatCPF(patient.cpf);
        crud_dataNascimentoInput.value = patient.data_nascimento.split('T')[0];
        crud_sexoInput.value = patient.sexo;
        crud_celularInput.value = formatPhone(patient.contato.celular);
    } catch (error) { alert('Não foi possível carregar dados para edição.'); }
};
const handleDeletePatient = async (id) => {
    if (!confirm('Tem certeza?')) return;
    try {
        const response = await fetch(`${baseURL}/pacientes/${id}`, { method: 'DELETE' });
        apiResponseViewer.textContent = JSON.stringify(await response.json(), null, 2);
        fetchAndDisplayPatients();
    } catch (error) { alert('Não foi possível excluir.'); }
};

// --- FOTO ---
const handleUploadPhoto = async (event) => {
    event.preventDefault();
    const patientId = uploadPhoto_idInput.value;
    const photoFile = uploadPhoto_fileInput.files[0];
    if (!patientId || !photoFile) return alert('Preencha o ID e selecione a foto.');
    const formData = new FormData();
    formData.append('foto', photoFile);
    try {
        const response = await fetch(`${baseURL}/pacientes/${patientId}/foto`, { method: 'POST', body: formData });
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        if (!response.ok) throw new Error('Falha no upload.');
        uploadPhoto_form.reset();
    } catch (error) { alert(error.message); }
};
const handleDeletePhoto = async (event) => {
    event.preventDefault();
    const patientId = deletePhoto_idInput.value;
    if (!patientId || !confirm('Tem certeza?')) return;
    try {
        const response = await fetch(`${baseURL}/pacientes/${patientId}/foto`, { method: 'DELETE' });
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        if (!response.ok) throw new Error('Falha ao remover foto.');
        deletePhoto_form.reset();
    } catch (error) { alert(error.message); }
};

// --- ANEXOS ---
const handleListAttachments = async (event) => {
    event.preventDefault();
    const patientId = listAttachments_idInput.value;
    listAttachments_tbody.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';
    try {
        const response = await fetch(`${baseURL}/pacientes/${patientId}/anexos`);
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        const attachments = result.data;
        listAttachments_tbody.innerHTML = '';
        if (attachments.length === 0) {
            listAttachments_tbody.innerHTML = '<tr><td colspan="3">Nenhum anexo.</td></tr>';
            return;
        }
        attachments.forEach(anexo => {
            listAttachments_tbody.innerHTML += `<tr><td>${anexo.id}</td><td>${anexo.nome_arquivo}</td><td><a href="${anexo.url}" target="_blank">Link</a></td></tr>`;
        });
    } catch (error) { alert('Falha ao listar anexos.'); }
};
const handleAddAttachment = async (event) => {
    event.preventDefault();
    const patientId = addAttachment_patientIdInput.value;
    const file = addAttachment_fileInput.files[0];
    if (!patientId || !file) return alert('Preencha o ID e selecione o anexo.');
    const formData = new FormData();
    formData.append('anexo', file);
    try {
        const response = await fetch(`${baseURL}/pacientes/${patientId}/anexos`, { method: 'POST', body: formData });
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        if (!response.ok) throw new Error('Falha ao adicionar anexo.');
        addAttachment_form.reset();
    } catch (error) { alert(error.message); }
};
const handleRemoveAttachment = async (event) => {
    event.preventDefault();
    const patientId = removeAttachment_patientIdInput.value;
    const attachmentId = removeAttachment_idInput.value;
    if (!patientId || !attachmentId || !confirm('Tem certeza?')) return;
    try {
        const response = await fetch(`${baseURL}/pacientes/${patientId}/anexos/${attachmentId}`, { method: 'DELETE' });
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        if (!response.ok) throw new Error('Falha ao remover anexo.');
        removeAttachment_form.reset();
    } catch (error) { alert(error.message); }
};

// --- UTILITÁRIOS ---
const handleCpfValidation = async (event) => {
    event.preventDefault();
    const cleanCpf = validateCpf_input.value.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
        validateCpf_status.textContent = 'CPF deve ter 11 dígitos.';
        validateCpf_status.className = 'error';
        return;
    }
    try {
        validateCpf_status.textContent = 'Validando...';
        const response = await fetch(`${baseURL}/pacientes/validar-cpf`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cpf: cleanCpf }) });
        const result = await response.json();
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
        if (response.ok && result.data.status === 'valido') {
            validateCpf_status.textContent = 'CPF Válido!';
            validateCpf_status.className = 'success';
        } else {
            validateCpf_status.textContent = 'CPF Inválido!';
            validateCpf_status.className = 'error';
        }
    } catch (error) { validateCpf_status.textContent = 'Erro na API.'; }
};
const handleCepSearch = async (event) => {
    event.preventDefault();
    const cleanCep = cep_input.value.replace(/\D/g, '');
    if (cleanCep.length !== 8) return alert('CEP inválido.');
    try {
        const response = await fetch(`${baseURL}/utils/cep/${cleanCep}`);
        if (!response.ok) throw new Error('CEP não encontrado');
        const result = await response.json();
        const address = result.data;
        cep_logradouroSpan.textContent = address.logradouro;
        cep_bairroSpan.textContent = address.bairro;
        cep_cidadeSpan.textContent = address.cidade;
        cep_estadoSpan.textContent = address.estado;
        apiResponseViewer.textContent = JSON.stringify(result, null, 2);
    } catch (error) { alert(error.message); }
};

/*
========================================
  5. EVENT LISTENERS
========================================
*/
// --- CRUD ---
crud_patientForm.addEventListener('submit', handleFormSubmit);
crud_clearFormBtn.addEventListener('click', () => { crud_patientForm.reset(); crud_patientIdInput.value = ''; });
crud_patientListBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) handleEditPatient(event.target.dataset.id);
    if (event.target.classList.contains('delete-btn')) handleDeletePatient(event.target.dataset.id);
});
// --- Foto ---
uploadPhoto_form.addEventListener('submit', handleUploadPhoto);
deletePhoto_form.addEventListener('submit', handleDeletePhoto);
// --- Anexos ---
listAttachments_form.addEventListener('submit', handleListAttachments);
addAttachment_form.addEventListener('submit', handleAddAttachment);
removeAttachment_form.addEventListener('submit', handleRemoveAttachment);
// --- Utilitários ---
validateCpf_form.addEventListener('submit', handleCpfValidation);
cep_form.addEventListener('submit', handleCepSearch);
// --- Máscaras ---
document.querySelectorAll('input[data-mask]').forEach(input => input.addEventListener('input', handleInputMask));

/*
========================================
  6. INICIALIZAÇÃO
========================================
*/
// Carrega a lista de pacientes assim que a página é aberta.
document.addEventListener('DOMContentLoaded', fetchAndDisplayPatients);
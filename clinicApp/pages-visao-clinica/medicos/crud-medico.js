document.addEventListener('DOMContentLoaded', () => {
    const medicoForm = document.getElementById('medicoForm');
    const medicoIdInput = document.getElementById('medicoId');
    const nomeInput = document.getElementById('nome');
    const crmInput = document.getElementById('crm');
    const especialidadeInput = document.getElementById('especialidade');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const statusInput = document.getElementById('status');
    const cancelarBtn = document.getElementById('cancelarBtn');
    const medicosTabelaBody = document.getElementById('medicosTabelaBody');

    let medicos = JSON.parse(localStorage.getItem('medicos')) || [];

    const salvarMedicos = () => {
        localStorage.setItem('medicos', JSON.stringify(medicos));
    };

    const renderizarTabela = () => {
        medicosTabelaBody.innerHTML = '';

        if (medicos.length === 0) {
            medicosTabelaBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum médico cadastrado.</td></tr>';
            return;
        }

        medicos.forEach(medico => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${medico.nome}</td>
                <td>${medico.crm}</td>
                <td>${medico.especialidade}</td>
                <td>${medico.status}</td>
                <td>
                    <button class="btn-action btn-edit" data-crm="${medico.crm}">Editar</button>
                    <button class="btn-action btn-delete" data-crm="${medico.crm}">Excluir</button>
                </td>
            `;
            medicosTabelaBody.appendChild(tr);
        });
    };

    const resetarFormulario = () => {
        medicoForm.reset();
        medicoIdInput.value = '';
        crmInput.disabled = false;
        cancelarBtn.style.display = 'none';
    };

    medicoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = medicoIdInput.value;
        const medico = {
            nome: nomeInput.value.trim(),
            crm: crmInput.value.trim(),
            especialidade: especialidadeInput.value,
            telefone: telefoneInput.value.trim(),
            email: emailInput.value.trim(),
            status: statusInput.value,
        };

        if (id) {
            const index = medicos.findIndex(m => m.crm === id);
            if (index !== -1) {
                medicos[index] = medico;
            }
        } else {
            if (medicos.some(m => m.crm === medico.crm)) {
                alert('CRM já cadastrado!');
                return;
            }
            medicos.push(medico);
        }

        salvarMedicos();
        renderizarTabela();
        resetarFormulario();
    });

    medicosTabelaBody.addEventListener('click', (e) => {
        const target = e.target;
        const crm = target.getAttribute('data-crm');

        if (target.classList.contains('btn-edit')) {
            const medicoParaEditar = medicos.find(m => m.crm === crm);
            if (medicoParaEditar) {
                medicoIdInput.value = medicoParaEditar.crm;
                nomeInput.value = medicoParaEditar.nome;
                crmInput.value = medicoParaEditar.crm;
                crmInput.disabled = true;
                especialidadeInput.value = medicoParaEditar.especialidade;
                telefoneInput.value = medicoParaEditar.telefone;
                emailInput.value = medicoParaEditar.email;
                statusInput.value = medicoParaEditar.status;
                
                cancelarBtn.style.display = 'inline-block';
                window.scrollTo(0, 0);
            }
        }

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja excluir o médico com CRM ${crm}?`)) {
                medicos = medicos.filter(m => m.crm !== crm);
                salvarMedicos();
                renderizarTabela();
            }
        }
    });

    cancelarBtn.addEventListener('click', () => {
        resetarFormulario();
    });

    renderizarTabela();
});

// Seletores
// const form = document.getElementById('medicoForm');
// const tabelaBody = document.getElementById('medicosTabelaBody');
// const cancelarBtn = document.getElementById('cancelarBtn');
// const searchInput = document.querySelector('.search-input');

// let medicos = [];

// // Carrega dados do localStorage ao iniciar
// document.addEventListener('DOMContentLoaded', () => {
//   const stored = localStorage.getItem('medicos');
//   medicos = stored ? JSON.parse(stored) : [];
//   renderMedicos(medicos);
// });

// // Função para renderizar lista de médicos
// function renderMedicos(lista) {
//   tabelaBody.innerHTML = '';
//   lista.forEach(m => {
//     const tr = document.createElement('tr');
//     tr.innerHTML = `
//       <td>${m.nome}</td>
//       <td>${m.crm}</td>
//       <td>${m.especialidade}</td>
//       <td>${m.status}</td>
//       <td class="acoes">
//         <button onclick="editarMedico('${m.id}')">Editar</button>
//         <button onclick="excluirMedico('${m.id}')">Excluir</button>
//       </td>`;
//     tabelaBody.appendChild(tr);
//   });
// }

// // Salva no localStorage
// function salvarLocalStorage() {
//   localStorage.setItem('medicos', JSON.stringify(medicos));
// }

// // Trata submissão do formulário
// form.addEventListener('submit', e => {
//   e.preventDefault();
//   const idField = document.getElementById('medicoId');
//   const nome = document.getElementById('nome').value.trim();
//   const crm = document.getElementById('crm').value.trim();
//   const especialidade = document.getElementById('especialidade').value;
//   const telefone = document.getElementById('telefone').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const status = document.getElementById('status').value;

//   // Validação mínima
//   if (!nome || !crm || !especialidade) return;

//   if (idField.value) {
//     // Edição
//     const idx = medicos.findIndex(m => m.id === idField.value);
//     medicos[idx] = { id: idField.value, nome, crm, especialidade, telefone, email, status };
//   } else {
//     // Criação
//     const novoMedico = {
//       id: Date.now().toString(),
//       nome, crm, especialidade, telefone, email, status
//     };
//     medicos.push(novoMedico);
//   }

//   salvarLocalStorage();
//   renderMedicos(medicos);
//   form.reset();
//   idField.value = '';
//   cancelarBtn.style.display = 'none';
// });

// // Função para iniciar edição
// window.editarMedico = function(id) {
//   const m = medicos.find(m => m.id === id);
//   document.getElementById('medicoId').value = m.id;
//   document.getElementById('nome').value = m.nome;
//   document.getElementById('crm').value = m.crm;
//   document.getElementById('especialidade').value = m.especialidade;
//   document.getElementById('telefone').value = m.telefone;
//   document.getElementById('email').value = m.email;
//   document.getElementById('status').value = m.status;
//   cancelarBtn.style.display = 'inline-block';
// };

// // Função para excluir médico
// window.excluirMedico = function(id) {
//   if (!confirm('Tem certeza que deseja excluir este médico?')) return;
//   medicos = medicos.filter(m => m.id !== id);
//   salvarLocalStorage();
//   renderMedicos(medicos);
// };

// // Cancelar edição
// cancelarBtn.addEventListener('click', () => {
//   form.reset();
//   document.getElementById('medicoId').value = '';
//   cancelarBtn.style.display = 'none';
// });

// // Filtro de busca
// searchInput.addEventListener('input', () => {
//   const termo = searchInput.value.toLowerCase();
//   const filtrados = medicos.filter(m =>
//     m.nome.toLowerCase().includes(termo) ||
//     m.crm.toLowerCase().includes(termo)
//   );
//   renderMedicos(filtrados);
// });
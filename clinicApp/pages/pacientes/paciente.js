const form = document.getElementById("formLaudo");
const tbody = document.querySelector("#laudoTable tbody");
const button = document.querySelectorAll(".button");

// Função para adicionar linha
function adicionarLinhaNaTabela(item) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.telefone}</td>
    <td>${item.cidade}</td>
    <td>${item.estado}</td>
    <td>${item.ultimoAtend}</td>
    <td>${item.proximoAtend}</td>
    <td><button>...</button></td>
  `;
    tbody.appendChild(tr);
}

// Carregar dados salvos
function carregarDadosSalvos() {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];
    dados.forEach(adicionarLinhaNaTabela);
}

// Salvar novo item
function salvarItem(item) {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];
    dados.push(item);
    localStorage.setItem("pacientes", JSON.stringify(dados));
}

// Evento de envio do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const item = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        ultimoAtend: document.getElementById("ultimoAtend").value,
        proximoAtend: document.getElementById("proximoAtend").value,
        acao: "...",
    };

    adicionarLinhaNaTabela(item);
    salvarItem(item);
    form.reset();
});

// Carregar ao abrir
window.addEventListener("DOMContentLoaded", carregarDadosSalvos);

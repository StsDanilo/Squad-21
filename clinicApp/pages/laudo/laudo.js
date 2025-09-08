const form = document.getElementById("formLaudo");
const tbody = document.querySelector("#laudoTable tbody");
const button = document.querySelectorAll(".button");

// Função para adicionar linha
function adicionarLinhaNaTabela(item) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${item.pedido}</td>
    <td>${item.data}</td>
    <td>${item.prazo}</td>
    <td>${item.paciente}</td>
    <td>${item.solicitante}</td>
    <td>${item.classificacao}</td>
    <td><button>...</button></td>
  `;
    tbody.appendChild(tr);
}

// Carregar dados salvos
function carregarDadosSalvos() {
    const dados = JSON.parse(localStorage.getItem("laudos")) || [];
    dados.forEach(adicionarLinhaNaTabela);
}

// Salvar novo item
function salvarItem(item) {
    const dados = JSON.parse(localStorage.getItem("laudos")) || [];
    dados.push(item);
    localStorage.setItem("laudos", JSON.stringify(dados));
}

// Evento de envio do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const item = {
        pedido: document.getElementById("pedido").value,
        data: document.getElementById("data").value,
        prazo: document.getElementById("prazo").value,
        paciente: document.getElementById("paciente").value,
        solicitante: document.getElementById("solicitante").value,
        classificacao: document.getElementById("classificacao").value,
        acao: "...",
    };

    adicionarLinhaNaTabela(item);
    salvarItem(item);
    form.reset();
});

// Carregar ao abrir
window.addEventListener("DOMContentLoaded", carregarDadosSalvos);

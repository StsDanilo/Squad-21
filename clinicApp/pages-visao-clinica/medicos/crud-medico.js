
// document.addEventListener("DOMContentLoaded", () => {

//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer <token>");

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     };

//     fetch("https://mock.apidog.com/m1/1053378-0-default/pacientes", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));

//     const tabelaMedicos = document.getElementById("medicos-tabela");
//     const searchInput = document.getElementById("search-input");
//     const filterType = document.getElementById("filter-type");
//     const searchButton = document.getElementById("search-button");

//     let medicos = JSON.parse(localStorage.getItem("medicos")) || [];

//     const atualizarLista = (filtro = "", tipo = "geral") => {
//         if (!tabelaMedicos) return;
//         const tbody = tabelaMedicos.querySelector("tbody");
//         tbody.innerHTML = "";

//         medicos.filter((medico) => {
//             if (!filtro) return true;
//             const termo = filtro.toLowerCase();
//             if (tipo === "geral") {
//                 return (medico.nome || "").toLowerCase().includes(termo) || (medico.celular || "").toLowerCase().includes(termo) || (medico.cidade || "").toLowerCase().includes(termo) || (medico.estado || "").toLowerCase().includes(termo) || (medico.cpf || "").toLowerCase().includes(termo);
//             } else {
//                 const valorCampo = (medico[tipo] || "").toString().toLowerCase();
//                 return valorCampo.includes(termo);
//             }
//         })
//             .forEach((medico, index) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td data-label="Nome">${medico.nome}</td>
//                     <td data-label="Telefone ou Celular">${medico.celular || "-"}</td>
//                     <td data-label="Cidade">${medico.cidade || "-"}</td>
//                     <td data-label="CPF">${medico.cpf || "-"}</td>
//                     <td data-label="Ações">
//                         <button class="btn btn-edit" data-id="${medico.id}">Editar</button>
//                         <button class="btn btn-delete" data-index="${index}">Excluir</button>
//                         <button class="btn btn-detail" data-id="${medico.id}">Detalhes</button>
//                     </td>
//                 `;
//                 tbody.appendChild(row);
//             });

//         // Botões Editar
//         document.querySelectorAll(".btn-edit").forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 const id = e.target.dataset.id;
//                 window.location.href = `addMedico/addMedico.html?id=${id}`;
//             });
//         });

//         // Botões Excluir
//         document.querySelectorAll(".btn-delete").forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 const index = e.target.dataset.index;
//                 if (confirm("Tem certeza que deseja excluir este médico?")) {
//                     medicos.splice(index, 1);
//                     localStorage.setItem("medicos", JSON.stringify(medicos));
//                     atualizarLista();
//                 }
//             });
//         });

//         document.querySelectorAll(".btn-detail").forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 const id = e.target.dataset.id;
//                 window.location.href = `addMedico/addMedico.html?mode=detalhes&id=${id}`;
//             });
//         });
//     };

//     // Clique no botão de busca
//     if (searchButton) {
//         searchButton.addEventListener("click", () => {
//             atualizarLista(searchInput.value, filterType.value);
//         });
//     }

//     // Enter no campo de busca
//     if (searchInput) {
//         searchInput.addEventListener("keyup", (e) => {
//             if (e.key === "Enter") {
//                 atualizarLista(searchInput.value, filterType.value);
//             }
//         });
//     }

//     atualizarLista();
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const tabelaPacientes = document.getElementById("pacientes-tabela");
//     const searchInput = document.getElementById("search-input");
//     const filterType = document.getElementById("filter-type");
//     const searchButton = document.getElementById("search-button");

//     let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];


//     const atualizarLista = (filtro = "", tipo = "geral") => {
//         if (!tabelaPacientes) return;
//         const tbody = tabelaPacientes.querySelector("tbody");
//         tbody.innerHTML = "";

//         pacientes
//             .filter((paciente) => {
//                 if (!filtro) return true;

//                 const termo = filtro.toLowerCase();

//                 if (tipo === "geral") {
//                     // Busca em todos os campos
//                     return (paciente.nome || "").toLowerCase().includes(termo) || (paciente.celular || "").toLowerCase().includes(termo) || (paciente.cidade || "").toLowerCase().includes(termo) || (paciente.estado || "").toLowerCase().includes(termo) || (paciente.convenio || "").toLowerCase().includes(termo) || (paciente.cpf || "").toLowerCase().includes(termo);
//                 } else {
//                     // Busca apenas no campo escolhido
//                     const valorCampo = (paciente[tipo] || "").toString().toLowerCase();
//                     return valorCampo.includes(termo);
//                 }
//             })
//             .forEach((paciente, index) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td data-label="Nome">${paciente.nome}</td>
//                     <td data-label="Telefone ou Celular">${paciente.celular || "-"}</td>
//                     <td data-label="Cidade">${paciente.cidade || "-"}</td>
//                     <td data-label="Estado">${paciente.estado || "-"}</td>
//                     <td data-label="Ações">
//                         <button class="btn btn-edit" data-id="${paciente.id}">Editar</button>
//                         <button class="btn btn-delete" data-index="${index}">Excluir</button>
//                         <button class="btn btn-detail" data-id="${paciente.id}">Detalhes</button>
//                     </td>
//                 `;
//                 tbody.appendChild(row);
//             });

//         // Botões Editar
//         document.querySelectorAll(".btn-edit").forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 const id = e.target.dataset.id;
//                 window.location.href = `addPaciente/addPacient.html?id=${id}`;
//             });
//         });

//         // Botões Excluir
//         document.querySelectorAll(".btn-delete").forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 const index = e.target.dataset.index;
//                 if (confirm("Tem certeza que deseja excluir este paciente?")) {
//                     pacientes.splice(index, 1);
//                     localStorage.setItem("pacientes", JSON.stringify(pacientes));
//                     atualizarLista();
//                 }
//             });
//         });

//         document.querySelectorAll(".btn-detail").forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 const id = e.target.dataset.id;
//                 window.location.href = `addPaciente/addPacient.html?mode=detalhes&id=${id}`;
//             });
//         });
//     };

//     // Clique no botão de busca
//     searchButton.addEventListener("click", () => {
//         atualizarLista(searchInput.value, filterType.value);
//     });

//     // Enter no campo de busca
//     searchInput.addEventListener("keyup", (e) => {
//         if (e.key === "Enter") {
//             atualizarLista(searchInput.value, filterType.value);
//         }
//     });

//     atualizarLista();
// });

document.addEventListener("DOMContentLoaded", () => {
  const tabelaMedicos = document.getElementById("medicos-tabela");
  const searchInput = document.getElementById("search-input");
  const filterType = document.getElementById("filter-type");
  const searchButton = document.getElementById("search-button");

  let medicos = [];
  let medicosFiltrados = [];
  let itensPorLote = 10;
  let indiceAtual = 0;

  // 🔄 Renderiza um lote de médicos
  const renderizarLote = () => {
    const tbody = tabelaMedicos.querySelector("tbody");
    const fim = indiceAtual + itensPorLote;
    const lote = medicosFiltrados.slice(indiceAtual, fim);

    lote.forEach((medico, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="Nome">${medico.nome}</td>
        <td data-label="Telefone ou Celular">${medico.celular || "-"}</td>
        <td data-label="Cidade">${medico.cidade || "-"}</td>
        <td data-label="CPF">${medico.cpf || "-"}</td>
        <td data-label="Ações">
          <button class="btn btn-edit" data-id="${medico.id}">Editar</button>
          <button class="btn btn-detail" data-id="${medico.id}">Detalhes</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    indiceAtual += itensPorLote;
    adicionarEventos();
  };

  // 🔍 Aplica filtro de busca
  const aplicarFiltro = () => {
    const termo = searchInput.value.toLowerCase();
    const tipo = filterType.value;

    medicosFiltrados = medicos.filter((medico) => {
      if (!termo) return true;
      if (tipo === "geral") {
        return (
          (medico.nome || "").toLowerCase().includes(termo) ||
          (medico.celular || "").toLowerCase().includes(termo) ||
          (medico.cidade || "").toLowerCase().includes(termo) ||
          (medico.estado || "").toLowerCase().includes(termo) ||
          (medico.cpf || "").toLowerCase().includes(termo)
        );
      } else {
        return (medico[tipo] || "").toLowerCase().includes(termo);
      }
    });

    indiceAtual = 0;
    tabelaMedicos.querySelector("tbody").innerHTML = "";
    renderizarLote();
  };

  // 🎯 Adiciona eventos aos botões
  const adicionarEventos = () => {
    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        window.location.href = `addMedico/addMedico.html?id=${id}`;
      });
    });

    document.querySelectorAll(".btn-detail").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        window.location.href = `addMedico/addMedico.html?mode=detalhes&id=${id}`;
      });
    });
  };

  // 📦 Carrega médicos da API
  const carregarMedicosDaAPI = async () => {
    try {
      const response = await fetch("https://mock.apidog.com/m1/1053378-0-default/pacientes", {
        method: "GET",
        headers: {
          Authorization: "Bearer myHeaders" // substitua <token> pelo seu token real
        }
      });

      const data = await response.json();
      medicos = Array.isArray(data) ? data : [];
      aplicarFiltro();
    } catch (error) {
      console.error("Erro ao carregar médicos da API:", error);
    }
  };

  // 🔁 Scroll infinito
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      renderizarLote();
    }
  });

  // 🔎 Eventos de busca
  searchButton.addEventListener("click", aplicarFiltro);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") aplicarFiltro();
  });

  // 🚀 Inicialização
  carregarMedicosDaAPI();
});
// Função para buscar as ONGs com base nos critérios de filtro
function filterOngs() {
  const name = document.getElementById("searchByName").value.toLowerCase();
  const location = document.getElementById("searchByLocation").value.toLowerCase();
  const donation = document.getElementById("searchByDonation").value.toLowerCase();
  const category = document.getElementById("searchByCategory").value.toLowerCase();

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const filteredOngs = data.ongs.filter(ong => {
        const fullLocation = `${ong.location.street}, ${ong.location.neighborhood}, ${ong.location.city}`.toLowerCase();
        return ong.name.toLowerCase().includes(name) &&
               fullLocation.includes(location) &&
               ong.donations.some(d => d.toLowerCase().includes(donation)) &&
               (category === "" || ong.category.toLowerCase().includes(category));
      });
      displayOngs(filteredOngs);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Função para exibir as ONGs na tabela
function displayOngs(ongs) {
  const tableBody = document.getElementById("ongTableBody");
  tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

  ongs.forEach(ong => {
    const row = `
      <tr>
        <td><img src="${ong.logo}" alt="${ong.name} Logo" style="max-width: 100px;"></td>
        <td><a href="${ong.url}" target="_blank">${ong.name}</a></td>
        <td><a href="${ong.location.mapUrl}" target="_blank">${ong.location.city}</a></td>
        <td>${ong.category}</td>
        <td>${ong.donations.join(', ')}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Função para inicializar os eventos após o DOM estar carregado
function init() {
  document.getElementById("searchByName").addEventListener("input", filterOngs);
  document.getElementById("searchByLocation").addEventListener("input", filterOngs);
  document.getElementById("searchByDonation").addEventListener("input", filterOngs);
  document.getElementById("searchByCategory").addEventListener("change", filterOngs);
  
  // Adiciona o evento de clique para mostrar/esconder os filtros
  document.getElementById("filterToggle").addEventListener("click", function() {
    const filterContainer = document.getElementById("filterContainer");
    filterContainer.style.display = filterContainer.style.display === "none" ? "block" : "none";
  });

  filterOngs();
}

// Espera o DOM ser completamente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", init);

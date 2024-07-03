// Função para buscar as ONGs com base nos critérios de filtro
function filterOngs() {
  const name = document.getElementById("searchByName").value.toLowerCase();
  const location = document.getElementById("searchByLocation").value.toLowerCase();
  const donation = document.getElementById("searchByDonation").value.toLowerCase();
  const category = document.getElementById("searchByCategory").value.toLowerCase();

  // Recupera as ONGs do localStorage
  let ongs = JSON.parse(localStorage.getItem('ongs')) || [];

  // Filtra as ONGs com base nos critérios
  const filteredOngs = ongs.filter(ong => {
      const fullLocation = `${ong.location.street}, ${ong.location.neighborhood}, ${ong.location.city}`.toLowerCase();
      return ong.name.toLowerCase().includes(name) &&
             fullLocation.includes(location) &&
             ong.donations.some(d => d.toLowerCase().includes(donation)) &&
             (category === "" || ong.category.toLowerCase().includes(category));
  });

  displayOngs(filteredOngs);
}

// Função para exibir as ONGs na tabela
function displayOngs(ongs) {
  const tableBody = document.getElementById("ongTableBody");
  tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

  ongs.forEach((ong, index) => {
      const row = `
          <tr>
              <td><img src="${ong.logo}" alt="${ong.name} Logo" style="max-width: 100px;"></td>
              <td><a href="${ong.url}" target="_blank">${ong.name}</a></td>
              <td><a href="${ong.location.mapUrl}" target="_blank">${ong.location.city}</a></td>
              <td>${ong.category}</td>
              <td>${ong.donations.join(', ')}</td>
              <td><button onclick="deleteOng(${index})">Excluir</button></td>
          </tr>
      `;
      tableBody.innerHTML += row;
  });
}

// Função para excluir uma ONG
function deleteOng(index) {
  // Recupera as ONGs do localStorage
  let ongs = JSON.parse(localStorage.getItem('ongs')) || [];

  // Remove a ONG do array com base no índice
  ongs.splice(index, 1);

  // Atualiza o localStorage com o novo array de ONGs
  localStorage.setItem('ongs', JSON.stringify(ongs));

  // Atualiza a exibição das ONGs na tabela
  filterOngs();
}

// Função para inicializar os eventos após o DOM estar carregado
function init() {
  // Verifica se há dados capturados no localStorage
  const formData = JSON.parse(localStorage.getItem('formData'));

  if (formData) {
      // Transforma os dados capturados em um objeto que representa uma ONG
      const newOng = {
          name: formData.name,
          category: formData.category,
          logo: formData.logoFile, // Aqui você precisa lidar com o arquivo de logo capturado
          location: {
              city: formData.city,
              neighborhood: formData.neighborhood,
              street: formData.street,
              mapUrl: formData.mapUrl
          },
          time: formData.time,
          donations: formData.donations.split(','), // Transforma a string de doações em um array
          pix: formData.pix,
          caixaPostal: formData.caixaPostal,
          contact: formData.contact,
          whatsapp: formData.whatsapp,
          email: formData.email,
          instagram: formData.instagram,
          description: formData.description
      };

      // Adiciona a nova ONG capturada aos dados existentes no localStorage
      let ongs = JSON.parse(localStorage.getItem('ongs')) || [];
      ongs.push(newOng);
      localStorage.setItem('ongs', JSON.stringify(ongs));
  }

  // Adiciona eventos de input e change para os campos de filtro
  document.getElementById("searchByName").addEventListener("input", filterOngs);
  document.getElementById("searchByLocation").addEventListener("input", filterOngs);
  document.getElementById("searchByDonation").addEventListener("input", filterOngs);
  document.getElementById("searchByCategory").addEventListener("change", filterOngs);

  // Inicializa a exibição inicial das ONGs
  filterOngs();

  // Adiciona o evento de clique para mostrar/esconder os filtros
  document.getElementById("filterToggle").addEventListener("click", function() {
      const filterContainer = document.getElementById("filterContainer");
      filterContainer.style.display = filterContainer.style.display === "none" ? "block" : "none";
  });
}

// Espera o DOM ser completamente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", init);

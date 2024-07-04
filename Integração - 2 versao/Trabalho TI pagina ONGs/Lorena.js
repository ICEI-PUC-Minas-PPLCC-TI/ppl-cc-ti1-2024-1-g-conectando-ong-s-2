const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function leDados() {
  let strDados = localStorage.getItem('ongs');
  let ongs = [];

  if (strDados) {
    ongs = JSON.parse(strDados);
  }

  return ongs;
}

function imprimeDados() {
  const logoDaOng = document.querySelector(".Logo img");
  const nomeDaOng = document.querySelector(".sobre h1");
  const descricaoDaOng = document.querySelector(".sobre p");
  const localizacaoDaOng = document.querySelector(".L li");
  const horarioOng = document.querySelector(".H li");
  const telefoneDaOng = document.querySelector(".telefone");
  const whatsappDaOng = document.querySelector(".whatsapp");
  const instaDaOng = document.querySelector(".insta");
  const emailDaOng = document.querySelector(".email");
  const oqDoar = document.querySelector(".doacoes ul");

  const ongs = leDados();
  const ong = ongs.find(item => item.id == id);

  if (ong) {
    nomeDaOng.textContent = ong.name;
    descricaoDaOng.textContent = ong.description;
    logoDaOng.setAttribute("src", ong.logo);
    localizacaoDaOng.textContent = `Localização: ${ong.location.street}, ${ong.location.neighborhood}, ${ong.location.city}`;
    horarioOng.textContent = `Horário de Funcionamento: ${ong.time}`;
    telefoneDaOng.textContent = ong.contact;
    whatsappDaOng.href = ong.whatsapp;
    instaDaOng.href = ong.instagram;
    emailDaOng.href = ong.email;
    oqDoar.innerHTML = "";
    ong.donations.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = item;
      oqDoar.appendChild(li);
    });
  } else {
    alert('ONG não encontrada.');
  }
}

// Carregar dados da ONG ao carregar a página
window.addEventListener('load', () => {
  imprimeDados();
});


// Funções de comentários - mantidas como estão

// Adiciona evento de carregamento da página para exibir os dados da ONG
window.addEventListener('load', () => {
    imprimeDados();
    imprimeComentarios(); // Supondo que esta função já exista e funcione corretamente
});

// Adiciona evento de envio do formulário de comentários - mantido como está
document.getElementById('comentarioForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const comentario = document.getElementById('comentario').value;

    if (email && comentario) {
        // Verificar se o email está cadastrado - mantido como está
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Funções de comentários
function salvaComentarios(comentarios) {
    let allComments = leTodosComentarios();
    allComments[id] = comentarios;
    localStorage.setItem('comentarios', JSON.stringify(allComments));
}

function leTodosComentarios() {
    let strComentarios = localStorage.getItem('comentarios');
    let objComentarios = {};
    if (strComentarios) {
        objComentarios = JSON.parse(strComentarios);
    }
    return objComentarios;
}

function leComentarios() {
    let allComments = leTodosComentarios();
    return allComments[id] || [];
}

function adicionaComentario(email, comentario) {
    const comentarios = leComentarios();
    comentarios.push({ email, comentario, id: Date.now() });
    salvaComentarios(comentarios);
}

function apagaComentario(comentarioId) {
    let comentarios = leComentarios();
    comentarios = comentarios.filter(comentario => comentario.id !== comentarioId);
    salvaComentarios(comentarios);
    imprimeComentarios();
}

function imprimeComentarios() {
    const listaComentarios = document.getElementById('listaComentarios');
    listaComentarios.innerHTML = '';
    const comentarios = leComentarios();
    const currentUserEmail = localStorage.getItem('currentUserEmail');

    comentarios.forEach(({ email, comentario, id }) => {
        const novoComentario = document.createElement('li');
        novoComentario.classList.add('list-group-item');
        
        if (email === currentUserEmail) {
            novoComentario.innerHTML = `<strong>${email}:</strong> ${comentario}<span class="btn-apagar" onclick="apagaComentario(${id})"> Apagar</span>`;
        } else {
            novoComentario.innerHTML = `<strong>${email}:</strong> ${comentario}`;
        }
        
        listaComentarios.appendChild(novoComentario);
    });
}

// Adiciona evento de carregamento da página para exibir os dados da ONG
window.addEventListener('load', () => {
    imprimeDados();
    imprimeComentarios();
});

// Adiciona evento de envio do formulário de comentários
document.getElementById('comentarioForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const comentario = document.getElementById('comentario').value;

    if (email && comentario) {
        // Verificar se o email está cadastrado
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            adicionaComentario(email, comentario);
            imprimeComentarios();
            
            // Limpar os campos do formulário
            document.getElementById('email').value = '';
            document.getElementById('comentario').value = '';
        } else {
            alert('Email não cadastrado. Por favor, cadastre-se ou insira um email válido.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

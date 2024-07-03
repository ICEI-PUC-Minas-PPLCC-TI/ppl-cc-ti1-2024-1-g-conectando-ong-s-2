const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// Função para carregar dados do arquivo JSON
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        return { ONGS: [] }; // Retorna um objeto vazio se houver erro
    }
}

// Função para ler os dados das ONGs
async function leDados() {
    try {
        const data = await loadJSON('data.json'); // Certifique-se de que o caminho está correto
        return data;
    } catch (error) {
        console.error("Erro ao ler dados das ONGs:", error);
        return { ONGS: [] }; // Retorna um objeto vazio se houver erro
    }
}

// Função para imprimir dados da ONG na página
async function imprimeDados() {
    const logoDaOng = document.querySelector(".Logo img");
    const nomeDaOng = document.querySelector(".sobre h1");
    const descricaoDaOng = document.querySelector(".sobre p");
    const localizaçãoDaOng = document.querySelector(".L li");
    const horarioOng = document.querySelector(".H li");
    const telefoneDaOng = document.querySelector(".telefone");
    const whatsappDaOng = document.querySelector(".whatsapp");
    const instaDaOng = document.querySelector(".insta");
    const emailDaOng = document.querySelector(".email");
    const oqDoar = document.querySelector(".doacoes ul");

    let objDados = await leDados();
    const ong = objDados.ONGS.find(ong => ong.id === id);

    if (ong) {
        nomeDaOng.textContent = ong.name;
        descricaoDaOng.textContent = ong.description;
        logoDaOng.setAttribute("src", ong.logo);
        horarioOng.innerHTML += ong.time;
        localizaçãoDaOng.textContent = `${ong.location.street}, ${ong.location.neighborhood}, ${ong.location.city}`;
        telefoneDaOng.textContent = ong.contact.phone;
        whatsappDaOng.setAttribute("href", ong.contact.whatsapp);
        instaDaOng.setAttribute("href", ong.contact.instagram);
        emailDaOng.setAttribute("href", ong.contact.email);
        ong.donations.forEach(item => { oqDoar.innerHTML += `<li><p>${item}</p></li>` 
        });
    } else {
        console.error(`ONG com ID ${id} não encontrada`);
    }
}

// Funções para gerenciar comentários
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

// Evento de carregamento da página
window.addEventListener('load', async () => {
    await imprimeDados(); // Carrega e imprime os dados da ONG
    imprimeComentarios(); // Carrega e imprime os comentários
});

// Evento de envio do formulário de comentários
document.getElementById('comentarioForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const comentario = document.getElementById('comentario').value;

    if (email && comentario) {
        // Verifica se o email está cadastrado (simulação)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            adicionaComentario(email, comentario);
            imprimeComentarios();
            
            // Limpa os campos do formulário
            document.getElementById('email').value = '';
            document.getElementById('comentario').value = '';
        } else {
            alert('Email não cadastrado. Por favor, cadastre-se ou insira um email válido.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

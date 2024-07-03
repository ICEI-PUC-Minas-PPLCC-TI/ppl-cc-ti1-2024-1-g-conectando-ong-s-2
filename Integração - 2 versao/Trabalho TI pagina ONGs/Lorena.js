const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            "ONGS": [
                {
                    "id": 1,
                    "nome": "Ame um Animal",
                    "sobre": "Nossa ONG tem como objetivo ajudar animais em situação de rua",
                    "logo": "ong2.jpeg",
                    "localização": "Rua das Flores, 123, Belo Horizonte, MG",
                    "horário": "Segundas a sextas das 8h às 18h",
                    "contato": {
                        "telefone": "(31) 98457-7640",
                        "whatsapp": "https://wa.me/553184577640",
                        "instagram": "@ame_um_animal_ONG",
                        "email": "email@provedor.com.br"
                    },
                    "o_que_doar": ["Ração", "Cobertores", "Brinquedos"],
                    "outras_formas_de_doar": "#"
                },
                {
                    "id": 2,
                    "nome": "ONG Doação Amiga",
                    "sobre": "A ONG Doação Amiga tem como objetivo dar apoio a pessoas em situação de rua.",
                    "logo": "ong1.jpeg",
                    "localização": "Avenida dos Amigos, 456, São Paulo, SP",
                    "horário": "Segundas a sextas das 9h às 17h",
                    "contato": {
                        "telefone": "(11) 98765-4321",
                        "whatsapp": "https://wa.me/5511987654321",
                        "instagram": "@Doação_Amiga",
                        "email": "contato@doacaoamiga.com.br"
                    },
                    "o_que_doar": ["Roupas", "Alimentos não perecíveis", "Produtos de higiene"],
                    "outras_formas_de_doar": "#"
                },
                {
                    "id": 3,
                    "nome": "Amigos dos Animais",
                    "sobre": "Amigos dos Animais é dedicada ao resgate, tratamento e adoção de animais abandonados, garantindo um lar amoroso e seguro para cada um deles.",
                    "logo": "ong3.jpeg",
                    "localização": "Rua dos Amigos, 789, Rio de Janeiro, RJ",
                    "horário": "Segundas a sextas das 10h às 19h",
                    "contato": {
                        "telefone": "(21) 91234-5678",
                        "whatsapp": "https://wa.me/5521912345678",
                        "instagram": "@amigos_dos_animais_ong",
                        "email": "contato@amigosdosanimais.org.br"
                    },
                    "o_que_doar": ["Alimentos enlatados para pets", "Caminhas", "Produtos de limpeza"],
                    "outras_formas_de_doar": "#"
                }
            ]
        }
    }
    return objDados;
}

function imprimeDados() {
    const logoDaOng = document.querySelector(".Logo img");
    const nomeDaOng = document.querySelector(".sobre h1");
    const descricaoDaOng = document.querySelector(".sobre p");
    const localizaçãoDaOng = document.querySelector(".L li");
    const horarioOng = document.querySelector(".H li ");
    const telefoneDaOng = document.querySelector(".telefone");
    const whatsappDaOng = document.querySelector(".whatsapp");
    const instaDaOng = document.querySelector(".insta");
    const emailDaOng = document.querySelector(".email");
    const oqDoar = document.querySelector(".doacoes ul");

    let objDados = leDados();
    const ong = objDados.ONGS.find(ong => ong.id == id);

    nomeDaOng.textContent = ong.nome;
    descricaoDaOng.textContent = ong.sobre;
    logoDaOng.setAttribute("src", ong.logo);
    horarioOng.innerHTML += ong.horário;
    localizaçãoDaOng.innerHTML += ong.localização;
    telefoneDaOng.textContent = ong.contato.telefone;
    whatsappDaOng.setAttribute("href", ong.contato.whatsapp);
    instaDaOng.setAttribute("href", ong.contato.instagram);
    emailDaOng.setAttribute("href", ong.contato.email);
    ong.o_que_doar.forEach(item => { oqDoar.innerHTML += `<li><p>${item}</p></li>` });
}

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
;



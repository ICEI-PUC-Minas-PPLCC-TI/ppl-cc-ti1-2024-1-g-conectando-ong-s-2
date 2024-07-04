document.getElementById('botao-filtro').addEventListener('click', function() {
    var filtros = document.getElementById('filtros');
    if (filtros.style.display === 'flex') {
        filtros.style.display = 'none';
    } else {
        filtros.style.display = 'flex';
    }
});

const formPesquisa = document.getElementById('form-pesquisa');
const inputBusca = document.getElementById('campo-pesquisa');

formPesquisa.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    realizarBusca();
});

function realizarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const areaInteresseSelecionada = document.getElementById('filtro-interesse').value;
    const cidadeSelecionada = document.getElementById('filtro-cidade').value;
    const experienciaSelecionada = document.getElementById('filtro-experiencia').value;

    const voluntariosFiltrados = filtrarVoluntarios(termoBusca, areaInteresseSelecionada, cidadeSelecionada, experienciaSelecionada);
    exibirResultadosBusca(voluntariosFiltrados);
}

function filtrarVoluntarios(termoBusca, areaInteresse, cidadeSelecionada, experienciaSelecionada) {
    // Array de voluntários (exemplo)
    const voluntarios = [
        { nome: 'Maria Oliveira', cidade: 'São Paulo', estado: 'SP', interesse: 'educacao', experiencia: '3-5-anos', perfil: 'perfil1.html' },
        { nome: 'João Silva', cidade: 'Rio de Janeiro', estado: 'RJ', interesse: 'saude', experiencia: '1-3-anos', perfil: 'perfil2.html' }
    ];

    let voluntariosFiltrados = voluntarios;

    // Filtra por termo de busca
    if (termoBusca) {
        voluntariosFiltrados = voluntariosFiltrados.filter(voluntario => {
            const nome = voluntario.nome.toLowerCase();
            const cidade = voluntario.cidade.toLowerCase();

            return nome.includes(termoBusca) || cidade.includes(termoBusca);
        });
    }

    // Filtra por área de interesse
    if (areaInteresse && areaInteresse !== '') {
        voluntariosFiltrados = voluntariosFiltrados.filter(voluntario => voluntario.interesse === areaInteresse);
    }

    // Filtra por cidade
    if (cidadeSelecionada && cidadeSelecionada !== '') {
        voluntariosFiltrados = voluntariosFiltrados.filter(voluntario => voluntario.cidade.toLowerCase() === cidadeSelecionada.toLowerCase());
    }

    // Filtra por experiência
    if (experienciaSelecionada && experienciaSelecionada !== '') {
        voluntariosFiltrados = voluntariosFiltrados.filter(voluntario => voluntario.experiencia === experienciaSelecionada);
    }

    return voluntariosFiltrados;
}

function exibirResultadosBusca(voluntarios) {
    const listaVoluntarios = document.getElementById('lista-voluntarios');
    listaVoluntarios.innerHTML = ''; // Limpa a lista antes de exibir novos resultados

    voluntarios.forEach(voluntario => {
        const itemLista = document.createElement('li');
        itemLista.classList.add('perfil'); // Adiciona classe para estilização
        itemLista.innerHTML = `
            <h3><a href="${voluntario.perfil}">${voluntario.nome}</a></h3>
            <p>${voluntario.cidade} - ${voluntario.estado}</p>
            <p>Área de Interesse: ${voluntario.interesse}</p>
            <p>Experiência: ${voluntario.experiencia}</p>
        `;
        listaVoluntarios.appendChild(itemLista);
    });
}

/* document.addEventListener('DOMContentLoaded', function() {
    const botaoFiltro = document.getElementById('botao-filtro');
    const form = document.getElementById('form-pesquisa');
    const listaVoluntarios = document.getElementById('lista-voluntarios');
    const areaInteresseSelect = document.getElementById('filtro-interesse');
    const cidadeSelect = document.getElementById('filtro-cidade');
    const experienciaSelect = document.getElementById('filtro-experiencia');

    if (botaoFiltro) {
        botaoFiltro.addEventListener('click', function() {
            var filtros = document.getElementById('filtros');
            if (filtros.style.display === 'flex') {
                filtros.style.display = 'none';
            } else {
                filtros.style.display = 'flex';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio do formulário
            realizarBusca();
        });
    }

    function realizarBusca() {
        const termoBusca = document.getElementById('campo-pesquisa').value.trim();
        const areaInteresseSelecionada = areaInteresseSelect.value;
        const cidadeSelecionada = cidadeSelect.value;
        const experienciaSelecionada = experienciaSelect.value;

        const voluntarios = obterVoluntariosDoLocalStorage();
        const voluntariosFiltrados = filtrarVoluntarios(voluntarios, termoBusca, areaInteresseSelecionada, cidadeSelecionada, experienciaSelecionada);
        exibirResultadosBusca(voluntariosFiltrados);
    }

    function obterVoluntariosDoLocalStorage() {
        const voluntariosStr = localStorage.getItem('voluntarios');
        return voluntariosStr ? JSON.parse(voluntariosStr) : [];
    }

    function filtrarVoluntarios(voluntarios, termoBusca, areaInteresse, cidadeSelecionada, experienciaSelecionada) {
        return voluntarios.filter(voluntario => {
            const areaInteresseLowerCase = (voluntario.areaInteresse || '').toLowerCase();
            const cidadeLowerCase = (voluntario.cidade || '').toLowerCase();
            const experienciaLowerCase = (voluntario.experiencia || '').toLowerCase();
            const nomeVoluntarioLowerCase = (voluntario.nome || '').toLowerCase();

            const termoBuscaLowerCase = termoBusca.toLowerCase();

            return (termoBusca === '' || 
                    nomeVoluntarioLowerCase.includes(termoBuscaLowerCase) || 
                    cidadeLowerCase.includes(termoBuscaLowerCase)) &&
                    (areaInteresse === '' || areaInteresseLowerCase === areaInteresse) &&
                    (cidadeSelecionada === '' || cidadeLowerCase === cidadeSelecionada) &&
                    (experienciaSelecionada === '' || experienciaLowerCase === experienciaSelecionada);
        });
    }

    function exibirResultadosBusca(voluntarios) {
        listaVoluntarios.innerHTML = ''; // Limpa a lista antes de exibir novos resultados

        if (voluntarios.length === 0) {
            listaVoluntarios.innerHTML = '<li>Nenhum voluntário encontrado.</li>';
        } else {
            voluntarios.forEach(voluntario => {
                const itemLista = document.createElement('li');
                itemLista.classList.add('perfil'); // Adiciona classe para estilização
                itemLista.innerHTML = `
                    <h3>${voluntario.nome}</h3>
                    <p>${voluntario.cidade} - ${voluntario.estado}</p>
                    <p>Sobre o voluntário: ${voluntario.sobre}</p>
                `;
                listaVoluntarios.appendChild(itemLista);
            });
        }
    }

    // Chamada inicial para exibir os voluntários ao carregar a página
    realizarBusca();
});
*/

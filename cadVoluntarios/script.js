document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const header = document.querySelector("header");


    // JSON com estados e cidades
    const data = {
        "estados": [
            {
                "nome": "São Paulo",
                "sigla": "SP",
                "cidades": [
                    "São Paulo",
                    "Campinas",
                    "Santos",
                    "Sorocaba",
                    "São José dos Campos"
                ]
            },
            {
                "nome": "Rio de Janeiro",
                "sigla": "RJ",
                "cidades": [
                    "Rio de Janeiro",
                    "Niterói",
                    "Petrópolis",
                    "Duque de Caxias",
                    "Nova Iguaçu"
                ]
            },
            {
                "nome": "Minas Gerais",
                "sigla": "MG",
                "cidades": [
                    "Belo Horizonte",
                    "Uberlândia",
                    "Ouro Preto",
                    "Contagem",
                    "Juiz de Fora"
                ]
            },

            {
                "nome": "Espírito Santo",
                "sigla": "ES",
                "cidades": [
                    "Vitória",
                    "Vila Velha",
                    "Guarapari",
                    "Cariacica",
                    "Linhares"
                ]
            },

            {
                "nome": "Paraná",
                "sigla": "PR",
                "cidades": [
                    "Curitiba",
                    "Londrina",
                    "Maringá",
                    "Ponta Grossa",
                    "Cascavel"
                ]
            },
            {
                "nome": "Rio Grande do Sul",
                "sigla": "RS",
                "cidades": [
                    "Porto Alegre",
                    "Caxias do Sul",
                    "Pelotas",
                    "Canoas",
                    "Santa Maria"
                ]
            },
            {
                "nome": "Bahia",
                "sigla": "BA",
                "cidades": [
                    "Salvador",
                    "Feira de Santana",
                    "Vitória da Conquista",
                    "Camaçari",
                    "Juazeiro"
                ]
            },
            {
                "nome": "Santa Catarina",
                "sigla": "SC",
                "cidades": [
                    "Florianópolis",
                    "Joinville",
                    "Blumenau",
                    "São José",
                    "Chapecó"
                ]
            },
            {
                "nome": "Pernambuco",
                "sigla": "PE",
                "cidades": [
                    "Recife",
                    "Olinda",
                    "Jaboatão dos Guararapes",
                    "Caruaru",
                    "Petrolina"
                ]
            },
            {
                "nome": "Ceará",
                "sigla": "CE",
                "cidades": [
                    "Fortaleza",
                    "Juazeiro do Norte",
                    "Sobral",
                    "Maracanaú",
                    "Iguatu"
                ]
            },
            {
                "nome": "Goiás",
                "sigla": "GO",
                "cidades": [
                    "Goiânia",
                    "Anápolis",
                    "Aparecida de Goiânia",
                    "Rio Verde",
                    "Luziânia"
                ]
            }
        ]
    };

    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    // Preenche o select de estados
    data.estados.forEach(function(estado) {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
    });

    // Adiciona evento para mudança de estado
    estadoSelect.addEventListener('change', function() {
        const selectedState = this.value;
        cidadeSelect.innerHTML = '<option value="">Selecione a Cidade</option>'; // Reseta o select de cidades
        cidadeSelect.disabled = true;

        if (selectedState) {
            const estado = data.estados.find(function(estado) {
                return estado.sigla === selectedState;
            });

            if (estado) {
                estado.cidades.forEach(function(cidade) {
                    const option = document.createElement('option');
                    option.value = cidade;
                    option.textContent = cidade;
                    cidadeSelect.appendChild(option);
                });

                cidadeSelect.disabled = false;
            }
        }
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);

        // Captura dos dados do formulário
        const nomeVoluntario = document.getElementById('InputNome').value;
        const email = document.getElementById('InputEmail').value;
        const fotoPessoal = document.querySelector('input[type="file"]').value;
        const telefone = document.querySelector('input[type="telefone"]').value;
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;
        const sobreVoluntario = document.querySelector('textarea[name="sobreVoluntario"]').value;
        
        // Exemplo de como mostrar os dados capturados
        console.log('Nome:', nomeVoluntario);
        console.log('Email:', email);
        console.log('Foto pessoal:', fotoPessoal);
        console.log('Telefone para contato:', telefone);
        console.log('Estado:', estado);
        console.log('Cidade:', cidade);
        console.log('Experiências do voluntário:', sobreVoluntario);
        
        alert('Dados enviados com sucesso!');

        // Recarrega a página
        window.location.reload();
    });
});

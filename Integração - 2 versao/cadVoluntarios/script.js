document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');
    const areaInteresseSelect = document.getElementById('area_interesse');
    const experienciaSelect = document.getElementById('experiencia');

    const data = {
        "estados": [
            {
                "nome": "São Paulo",
                "sigla": "SP",
                "cidades": [
                    "São Paulo",
                    "Campinas",
                    "Santos"
                ]
            },
            {
                "nome": "Rio de Janeiro",
                "sigla": "RJ",
                "cidades": [
                    "Rio de Janeiro",
                    "Niterói",
                    "Petrópolis"
                ]
            },
            {
                "nome": "Minas Gerais",
                "sigla": "MG",
                "cidades": [
                    "Belo Horizonte",
                    "Contagem",
                    "Betim"
                ]
            },
            {
                "nome": "Paraná",
                "sigla": "PR",
                "cidades": [
                    "Curitiba",
                    "Londrina",
                    "Maringá"
                ]
            }
        ]
    };

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

    // Adiciona um event listener para o evento "submit" do formulário
    form.addEventListener('submit', function(event) {
        // Previne o comportamento padrão de envio do formulário
        event.preventDefault();
        
        // Captura dos dados do formulário
        const nomeVoluntario = document.getElementById('InputNome').value.trim();
        const email = document.getElementById('InputEmail').value.trim();
        const telefone = document.getElementById('InputTelefone').value.trim();
        const estado = estadoSelect.value;
        const cidade = cidadeSelect.value;
        const areaInteresse = areaInteresseSelect.value;
        const experiencia = experienciaSelect.value;
        const sobreVoluntario = document.querySelector('textarea[name="sobreVoluntario"]').value.trim();
      
        // Validação simples dos campos
        if (!nomeVoluntario || !email || !telefone || !estado || !cidade || !areaInteresse || !experiencia || !sobreVoluntario) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }

        // Objeto para armazenar os dados capturados
        const voluntarioData = {
            nome: nomeVoluntario,
            email: email,
            telefone: telefone,
            estado: estado,
            cidade: cidade,
            area_interesse: areaInteresse,
            experiencia: experiencia,
            sobre: sobreVoluntario
        };

        // Armazenar os dados no localStorage
        let voluntarios = obterVoluntariosDoLocalStorage();
        voluntarios.push(voluntarioData);
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

        // Exibe um alerta de sucesso
        alert('Dados enviados com sucesso!');

        // Limpa o formulário após o envio
        form.reset();
    });

    function obterVoluntariosDoLocalStorage() {
        const voluntariosStr = localStorage.getItem('voluntarios');
        return voluntariosStr ? JSON.parse(voluntariosStr) : [];
    }

});

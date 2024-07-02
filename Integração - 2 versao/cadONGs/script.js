document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        const formData = new FormData(form);

        // Captura dos dados do formulário
        const name = formData.get('name');
        const category = formData.get('category');
        const logoFile = formData.get('logo'); // Arquivo de logomarca
        const city = formData.get('city');
        const neighborhood = formData.get('neighborhood');
        const street = formData.get('street');
        const mapUrl = formData.get('mapUrl');
        const time = formData.get('time');
        const donations = formData.get('donations');
        const pix = formData.get('pix');
        const caixaPostal = formData.get('caixa_postal');
        const contact = formData.get('contact');
        const whatsapp = formData.get('whatsapp');
        const email = formData.get('email');
        const instagram = formData.get('instagram');
        const description = formData.get('description');

        // Exemplo de como mostrar os dados capturados no console
        console.log('Nome da ONG:', name);
        console.log('Categoria da ONG:', category);
        console.log('Logomarca da ONG:', logoFile);
        console.log('Cidade:', city);
        console.log('Bairro:', neighborhood);
        console.log('Rua/Número:', street);
        console.log('Endereço pelo Google Maps:', mapUrl);
        console.log('Horário de Funcionamento:', time);
        console.log('O que doar:', donations);
        console.log('PIX para doações:', pix);
        console.log('Caixa Postal:', caixaPostal);
        console.log('Telefone para contato:', contact);
        console.log('Whatsapp:', whatsapp);
        console.log('Email:', email);
        console.log('Instagram:', instagram);
        console.log('Sobre a ONG:', description);


        // Exibe alerta de sucesso
        alert('Dados enviados com sucesso!');

        // Recarrega a página (remova se não for necessário)
        window.location.reload();
    });
});
/*document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura dos dados do formulário
        const nomeONG = document.getElementById('InputNome').value;
        const email = document.getElementById('InputEmail').value;
        const logomarca = document.querySelector('input[type="file"]').value; // Isso captura apenas o nome do arquivo, não o arquivo em si
        const horarioFuncionamento = document.querySelector('input[name="horarioFuncionamento"]').value;
        const categoria = document.getElementById('categoria').value;
        const pixDoacoes = document.querySelector('input[name="pixDoacoes"]').value;
        const contatosRedesSociais = document.querySelector('input[name="contatosRedesSociais"]').value;
        const oQueDoar = document.querySelector('input[name="oQueDoar"]').value;
        const sobreONG = document.querySelector('textarea[name="sobreONG"]').value;

        // Criação do objeto JSON com os dados
        const formData = {
            nomeONG: nomeONG,
            email: email,
            logomarca: logomarca, // Verifique se o valor capturado aqui está correto para o seu caso
            horarioFuncionamento: horarioFuncionamento,
            categoria: categoria,
            pixDoacoes: pixDoacoes,
            contatosRedesSociais: contatosRedesSociais,
            oQueDoar: oQueDoar,
            sobreONG: sobreONG
        };

        // Convertendo o objeto em JSON
        const jsonData = JSON.stringify(formData);

        // Armazenando os dados na sessionStorage
        sessionStorage.setItem('formData', jsonData);
        
        window.location.reload();

        form.reset();

        alert('Formulário enviado com sucesso!');

        // Opcional: Remover alerta após alguns segundos
        // setTimeout(() => {
        //     alertElement.style.display = 'none';
        // }, 3000);
    });
});
*/

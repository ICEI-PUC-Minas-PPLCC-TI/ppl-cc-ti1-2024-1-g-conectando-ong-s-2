document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
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

        // Criar objeto com os dados capturados
        const formDataObj = {
            name: name,
            category: category,
            logoFile: logoFile, // Aqui é um objeto File, que não pode ser serializado diretamente
            city: city,
            neighborhood: neighborhood,
            street: street,
            mapUrl: mapUrl,
            time: time,
            donations: donations,
            pix: pix,
            caixaPostal: caixaPostal,
            contact: contact,
            whatsapp: whatsapp,
            email: email,
            instagram: instagram,
            description: description
        };

        // Armazenar os dados no localStorage como JSON
        localStorage.setItem('formData', JSON.stringify(formDataObj));
        
        // Exibe mensagem no console
        console.log('Dados enviados com sucesso:', formDataObj);

        // Exibe alerta de sucesso (opcional)
        alert('Dados enviados com sucesso!');

        window.location.reload();

    });
});

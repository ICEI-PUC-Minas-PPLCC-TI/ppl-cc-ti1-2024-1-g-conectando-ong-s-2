document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const menuButton = document.getElementById("menuButton");
    const menuOpcoes = document.getElementById("menuOpcoes");
    const header = document.querySelector("header");
    const fecharMenu = document.getElementById("fecharMenu");

    fecharMenu.addEventListener("click", function() {
        menuOpcoes.style.display = "none";
    });
    

    menuButton.addEventListener("click", function() {
        if (menuOpcoes.style.display === "none" || menuOpcoes.style.display === "") {
            menuOpcoes.style.display = "flex"; 
        } else {
            menuOpcoes.style.display = "none"; 
        }
    });

    function ajustarMenuOpcoes() {
        if (window.innerWidth > 768) {
            
            menuOpcoes.style.display = "flex";
            menuOpcoes.style.backgroundColor = "transparent";
            menuOpcoes.style.position = "relative";
            menuOpcoes.style.top = "auto";
            menuOpcoes.style.left = "auto";
            menuOpcoes.style.width = "auto";
            header.appendChild(menuOpcoes);
            fecharMenu.style.display = window.innerWidth > 768 ? "none" : "block";
        } else {
            
            menuOpcoes.style.display = "none";
            menuOpcoes.style.backgroundColor = "white";
            menuOpcoes.style.position = "fixed";
            menuOpcoes.style.top = "0";
            menuOpcoes.style.right = "0";
            menuOpcoes.style.width = "40%";
            document.body.appendChild(menuOpcoes);
            fecharMenu.style.display = window.innerWidth < 768 ? "flex" : "block"; 
        }
    }

    window.addEventListener("load", ajustarMenuOpcoes);
    window.addEventListener("resize", ajustarMenuOpcoes);
});

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
    const formData = new FormData(form);

        // Captura dos dados do formulário
        const nomeONG = document.getElementById('InputNome').value;
        const email = document.getElementById('InputEmail').value;
        const logomarca = document.querySelector('input[type="file"]').value;
        const horarioFuncionamento = document.querySelector('input[type="horario"]').value;
        const categoria = document.getElementById('categoria').value;
        const pixDoacoes = document.querySelector('input[type="text"]').value;
        const contatosRedesSociais = document.querySelector('input[name="contatosRedesSociais"]').value;
        const oQueDoar = document.querySelector('input[type="doacao"]').value;
        const sobreONG = document.querySelector('textarea[name="sobreONG"]').value;
        
        // Exemplo de como mostrar os dados capturados
        console.log('Nome da ONG:', nomeONG);
        console.log('Email:', email);
        console.log('Logomarca da ONG:', logomarca);
        console.log('Horário de Funcionamento:', horarioFuncionamento);
        console.log('Categoria da ONG:', categoria);
        console.log('PIX para doações:', pixDoacoes);
        console.log('Contatos e Redes Sociais:', contatosRedesSociais);
        console.log('O que doar:', oQueDoar);
        console.log('Sobre a ONG:', sobreONG);
        
        alert('Dados enviados com sucesso!');

    // Recarrega a página
    window.location.reload();
});

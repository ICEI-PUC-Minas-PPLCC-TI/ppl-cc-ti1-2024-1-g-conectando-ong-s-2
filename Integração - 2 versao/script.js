document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.botao-pagamento').forEach(function(botao) {
      botao.addEventListener('click', function() {
          const metodoPagamento = this.textContent.trim();
          switch (metodoPagamento) {
              case 'Pagar com Cartão':
                  exibirFormulario('.form-cartao', this);
                  break;
              case 'Pagar com PIX':
                  exibirFormulario('.form-pix', this);
                  break;
              case 'Gerar Boleto':
                  exibirFormulario('.form-boleto', this);
                  break;
              default:
                  realizarPagamento(metodoPagamento);
                  break;
          }
      });
  });


  document.querySelectorAll('.botao-pagamento.cancelar-cartao, .botao-pagamento.cancelar-pix, .botao-pagamento.cancelar-boleto').forEach(function(botao) {
      botao.addEventListener('click', function() {
          const form = this.parentElement;
          form.style.display = 'none';
          form.parentElement.querySelector('.pagar-cartao, .pagar-pix, .pagar-boleto').style.display = 'inline-block'; // Mostra o botão "Pagar com ..."
      });
  });

  
  function exibirFormulario(formClass, botao) {
      document.querySelector(formClass).style.display = 'flex';
      botao.style.display = 'none';
      botao.parentElement.querySelector('.cancelar-cartao, .cancelar-pix, .cancelar-boleto').style.display = 'inline-block';
  }


  document.querySelectorAll('.finalizar-cartao, .finalizar-pix, .finalizar-boleto').forEach(function(botao) {
      botao.addEventListener('click', function() {
          const metodoPagamento = 'Finalizar Pagamento';
          realizarPagamento(metodoPagamento);
      });
  });

  
  function realizarPagamento(metodoPagamento) {
      console.log('Pagamento realizado com sucesso:', metodoPagamento);
  }
});
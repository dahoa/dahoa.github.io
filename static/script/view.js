//import {mockData, c} from '/script/model.js';
// Main DOM injections
$(function() {

  c.main.draw();
  c.side1.draw();
  c.side2.draw();
  toggleVisibility(c.main,c.side1,c.side2);

  $('[data-toggle="tooltip"]').tooltip();

  $('.btn-menu,.show-menu').click(function() {
    $('.mp-menu').toggle();
    $('.mp-view').toggleClass('mp-view-no-menu');
    $('.show-menu').toggle();
  });

  $('.dsh_entrada_a').click(function(){
    hideView('.mp-vazao');
    c.flow.draw();
    toggleVisibility(c.flow);
  });

  $('.central-bombas .card').click(function(){
    hideView('.mp-bombas');
    c.pump.draw();
    c.time.draw();
    toggleVisibility(c.pump,c.time);
  });

  $(".home-btn").click(function(){
    hideView('.mp-content');
    c.main.draw();
    c.side1.draw();
    c.side2.draw();
    toggleVisibility(c.main,c.side1,c.side2);
  });

  // Aba de Relatorio
  $(".report-btn").click(function(){
    hideView('.mp-relatorio');
	//c.performance.draw();
    //c.entrada_vazao.draw();
    //c.saida_vazao.draw();
    toggleVisibility(c.performance,c.entrada_vazao,c.saida_vazao);
  });

  // Aba de Cadastro de Usuario
  $(".signup-user-btn").click(function(){
    hideView('.mp-cad-user');
    c.main.draw();
    c.side1.draw();
    c.side2.draw();
  });

  // Aba de Cadastro de Empreendimento
  $(".signup-ent-btn").click(function(){
    hideView('.mp-cad-emp');
    c.main.draw();
    c.side1.draw();
    c.side2.draw();
  });

  // Aba de Cadastro de Empreendimento
  $(".act-btn").click(function(){
    hideView('.mp-acionamento');
    c.main.draw();
    c.side1.draw();
    c.side2.draw();
  });

  /** Aba de Cadastro de Empreendimento
  $(".cad-user-to-ent-btn").click(function(){
    hideView('.mp-cad-emp');
    c.main.draw();
    c.side1.draw();
    c.side2.draw();
  });
  **/
  $('.mpAlert').click(function(){
    $('.mpAlert').toggle();
  });
});

$(window).smartresize(function () {
  Object.values(c).forEach((obj) => {
    if(obj.visibility)
      obj.draw();
  });
});

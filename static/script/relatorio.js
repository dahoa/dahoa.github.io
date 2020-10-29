const p_inicial = [];
const p_final = [];

document.getElementById("p_inicio").addEventListener("change", function() {
  var input = this.value;
  input = input.split("-");
  p_inicial.push(input[2] + "/" + input[1] + "/" + input[0]);
  console.log(p_inicial); 
  var data = new Date(input);
  p_inicial.push(data);
  setValores();
  //console.log(dateEntered);
});

document.getElementById("p_final").addEventListener("change", function() {
  var input = this.value;
  input = input.split("-");
  p_final.push(input[2] + "/" + input[1] + "/" + input[0]);
  console.log(p_final); //e.g. 2015-11-13
  var data = new Date(input);
  p_final.push(data);
  setValores();
});

function setValores(){
  if(p_inicial[0] != undefined && p_final[0] != undefined){
    setMeta();
    setConsumo();
    setAlertas();
  }
}

function setMeta(){
  $('#content-meta').ready(function() {
    var metaValor = '';
    if(p_inicial[0] == p_final[0]){
      var meta = "A meta deste empreendimento ainda não foi alcançada no período de " + p_inicial[0] + ". Resta " + metaValor + "m³ para ser alcançado.";
    }
    else{
      var meta = "A meta deste empreendimento ainda não foi alcançada no período de " + p_inicial[0] + " a " + p_final[0] + ". Resta " + metaValor + "m³ para ser alcançado.";
    }
    $('#content-meta').text(meta);
  
  })}

  function setAlertas(){
    $('#content-alertas').ready(function() {
      var alertas = '';
      if(p_inicial[0] == p_final[0]){
        var alerta = "Não houve alertas no período de " + p_inicial[0] + ".";
      }
      else{
        var alerta = "Não houve alertas no período de " + p_inicial[0] + " a " + p_final[0] + ".";
      }
      $('#content-alertas').text(alerta);
    
    })}

function setConsumo(){
  setConsumoConc();
  setConsumoPoco();
}

function setConsumoConc(){
$('#content-consumo').ready(function() {
  var consumo = 0;
  if(p_inicial[0] == p_final[0]){
    var ent_conc = "O consumo da entrada da concessionária na data " + p_inicial[0] + " foi igual a " + consumo + "m³.";
  }
  else{
    var ent_conc = "O consumo da entrada da concessionária nas datas " + p_inicial[0] + " até " + p_final[0] + " foi igual a " + consumo + "m³.";
  }
  $('#consumo-conc-content').text(ent_conc);

})}

function setConsumoPoco(){
  $('#consumo-content').ready(function() {
    var consumo = 0;
    if(p_inicial[0] == p_final[0]){
      var ent_poco = "O consumo da entrada do poço na data " + p_inicial[0] + " foi igual a " + consumo + "m³.";
    }
    else{
      var ent_poco = "O consumo da entrada do poço nas datas " + p_inicial[0] + " até " + p_final[0] + " foi igual a " + consumo + "m³.";
    }
    $('#consumo-poco-content').text(ent_poco);
  })}
  
$(function(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    //$('#txtDate').attr('max', maxDate);
    $('.validar-data').attr('max', maxDate);
});

function CriaPDF(all) {
  $('.mpAlert').toggle();
  var mp_alert = new MpAlert();

  if (p_final[1] < p_inicial[1]){
    mp_alert.title.val("Datas incorretas!");
    mp_alert.content.val("Verifique a ordem das datas inicial e final!");
  }
  else if (p_inicial[0] == undefined){
    if(p_final[0] == undefined){
      mp_alert.title.val("Datas não inseridas");
      mp_alert.content.val("Escolha datas para o período inicial e final!");
    }
    mp_alert.title.val("Datas não inseridas");
    mp_alert.content.val("Escolha uma data para o período inicial!");
  }
  else if(p_final[0] == undefined){
    mp_alert.title.val("Datas não inseridas");
    mp_alert.content.val("Escolha uma data para o período final!");
  }
  else{
    var relatorio = ""

    //+ document.getElementById('vazao-content').innerHTML + document.getElementById('meta-content').innerHTML + document.getElementById('consumo-content').innerHTML + document.getElementById('alertas-content').innerHTML;
    if(all == true) {
      var mycanvas = document.getElementById("main-graph-performance");
      var imgData = mycanvas.toDataURL("image/png");
      var perfomance_grafico = '<img src="' + imgData + '"/>'
      var performance_content = '<div class="row"> \
      <div class="col-md-10 mx-auto">\
        <p class="lead break text-left pl-3"><b>  Performance </b></p></div></div>' + perfomance_grafico + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-performance').innerHTML+ '</div>'; 
      relatorio += performance_content;

      var mycanvas = document.getElementById("main-graph-vazao-entrada");
      var imgData = mycanvas.toDataURL("image/png");
      var vazao_grafico = '<label for = "main-graph-vazao-entrada"> \
      Entrada<br /> \
        <img src="' + imgData + '"/>' + '</label>';

      var mycanvas = document.getElementById("main-graph-vazao-saida");
      var imgData = mycanvas.toDataURL("image/png");
      vazao_grafico += '<label for = "main-graph-vazao-entrada"> \
      Saída<br /> \
        <img src="' + imgData + '"/>' + '</label>';

      var vazao_content = '<div class="row"> \
      <div class="col-md-10 mx-auto">\
        <p class="lead break text-left pl-3"><b>  Vazão </b></p></div></div>' +  vazao_grafico + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-vazao').innerHTML+ '</div>'; 

      relatorio += vazao_content;
      var consumo_content = '<div class="row"> \
      <div class="col-md-10 mx-auto">\
        <p class="lead break text-left pl-3"><b>  Consumo </b></p></div></div>' + '<div class="col-md-10 mt-4 mx-auto">' + document.getElementById('content-consumo').innerHTML+ '</div>'; 
      relatorio += consumo_content;
      var meta_content = '<div class="row"> \
      <div class="col-md-10 mx-auto">\
        <p class="lead break text-left pl-3"><b> Meta </b></p></div></div>' + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-meta').innerHTML+ '</div>'; 
      relatorio += meta_content;
      var alertas_content = '<div class="row"> \
      <div class="col-md-10 mx-auto">\
        <p class="lead break text-left pl-3"><b> Alertas </b></p></div></div>' + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-alertas').innerHTML+ '</div>'; 
      relatorio += alertas_content;
      
    }
    else{
      switch(all){
        case 'performance':
          var mycanvas = document.getElementById("main-graph-performance");
          var imgData = mycanvas.toDataURL("image/png");
          var perfomance_grafico = '<img src="' + imgData + '"/>'
          var performance_content = '<div class="row"> \
          <div class="col-md-10 mx-auto">\
            <p class="lead break text-left pl-3"><b>  Performance </b></p></div></div>' + perfomance_grafico + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-performance').innerHTML+ '</div>'; 
          relatorio = performance_content;
          break;
        case 'vazao':
          var mycanvas = document.getElementById("main-graph-vazao-entrada");
          var imgData = mycanvas.toDataURL("image/png");
          var vazao_grafico = '<label for = "main-graph-vazao-entrada"> \
          Entrada<br /> \
            <img src="' + imgData + '"/>' + '</label>';

          var mycanvas = document.getElementById("main-graph-vazao-saida");
          var imgData = mycanvas.toDataURL("image/png");
          vazao_grafico += '<label for = "main-graph-vazao-entrada"> \
          Saída<br /> \
            <img src="' + imgData + '"/>' + '</label>';

          var vazao_content = '<div class="row"> \
          <div class="col-md-10 mx-auto">\
            <p class="lead break text-left pl-3"><b>  Vazão </b></p></div></div>' +  vazao_grafico + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-vazao').innerHTML+ '</div>'; 

          relatorio = vazao_content;
          break;
        case 'consumo':
          var consumo_content = '<div class="row"> \
          <div class="col-md-10 mx-auto">\
            <p class="lead break text-left pl-3"><b>  Consumo </b></p></div></div>' + '<div class="col-md-10 mt-4 mx-auto">' + document.getElementById('content-consumo').innerHTML+ '</div>'; 
          relatorio = consumo_content;
          break;
        case 'meta':
          var meta_content = '<div class="row"> \
          <div class="col-md-10 mx-auto">\
            <p class="lead break text-left pl-3"><b> Meta </b></p></div></div>' + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-meta').innerHTML+ '</div>'; 
          relatorio = meta_content;
          break;
        case 'alertas':
          var alertas_content = '<div class="row"> \
          <div class="col-md-10 mx-auto">\
            <p class="lead break text-left pl-3"><b> Alertas </b></p></div></div>' + '<div class=" tg col-md-10 mt-4 mx-auto">' + document.getElementById('content-alertas').innerHTML+ '</div>'; 
          relatorio = alertas_content;
          break;
      }
      //var relatorio = all;
    }
    //var google = document.getElementById('google').innerHTML;
    

    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Relatório</title>');   // <title> CABEÇALHO DO PDF.
    win.document.write('<link rel="stylesheet" href="static/theme.css" type="text/css"></link>');
    //win.document.write('<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src example.com;">');
    win.document.write('</head>');
    win.document.write('<body class="text-center"> \
    <div class="p-3 h-100 d-flex flex-column" style=""> \
      <div class="container mb-5"> \
        <div class="row"> \
          <div class="mx-auto col-md-5"> \
            <img class="img-fluid d-block mx-auto" src="static/logoAquag.png">\
          </div>\
        </div>\
        <div class="row mt-3">\
          <div class="col-md-14" style="margin: auto;">\
            <p class="lead" style="color: #666666;">Eficiência hídrica para além da economia</p>\
          </div>\
        </div>\
      </div>');
    win.document.write('<div class="container"> \
    <div class="row"> \
      <div class="col-md-10 mx-auto">\
        <h4 class="mb-5"><b>RELATÓRIO DE INDICADORES</b> </h4> \
        <p class="lead break text-left" ><b>');
    win.document.write('Período: ' + p_inicial[0] + ' a ' + p_final[0]);
    win.document.write('</b></p></div></div></div>');
    win.document.write('<div class="mb-5 mt-4">' + relatorio + '</div>');
    var mycanvas = document.getElementById("main-graph-performance");
    var imgData = mycanvas.toDataURL("image/png");
    //win.document.write('<img src="' + imgData + '"/>');
    win.document.write('</div><script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> \
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script> \
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script></body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.onload = function(){
      win.print();                                                            // IMPRIME O CONTEUDO
    };
  }
}



function registroConsumo(){
  var ent_conc = "O consumo da entrada da concessionária nas datas " + p_inicial + " até " + p_final + " foi igual a " + consumo + "m³.";
  var ent_poco = "O consumo da entrada do poço nas datas " + p_inicial + " até " + p_final + " foi igual a " + consumo + "m³.";
}
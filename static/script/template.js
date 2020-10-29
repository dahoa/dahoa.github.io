//import {mockData, c} from '/script/model.js';

function hideView(aClass)
{
  view = $(aClass);
  if(!view.hasClass('mp-focus'))
  {
    $('.mp-focus').attr('hidden','hidden');
    $('.mp-focus').toggleClass('mp-hidden mp-focus');
    view.toggleClass('mp-hidden mp-focus');
    view.removeAttr('hidden');
  }
}

function toggleVisibility(...args)
{
  args.forEach((arg) => {
    arg.visibility = true;
    arg.underToggle = true;
    Object.values(c).forEach((obj) => {
      if(!arg.underToggle){
        arg.visibility = false;
      }
    });
    arg.underToggle = false;
  });
}

horizontalChart = new MpOptions('horizontalBar', 'left');
verticalChart = new MpOptions('bar', 'top');
lineChart = new MpOptions('line', 'top');

$(function(){
  cloneMock = JSON.parse(JSON.stringify(mockData));
  cloneMock2 = JSON.parse(JSON.stringify(mockData));
  mockData.datasets[0].label = 'Inferior 1';
  cloneMock.datasets[0].label = 'Superior 1';
  cloneMock2.datasets[0].label = 'Superior 2';
  c.main = new MpChart(mockData, 'main-graph', lineChart, 'Inferior 1', true);
  c.side1 = new MpChart(cloneMock, 'secondary-graph', lineChart, 'Superior 1', true);
  c.side2 = new MpChart(cloneMock2, 'third-graph', lineChart, 'Superior 2', true);

  c.flow = new MpChart(mockData, 'vaz-qnt-graph', lineChart, 'Consumo XXX', true);
  c.pump = new MpChart(mockData, 'action-qnt-graph', horizontalChart, 'Quantidade de Acionamento', true);
  c.time = new MpChart(mockData, 'action-tmp-graph', horizontalChart, 'Tempo de Acionamento', true);

  c.performance = new MpChart(mockData, 'main-graph-performance', verticalChart, 'Cenário Principal', true);
  c.entrada_vazao = new MpChart(vazaoEntrada, 'main-graph-vazao-entrada', verticalChart, 'Cenário Secundário', true);
  c.saida_vazao = new MpChart(vazaoSaida, 'main-graph-vazao-saida', verticalChart, 'Cenário Secundário', true);

  //c.meta = new MpChart(meta, 'main-graph-meta', verticalChart, 'Cenário Secundário', true);
});

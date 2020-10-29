var color = Chart.helpers.color;

var mockData = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
		datasets: [{
			backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			borderColor: window.chartColors.red,
			borderWidth: 1,
			data: [
				Math.abs(randomScalingFactor()),
				Math.abs(randomScalingFactor()),
				Math.abs(randomScalingFactor()),
				Math.abs(randomScalingFactor()),
				Math.abs(randomScalingFactor()),
				Math.abs(randomScalingFactor()),
				Math.abs(randomScalingFactor())
      ]
    }]
  };

var vazaoEntrada = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [{
      label: 'Poço',
      backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
      borderColor: window.chartColors.red,
      borderWidth: 1,
      data: [
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor())
      ]
    },
    {
      label: 'Concessionária',
      backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
      borderColor: window.chartColors.blue,
      borderWidth: 1,
      data: [
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor()),
        Math.abs(randomScalingFactor())
      ]
    }]
  };

var vazaoSaida = {
labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  datasets: [{
	label: 'Setores',
	backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
	borderColor: window.chartColors.green,
	borderWidth: 1,
	data: [
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor())
	]
  },
  {
	label: 'Distintos',
	backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
	borderColor: window.chartColors.yellow,
	borderWidth: 1,
	data: [
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor()),
	  Math.abs(randomScalingFactor())
	]
  }]
};

var meta = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
	datasets: [{
	  label: 'Meta Definida',
	  backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
	  borderColor: window.chartColors.green,
	  borderWidth: 1,
	  data: [
		Math.abs(randomScalingFactor()),
		Math.abs(randomScalingFactor()),
		Math.abs(randomScalingFactor()),
		Math.abs(randomScalingFactor()),
		Math.abs(randomScalingFactor()),
		Math.abs(randomScalingFactor()),
		Math.abs(randomScalingFactor())
	  ]
	}]
  };

class MpOptions{
  constructor(type, position){
    this.type = type;
    this.position = position;
  }
}

class MpChart{
  constructor(data, chart, options, title, title_display)
  {
    this.data = data;
    this.options = options;
    this.visibility = false;
    this.underToggle = false;
    this.title_display = this.title_display;
    this.title = title;
    this.chart = new Chart(document.getElementById(chart).getContext('2d'), {
      type: options.type,
      data: this.data,
      options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
          display: this.title_display,
          text: this.title,
        },
        legend: {
          position: this.options.position,
          labels: {
              fontColor: 'white'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#bbe0ff",
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "#aae0ff",
                }
            }]
        },
      }
    });
  }
  draw() {
    this.chart.update();
    this.chart.resize();
  }
}

class MpDashboard{
  constructor(){
    this.dsh_last_consum = $('#dsh_last_consum');
    this.dsh_curr_consum = $('#dsh_curr_consum');
    this.dsh_days = $('#dsh_days');
    this.dsh_projection = $('#dsh_projection');
  }
}

class Usuario {
  constructor() {
    this.nome = $('#nome');
    this.tipo_pessoa =  $('#tipo_pessoa');
    this.username = $('#username');
    this.password = $('#password');
    this.rg = $('#rg');
    this.cpf = $('#cpf');
    this.email = $('#email');
    this.celular = $('#celular');
    this.telefone = $('#telefone');
    this.endereco = $('#endereco');
    this.numero = $('#numero');
    this.bairro = $('#bairro');
    this.cidade = $('#cidade');
    this.estado = $('#estado');
    this.pais = $('#pais');
    this.is_staff = $('#is_staff');
  }
}

class Empreendimento {
  constructor() {
    this.tipo_classificacao = $('#tipo_classificacao');;
    this.tipo_servico =  $('#tipo_servico');
    this.nomeEmpreendimento = $('#nomeEmpreendimento');
    this.cnpj = $('#cnpj');
    this.matricula = $('#matricula');
    this.cicloCobranca = $('#cicloCobranca');
    this.responsavel = $('#responsavel');
    this.endereco = $('#endereco');
    this.numero = $('#numero');
    this.bairro = $('#bairro');
    this.cidade = $('#cidade');
    this.estado = $('#estado');
    this.pais = $('#pais');
    this.alturaReservatorio = $('#alturaReservatorio');
    this.volReservatorio = $('#volReservatorio');
    this.meta = $('#meta');
    this.qtdPontosEntrada = $('#qtdPontosEntrada');
    this.qtdPontosConsumo = $('#qtdPontosConsumo');
    this.qtdUnidadeConsumidora = $('#qtdUnidadeConsumidora');
    this.qtdReservatorioSup = $('#qtdReservatorioSup');
    this.qtdReservatorioInf = $('#qtdReservatorioInf');
    this.setValvula = $('#setValvula');
    this.qtdValvula = $('#qtdValvula');
    this.setAguaAlternativa = $('#setAguaAlternativa');
    this.qtdAguaAlternativa = $('#qtdAguaAlternativa');
    this.setCentralAguaQuente = $('#setCentralAguaQuente');
    this.setVazaoAutomatizado = $('#setVazaoAutomatizado');
    this.setMedicaoEfluentes = $('#setMedicaoEfluentes');
    this.qtdBombas = $('#qtdBombas');
    this.prazo_contratual = $('#prazo_contratual');
  }
}

class MpAlert{
  constructor()
  {
    this.title = $('.mpAlert .title');
    this.content = $('.mpAlert .content');
  }
}

var horizontalChart;
var verticalChart;

var c = {
  main : '',
  side1 : '',
  side2 : '',
  flow : '',
  pump : '',
  time : '',
  performance : '',
  entrada_vazao : '',
  saida_vazao : '',
  //meta: ''
}

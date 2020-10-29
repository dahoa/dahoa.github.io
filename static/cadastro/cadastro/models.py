from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core import validators 
from django.db import models
from django.utils import timezone
from datetime import date
from django.utils.translation import ugettext_lazy as _
from localflavor.br.br_states import STATE_CHOICES

import re

from django.db import models
from django.core import validators
from django.utils import timezone
from django.core.mail import send_mail
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_staff, is_superuser, **extra_fields):
        now = timezone.now()
        if not username:
          raise ValueError(_('The given username must be set'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                 is_staff=is_staff,
                 is_superuser=is_superuser, last_login=now,
                 created_at=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        return self._create_user(username, email, password, False, False,
                 **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        user=self._create_user(username, email, password, True, True,
                 **extra_fields)
        user.save(using=self._db)
        return user

class Usuario(AbstractBaseUser, PermissionsMixin):
    INTE = "INTEGRADOR"
    LICE = "LICENCIADO"
    GEST = "GESTOR"
    USER = "USUARIO"

    TIPO_USUARIO_CHOICES = (
        (INTE, "INTEGRADOR"),
        (LICE, "LICENCIADO"),
        (GEST, "GESTOR"),
        (USER, "USUARIO"),
    )

    '''
    foto = models.ImageField('Foto',
                             upload_to='user',
                             default='user/2205256774854474505.jpg',
                             blank='true')
    '''

    nome = models.CharField('Nome', max_length=100)
    username = models.CharField('ID do usuário', max_length=20, unique=True)
    tipo_pessoa = models.CharField('Tipo Pessoa', max_length=20, choices=TIPO_USUARIO_CHOICES)
    rg = models.CharField('RG', max_length=20, unique=True,blank=True, null=True,)
    cpf = models.CharField('CPF/CNPJ', max_length=20, unique=True, blank=True, null=True)
    email = models.EmailField('E-mail', unique=True)

    celular = models.CharField('Celular', max_length=20, blank=True, null=True)
    telefone = models.CharField('Telefone', max_length=20, blank=True, null=True)

    # Endereço
    endereco = models.CharField('Endereço', max_length=100, blank=True, null=True)
    numero = models.PositiveIntegerField('Número', blank=True, null=True)
    cidade = models.CharField('Cidade', max_length=50, blank=True, null=True)
    bairro = models.CharField('Bairro', max_length=50, blank=True, null=True)
    estado = models.CharField('Estado', max_length=20, choices=STATE_CHOICES, blank=True, null=True)
    pais = models.CharField('Pais', max_length=20, blank=True, null=True)

    is_staff = models.BooleanField('É da equipe', default=False)

    created_at = models.DateTimeField('Criado em', auto_now_add=True, blank=True)
    updated_at = models.DateTimeField('Atualizado em', auto_now=True, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    objects = UserManager()

    class Meta:
        ordering = ['-id']
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

        permissions = [
            ("pode_cadastrar_usuario", "Pode configurar usuario"), \
            ("pode_acessar_painel_principal", "Pode visualizar o painel principal"), \
            ("pode_gerar_relatorios", "Pode gerar relatorios"), \
            ("pode_fazer_acionamentos", "Pode fazer acionamentos"), \
            ("pode_acessar_central_alarmes", "Pode acessar a central de alarmes"), \
            ("pode_editar_cadastro_tecnico", "Pode editar cadastro tecnico"), \
            ("pode_alterar_meta", "Pode alterar meta"), \
            ("pode_acessar_central_vazao", "Pode acessar a central de vazao"), \
            ("pode_acessar_central_bomba", "Pode acessar a central de bomba"), \
            ("pode_enviar_mensagem", "Pode enviar mensagem"), \
            ("pode_visualizar_relatorios", "Pode visualizar relatorios")
            ]

class Empreendimento(models.Model):
    HOSP = "HOSPITAL"
    HOTE = "HOTEL"
    RESI = "RESIDENCIAL"

    TIPO_CLASSIFICACAO_CHOICES = (
        (HOSP, "HOSPITAL"),
        (HOTE, "HOTEL"),
        (RESI, "RESIDENCIAL"),
    )

    STAN = "STANDARD"
    ULTR = "ULTRA"
    PREM = "PREMIUM"

    TIPO_SERVICO_CHOICES = (
        (STAN, "STANDARD"),
        (ULTR, "ULTRA"),
        (PREM, "PREMIUM"),
    )

    '''
    foto = models.ImageField('Foto', upload_to='user', default='user/2205256774854474505.jpg', blank='true')
    '''

    nomeEmpreendimento = models.CharField('Nome do Empreendimento', max_length=50)
    cnpj = models.IntegerField('CNPJ', unique=True, validators = [validators.MinValueValidator(0), validators.MaxValueValidator(99999999999999)])#, validators=[validar_cpf_cnpj])
    endereco = models.CharField('Endereço', max_length=100)
    numero = models.PositiveIntegerField('Número', blank=True, null=True)
    cidade = models.CharField('Cidade', max_length=50, blank=True, null=True)
    bairro = models.CharField('Bairro', max_length=50, blank=True, null=True)
    estado = models.CharField('Estado', max_length=20, choices=STATE_CHOICES, blank=True, null=True)
    pais = models.CharField('Pais', max_length=20, blank=True, null=True)
    matricula = models.CharField('Matrícula da Concessionária', max_length=20, unique=True)    
    #responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    responsavel = models.ManyToManyField(Usuario)
    cicloCobranca = models.DateField('Ciclo de Cobrança', default=timezone.now)
    tipo_classificacao = models.CharField('Classificação', max_length=20, choices=TIPO_CLASSIFICACAO_CHOICES)
    tipo_servico = models.CharField('Tipo de Serviço', max_length=20, choices=TIPO_SERVICO_CHOICES)
    qtdReservatorioInf = models.DecimalField('Quantidade do Reservatório Inferior', max_digits=10, decimal_places=2)
    qtdReservatorioSup = models.DecimalField('Quantidade do Reservatório Superior', max_digits=10, decimal_places=2)
    setValvula = models.BooleanField('Possui válvula de controle: ', default=False)
    qtdValvula = models.IntegerField('Quantidade de Válvula', default='0', validators = [validators.MinValueValidator(0), validators.MaxValueValidator(999)])
    volReservatorio = models.IntegerField('Volume dos Reservatórios', validators = [validators.MinValueValidator(0)])
    setAguaAlternativa = models.BooleanField('Tem água alternativa: ', default=False)
    qtdAguaAlternativa = models.DecimalField('Quantidade de Água Alternativa',max_digits=3, decimal_places=2, default='0',validators = [validators.MinValueValidator(0)])
    alturaReservatorio = models.DecimalField('Altura do Reservatório', max_digits=3, decimal_places=2, validators = [validators.MinValueValidator(0)])
    qtdPontosEntrada = models.IntegerField('Pontos de Entrada', validators = [validators.MinValueValidator(0)])
    qtdPontosConsumo = models.IntegerField('Pontos de Consumo', validators = [validators.MinValueValidator(0)])
    qtdUnidadeConsumidora = models.IntegerField('Quantidade de Unidade Consumidora', validators = [validators.MinValueValidator(0)])
    meta = models.DecimalField('Meta', max_digits=4, decimal_places=2, validators = [validators.MinValueValidator(0)])
    aguaAlternFornecida = models.DecimalField('Água Alternativa Fornecida', default=0, max_digits=5, decimal_places=2, validators = [validators.MinValueValidator(0)])
    
    
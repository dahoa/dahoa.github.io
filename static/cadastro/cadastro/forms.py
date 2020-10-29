from django import forms
from django.contrib import admin
from django.contrib.auth.models import Permission
from django.utils.translation import gettext as _
from django.contrib.auth.models import Group
from .models import Empreendimento, Usuario

class MyGroupAdminForm(forms.ModelForm):

    class Meta:
        model = Group
        fields = ('name', 'permissions')

    permissions = forms.ModelMultipleChoiceField(
        Permission.objects.exclude(content_type__app_label__in=['auth','admin','sessions','users','contenttypes']),
        widget=admin.widgets.FilteredSelectMultiple(_('permissions'), False))



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

class CadastroUsuarioForm(forms.ModelForm):
    permissions = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple,
                                          choices=permissions)

    class Meta:
        model = Usuario
        fields = '__all__'
        exclude = ('last_login','groups','is_superuser', 'user_permissions')

    field_order = ['tipo_pessoa', 'nome', 'username', 'password','rg', 'cpf', 'email', 'celular', 'telefone', 'endereco', 'numero', 'bairro','cidade','estado', 'pais', 'is_staff']

    
    def __init__(self, *args, **kwargs):
        super(CadastroUsuarioForm, self).__init__(*args, **kwargs)
        
        for name in self.fields.keys():
            self.fields[name].widget.attrs.update({
                'class': 'form-control',
            })
        self.fields['permissions'].widget.attrs['class'] = 'no-bullets'
        self.fields['permissions'].widget.attrs['style'] = ''
        
    
        

class CadastroEmpreendimentoForm(forms.ModelForm):

    class Meta:
        model = Empreendimento
        fields = '__all__'

    #field_order = ['tipo_pessoa', 'nome', 'username', 'password','rg', 'cpf', 'email', 'telefone', 'endereco', 'numero', 'bairro','cidade','estado', 'pais', 'is_staff','user_permissions']
    
    def __init__(self, *args, **kwargs):
        super(CadastroEmpreendimentoForm, self).__init__(*args, **kwargs)
        for name in self.fields.keys():
            self.fields[name].widget.attrs.update({
                'class': 'form-control',
            })
        '''
        self.fields['setValvula'].widget.attrs.update({
            'class':'custom-control-input '
        })
        '''
        
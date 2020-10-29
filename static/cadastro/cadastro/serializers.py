from rest_framework import serializers

from .models import Empreendimento, Usuario

#class EmpreendimentoSerializers(serializers.HyperlinkedModelSerializer):
class EmpreendimentoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Empreendimento
        fields = '__all__'

#class UsuarioSerializers(serializers.HyperlinkedModelSerializer):
class UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        #fields = ('nome', 'username', 'tipo_pessoa', 'rg', 'cpf', 'email', 'telefone', 'endereco', 'numero', 'cidade', 'bairro', 'estado', 'pais', 'is_staff')
from .models import *
from .forms import *
from rest_framework import viewsets

from .serializers import EmpreendimentoSerializers, UsuarioSerializers
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

import datetime
#from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
#from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render #, get_object_or_404, redirect
from django.utils import timezone
from django.views.generic import TemplateView, View
from django.contrib.auth import login, authenticate, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

#from django.contrib.auth.models import Usuario

# Create your views here.

class CadastrarEmpreendimento(View):
    def get(self, request):
        #if request.user.is_authenticated():
        form = CadastroEmpreendimentoForm()
        context = {'form': form}
        return render(request, "cadastro/empreendimento.html", context)
        
    
    def post(self, request):
        #empreendimento = Empreendimento.objects.filter()
        form = CadastroEmpreendimentoForm(request.POST or None)
        if form.is_valid():
            empreendimento = form.save(commit=False)
            empreendimento.save()
            return render(request, 'cadastro/empreendimento.html', {'form': form})

class CadastrarUsuario(View):
    def get(self, request):
        #if request.user.is_authenticated():
        form = CadastroUsuarioForm()
        context = {'form': form}
        return render(request, "cadastro/usuario.html", context)
        
    
    def post(self, request):
        #empreendimento = Empreendimento.objects.filter()
        form = CadastroUsuarioForm(request.POST or None)
        if form.is_valid():
            usuario = form.save(commit=False)
            u = Usuario.objects.create(tipo_pessoa = form.data['tipo_pessoa'], nome = form.data['nome'], username = form.data['username'], password = form.data['password'], rg = form.data['rg'], cpf = form.data['cpf'], email = form.data['email'], telefone = form.data['telefone'], endereco = form.data['endereco'], numero = form.data['numero'], bairro = form.data['bairro'], cidade = form.data['cidade'], estado = form.data['estado'], pais = form.data['pais'])
            perms = form.cleaned_data['permissions']
            print (perms)
            for perm in perms:
                print (perm)
                permission = Permission.objects.get(codename=perm)
                u.user_permissions.add(permission)            
            return render(request, 'cadastro/usuario.html', {'form': form})
        context = {'form': form}
        return render(request, "cadastro/cadastro.html", context)
    
    

class ListUsers(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    #authentication_classes = [authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in Usuario.objects.all()]
        return Response(usernames)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all().order_by('nome')
    serializer_class = UsuarioSerializers

class EmpreendimentoViewSet(viewsets.ModelViewSet):
    queryset = Empreendimento.objects.all().order_by('nome_empreendimento')
    serializer_class = EmpreendimentoSerializers


class UsuarioList(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializers
    permission_classes = [permissions.IsAuthenticated]


class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializers
    permission_classes = [permissions.IsAuthenticated]

class EmpreendimentoList(generics.ListCreateAPIView):
    queryset = Empreendimento.objects.all()
    serializer_class = EmpreendimentoSerializers
    permission_classes = [permissions.IsAuthenticated]


class EmpreendimentoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empreendimento.objects.all()
    serializer_class = EmpreendimentoSerializers
    permission_classes = [permissions.IsAuthenticated]

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)
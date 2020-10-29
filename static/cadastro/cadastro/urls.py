from django.contrib import admin
from django.urls import path, include
from . import views
from .views import *
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

#from django.contrib.auth import views as auth_views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'emp', views.EmpreendimentoViewSet)

urlpatterns = [
    path('empreendimento/', CadastrarEmpreendimento.as_view(), name='cadastroEmpreendimento'),
    path('usuarios/', CadastrarUsuario.as_view(), name='cadastroUsuario'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #path('empreendimento/', ListUsers.as_view()),
    path('api/usuarios/', UsuarioList.as_view()),
    path('api/usuarios/<int:pk>/', UsuarioDetail.as_view()),
    path('api/empreendimento/', EmpreendimentoList.as_view()),
    path('api/empreendimento/<int:pk>/', EmpreendimentoDetail.as_view()),
    path('sessao/', ExampleView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

from django.contrib import admin
from .forms import MyGroupAdminForm
from django.contrib.auth.models import Group
from .models import Empreendimento, Usuario

# Register your models here.

admin.site.register(Empreendimento)
admin.site.register(Usuario)
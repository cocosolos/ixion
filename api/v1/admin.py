from django.contrib import admin
from .models.server import Server


class ServerAdmin(admin.ModelAdmin):
    display = "url, settings, created, updated"


# Register your models here.

admin.site.register(Server, ServerAdmin)

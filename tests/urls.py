from django.urls import path, include
from saturn.admin import site as saturn

urlpatterns = [path('saturn/', saturn.urls)]

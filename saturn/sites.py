from django.apps import apps
from django.db.models.base import ModelBase
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import path, include, re_path, reverse
from django.utils.text import capfirst

from saturn.options import SaturnAdmin


class SaturnSite:
    def __init__(self):
        self._registry = {}
        self.name = "saturn"

    def register(self, model_or_iterable):
        if isinstance(model_or_iterable, ModelBase):
            model_or_iterable = [model_or_iterable]

        for model in model_or_iterable:
            self._registry[model] = SaturnAdmin(model)

    def index(self, request):
        return render(request, "saturn/index.html")

    def get_urls(self):
        urlpatterns = [
            path("", self.index, name="index"),
            path("api/registered/", self.list_registered, name='list_registered'),
        ]

        for model, model_admin in self._registry.items():
            urlpatterns += [path("api/", include(model_admin.urls))]

        # Delegate non-mapped paths to react-router.
        # This covers 404s and other error codes.
        urlpatterns += [re_path(r"^(?:.*)/?$", self.index)]
        return urlpatterns

    def list_registered(self, request):
        app_dict = {}
        for model, model_admin in self._registry.items():
            model_dict = {}
            app_label = model._meta.app_label
            model_dict['name'] = capfirst(model._meta.verbose_name_plural)
            model_dict['object_name'] = model._meta.object_name
            model_dict['perms'] = {"add": True, "change": True, "delete": True, "view": True}
            model_dict['admin_url'] = f"{reverse('saturn:index')}{app_label}/{model._meta.object_name.lower()}"
            model_dict['add_url'] = f"{reverse('saturn:index')}{app_label}/{model._meta.object_name.lower()}/add"

            # Taken from django/contrib/admin/sites.py
            if app_label in app_dict:
                app_dict[app_label]['models'].append(model_dict)
            else:
                app_dict[app_label] = {
                    'name': apps.get_app_config(app_label).verbose_name,
                    'app_label': app_label,
                    'app_url': f"{reverse('saturn:index')}{app_label}",
                    'has_module_perms': True,
                    'models': [model_dict],
                }

        response = list(app_dict.values())
        return JsonResponse(response, safe=False)

    @property
    def urls(self):
        return self.get_urls(), "saturn", self.name

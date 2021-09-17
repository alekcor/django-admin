from django.http import JsonResponse
from django.urls import path
from rest_framework import status
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class SaturnAdmin:
    list_display = None
    hidden_fields = ["id"]

    def __init__(self, model):
        self.model = model
        self.opts = model._meta
        self.name = self.opts.app_config.verbose_name
        self.app_label = self.opts.app_label
        self.model_name = self.opts.model_name
        self.queryset = self.model.objects.all()

    def base_model_serializer(self):
        class BaseModelAdminSerializer(ModelSerializer):
            list_display = SerializerMethodField()

            class Meta:
                model = self.model
                fields = "__all__"

            def get_list_display(self, obj):
                return str(obj) or self.list_display

        return BaseModelAdminSerializer

    def get_list_serializer(self):
        class ListModelSerializer(self.base_model_serializer()):
            list_display = SerializerMethodField()

            class Meta:
                model = self.model
                fields = "__all__"

            def get_list_display(self, obj):
                return str(obj) or self.list_display

        return ListModelSerializer

    def get_change_serializer(self):
        class ChangeModelSerializer(ModelSerializer):
            meta = SerializerMethodField()

            class Meta:
                model = self.model
                fields = "__all__"

            def get_meta(self, model=self.model):
                hidden_fields = ["id"]
                return {
                    field.name: field.__class__.__name__
                    for field in model._meta.get_fields()
                    if field.name not in hidden_fields
                }

        return ChangeModelSerializer

    def get_model_fields(self):
        return {
            field.name: field.__class__.__name__
            for field in self.model._meta.get_fields()
            if field.name not in self.hidden_fields
        }

    def changelist_api_view(self):
        model = self.model

        class ChangeListAPIView(ListCreateAPIView):
            serializer_class = self.get_list_serializer()
            queryset = self.queryset

            def delete(self, request):
                model_ids = JSONParser().parse(request)

                instance = model.objects.filter(
                    id__in=model_ids.get("selectedKeys", [])
                )
                if instance:
                    instance.delete()
                    return JsonResponse({"status": "ok"}, status=status.HTTP_200_OK)

        return ChangeListAPIView

    def change_api_view(self):
        class ChangeAPIView(RetrieveUpdateDestroyAPIView):
            serializer_class = self.get_change_serializer()
            queryset = self.queryset
            lookup_url_kwarg = "id"

        return ChangeAPIView

    def add_api_view(self):
        change_model_serializer = self.get_change_serializer()

        class AddView(CreateAPIView):
            serializer_class = change_model_serializer

            def get(self, request, get_model_fields=self.get_model_fields):
                fields = get_model_fields()
                return Response({"meta": fields})

        return AddView

    @property
    def urls(self):
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(
                f"{app_label}/{model_name}/",
                self.changelist_api_view().as_view(),
                name=f"{app_label}_{model_name}_changelist",
            ),
            path(
                f"{app_label}/{model_name}/<int:id>/change/",
                self.change_api_view().as_view(),
                name=f"{app_label}_{model_name}_change",
            ),
            path(
                f"{app_label}/{model_name}/add/",
                self.add_api_view().as_view(),
                name=f"{app_label}_{model_name}_add"
            ),

        ]

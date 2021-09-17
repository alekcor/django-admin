import pytest
from django.urls import URLPattern

from saturn.options import SaturnAdmin
from .models import TheModel
from rest_framework.serializers import SerializerMetaclass

the_object = TheModel()
saturn_admin = SaturnAdmin(TheModel)


def test_can_instantiate_saturn_admin():
    assert saturn_admin


def test_model_admin_urls():
    """
    An instance of SaturnAdmin must have a url property returning a list of url patterns.
    """
    route = saturn_admin.urls[0]
    assert isinstance(route, URLPattern)


def test_base_model_serializer():
    """
    An instance of ModelAdmin must be able to serialize its associated model data.
    """
    assert isinstance(saturn_admin.base_model_serializer(), SerializerMetaclass)


def test_model_admin_serializer_model():
    """
    An instance of ModelAdminSerializer must dynamically build around the registered model.
    """
    assert saturn_admin.base_model_serializer().Meta.model == TheModel


@pytest.mark.parametrize("meta_field", ["char_field"])
def test_get_change_serializer_meta(meta_field):
    """
    An instance of ChangeModelSerializer must serialize meta information about the model so each field can be mapped
    to its respective widget.
    """
    serializer = saturn_admin.get_change_serializer()
    meta = serializer(the_object).data.get("meta")
    assert meta[meta_field]


def test_id_not_listed_as_meta_fields():
    """
    ID should not be editable.
    """
    serializer = saturn_admin.get_change_serializer()
    meta = serializer(the_object).data.get("meta")
    with pytest.raises(KeyError):
        assert meta["id"]

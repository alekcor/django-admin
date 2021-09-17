import pytest

from saturn.admin import site as saturn_admin
from tests.models import TheModel

saturn_admin.register([TheModel])


@pytest.mark.parametrize("field", [b"list_display", b"char_field"])
def test_changelist_api_view(db, client, field):
    TheModel.objects.create(char_field="Some Text")
    response = client.get("/saturn/api/tests/themodel/")
    assert field in response.content

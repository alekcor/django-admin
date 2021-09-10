def test_dummy_api_get(client):
    resp = client.get('/api/')
    assert resp.status_code == 200


def test_dummy_user_api_get(client):
    resp = client.get('/api/users/')
    assert resp.status_code == 200

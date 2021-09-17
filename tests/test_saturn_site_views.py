from saturn.sites import SaturnSite

saturn_site = SaturnSite()


def test_index_view(rf):
    """
    Site's index view must return 200.
    """
    request = rf.get("/")
    response = saturn_site.index(request)
    assert response.status_code == 200

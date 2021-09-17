from django.contrib.auth.models import User, Group
from .sites import SaturnSite


site = SaturnSite()
site.register([User, Group])

from django.db import models


class TheModel(models.Model):
    char_field = models.CharField(max_length=255)


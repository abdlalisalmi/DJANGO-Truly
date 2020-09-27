from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def default_avatar():
    return os.path.join(BASE_DIR, 'truly/static/img/user.svg')


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    avatar = models.ImageField(
        upload_to='users/avatars', null=True, blank=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    boi = models.CharField(max_length=500, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    # Social media websites
    facebook = models.URLField(max_length=255, null=True, blank=True)
    instagram = models.URLField(max_length=255, null=True, blank=True)
    twitter = models.URLField(max_length=255, null=True, blank=True)

    # Settings
    visible = models.BooleanField(default=True)
    disable = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return '/account/{}/'.format(self.user.username)


@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)

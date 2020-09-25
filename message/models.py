from django.db import models
from account.models import Account


class Message(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    has_been_read = models.BooleanField(default=False)

    def __str__(self):
        return self.account.user.username

# Generated by Django 2.2.16 on 2020-09-24 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_remove_account_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='disable',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='visible',
            field=models.BooleanField(default=True),
        ),
    ]

# Generated by Django 2.2.16 on 2020-09-24 08:40

import account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_auto_20200924_0750'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='avatar',
            field=models.ImageField(blank=True, default=account.models.default_avatar, null=True, upload_to='users/avatars'),
        ),
    ]

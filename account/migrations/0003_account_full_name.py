# Generated by Django 2.2.16 on 2020-09-22 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20200919_2028'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='full_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]

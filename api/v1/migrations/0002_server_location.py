# Generated by Django 5.0.4 on 2024-04-22 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='server',
            name='location',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
    ]

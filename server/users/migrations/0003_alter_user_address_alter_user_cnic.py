# Generated by Django 4.2.13 on 2024-05-23 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='cnic',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]

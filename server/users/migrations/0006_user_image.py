# Generated by Django 4.2.13 on 2024-05-23 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(default='None', upload_to='users'),
        ),
    ]

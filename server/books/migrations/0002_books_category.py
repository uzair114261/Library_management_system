# Generated by Django 4.2.13 on 2024-05-25 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='books',
            name='category',
            field=models.CharField(default='Business', max_length=100),
        ),
    ]

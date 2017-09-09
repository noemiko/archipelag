# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-09 03:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=120)),
                ('category', models.CharField(choices=[('FB', 'Facebook'), ('IP', 'Informacja Prasowa'), ('NEWS', 'Newsletter'), ('INST', 'Instagram'), ('TW', 'Twitter'), ('SMS', 'SMS Kiss')], default='FB', max_length=4)),
                ('url', models.URLField(null=True)),
                ('date_starting', models.DateField()),
                ('date_ending', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('shares', models.PositiveIntegerField()),
            ],
        ),
    ]
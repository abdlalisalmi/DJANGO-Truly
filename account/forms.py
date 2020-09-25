from django import forms
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from .models import Account


class RegistrationForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.required:
            self.fields[field].required = True

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        required = ('username', 'password', 'email')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=self.cleaned_data['email']).exists():
            raise forms.ValidationError("Email already exists")
        return email

    def save(self):
        user = User(
            username=self.cleaned_data['username'],
            email=self.clean_email()
        )
        user.set_password(self.cleaned_data['password'])
        user.save()
        return user


class EditProfileForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['user', 'avatar', 'full_name', 'boi',
                  'date_of_birth', 'facebook', 'instagram', 'twitter']

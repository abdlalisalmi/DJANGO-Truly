from django.forms import ModelForm
from .models import ContactUS


class ContactUSForm(ModelForm):
    class Meta:
        model = ContactUS
        fields = '__all__'

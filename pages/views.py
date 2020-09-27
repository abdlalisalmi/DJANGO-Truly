from django.shortcuts import render
from django.http import JsonResponse
from .models import ContactUS
from .forms import ContactUSForm

from django.conf import settings
from django.core.mail import send_mail


def email_send(data):
    subject = '[Truly] : Mail from {}'.format(data['full_name'])
    message = '{}\nSender Email: {}'.format(data['message'], data['email'])
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [settings.EMAIL_HOST_USER, ]
    send_mail(subject, message, email_from, recipient_list)


def about_us(request):
    template_name = 'about_us.html'
    context = {}
    return render(request, template_name, context)


def contact_us(request):
    template_name = 'contact_us.html'
    context = {}

    if request.method == 'POST':
        form = ContactUSForm(request.POST)
        if form.is_valid():
            form.save(commit=False)
            data = {
                'full_name': request.POST['full_name'],
                'email': request.POST['email'],
                'message': request.POST['message']
            }
            email_send(data)
            form.save()

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})

    return render(request, template_name, context)

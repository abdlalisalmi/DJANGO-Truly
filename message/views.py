from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.views import login_required
from django.contrib.auth.models import User

from .models import Message

from account.models import Account


@login_required(login_url='account:login')
def messages(request):
    template_name = 'messages.html'

    if request.method == 'POST':
        if request.POST.get('read_id', False):
            id = int(request.POST['read_id'])
            ms = Message.objects.get(id=id)
            if not ms.has_been_read:
                ms.has_been_read = True
                ms.save()
                ac = Account.objects.get(user=request.user)
                not_read_ms = Message.objects.filter(
                    account=ac,
                    has_been_read=False).count()
                print(not_read_ms)
                return JsonResponse({
                    'statu': 'success',
                    'is_last': not_read_ms == 0
                })
            return JsonResponse({'statu': 'Already read'})

        if request.POST.get('id', False):
            id = int(request.POST['id'])
            ms = Message.objects.get(id=id)
            print(ms.message)
            ms.delete()
            return JsonResponse({'statu': 'success', 'msg': 'the message has been deleted.'})

    ac = Account.objects.get(user=request.user)

    messages = Message.objects.filter(account=ac).order_by('-date')
    # message = Message.objects.first()
    context = {
        'messages': messages,
        # 'message': message
    }
    return render(request, template_name, context)


def messageMaker(request, username):
    template_name = 'message_maker.html'
    context = {}

    if request.method == 'POST':
        message = request.POST.get('message', False)
        if message:
            user = get_object_or_404(User, username=username)
            account = get_object_or_404(Account, user=user)
            ms = Message()
            ms.account = account
            ms.message = message
            ms.save()
            return JsonResponse({'statu': 'success'})

    user = get_object_or_404(User, username=username)
    account = get_object_or_404(Account, user=user)

    context.update({'user_reciver': account})
    return render(request, template_name, context)


def new_messages_check(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            ac = Account.objects.get(user=request.user)
            ms = Message.objects.filter(account=ac,
                                        has_been_read=False).count()
            if ms > 0:
                return JsonResponse({'messages': True, 'numbre_of_messages': ms})
            return JsonResponse({'messages': False})

        else:
            return JsonResponse({'error': 'just POST method is allowed.'})
    return JsonResponse({'error': 'You are not authenticated.'})

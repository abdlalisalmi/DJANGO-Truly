from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, views
from django.contrib.auth import login as login_user
from django.contrib.auth import logout as logout_user

from .models import Account
from .forms import RegistrationForm

from message.models import Message


def register(request):
    template_name = 'register.html'

    if request.user.is_authenticated:
        return redirect('homePage')

    if request.method == 'POST':
        form = RegistrationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            login_user(request, user)
            return redirect('homePage')

        return render(request, template_name, {'form': form})

    form = RegistrationForm()
    return render(request, template_name, {'form': form})


def login(request):
    template_name = 'login.html'

    if request.user.is_authenticated:
        return redirect('homePage')

    if request.method == 'POST':
        user = authenticate(
            username=request.POST['username'],
            password=request.POST['password']
        )
        if user:
            login_user(request, user)
            return redirect('homePage')
        return render(request, template_name, {'error': 'The username and password you entered did not match our records. Please double-check and try again.'})

    return render(request, template_name)


@views.login_required(login_url='account:login')
def logout(request):
    if request.method == 'POST':
        logout_user(request)
        return redirect('account:login')
    return redirect('account:login')


@views.login_required(login_url='account:login')
def profile(request):
    template_name = 'profile.html'

    if request.method == 'POST':
        if request.FILES['avatar']:
            account = Account.objects.get(user=request.user)
            account.avatar = request.FILES['avatar']
            account.save()
            return redirect('account:profile')

        name = request.POST['full_name']
        date_of_birth = request.POST['date_of_birth']
        boi = request.POST['boi']
        email = request.POST['email']
        facebook = request.POST['facebook']
        instagram = request.POST['instagram']
        twitter = request.POST['twitter']

        if User.objects.filter(email=email).exclude(username__iexact=request.user.username).exists():
            return JsonResponse({'email': 'Email already exists'})

        user = User.objects.get(username=request.user)
        user.email = email
        user.save()

        account = Account.objects.get(user=request.user)
        account.full_name = name
        account.boi = boi
        account.facebook = facebook
        account.instagram = instagram
        account.twitter = twitter
        account.date_of_birth = date_of_birth
        account.save()

        return JsonResponse({'success': True})

    user = Account.objects.get(user=request.user)
    numbre_ms = Message.objects.filter(account=user).count()
    context = {
        'user': user,
        'numbre_ms': numbre_ms
    }
    return render(request, template_name, context)


@views.login_required(login_url='account:login')
def settings(request):
    template_name = 'settings.html'

    if request.method == 'POST':
        account = Account.objects.get(user=request.user)
        if request.POST['type'] == 'visible':
            account.visible = not account.visible
            account.save()
            return JsonResponse({'success': True})

        if request.POST['type'] == 'disable':
            account.disable = not account.disable
            account.save()
            return JsonResponse({'success': True})

    elif request.method == 'DELETE':
        account = Account.objects.get(user=request.user)
        account.delete()
        account.save()
        return JsonResponse({'success': True})

    user = Account.objects.get(user=request.user)
    context = {'user': user}
    return render(request, template_name, context)


def search(request):
    template_name = 'search.html'
    context = {}

    if request.method == 'POST':
        search = request.POST.get('search', False)
        if search:
            users = User.objects.filter(username__contains=search)
            accounts = []
            for user in users:
                accounts.append(Account.objects.get(user=user))
            context.update(
                {
                    'search': search,
                    'accounts': accounts
                }
            )

    return render(request, template_name, context)


def profile_visit(request, account):
    template_name = 'profile_visit.html'

    user = get_object_or_404(User, username=account)
    account = Account.objects.get(user=user)
    context = {'account': account}
    return render(request, template_name, context)

from django.shortcuts import render, redirect


def HomePage(request):
    template_name = 'homePage.html'
    if request.user.is_authenticated:
        return redirect('account:profile')
    context = {}
    return render(request, template_name, context)


def handler404(request, exception=None):
    return render(request, '404.html', status=404)

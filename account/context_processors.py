from .models import Account


def all_account_context_processors(request):
    data = {}
    if request.user.is_authenticated:
        account = Account.objects.get(user=request.user)

        data.update({
            'user': account,
        })

    return data

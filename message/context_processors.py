from .models import Message
from account.models import Account


def all_messages_context_processors(request):
    data = {}
    if request.user.is_authenticated:
        ac = Account.objects.get(user=request.user)
        messages = Message.objects.filter(account=ac)
        unread_messages = Message.objects.filter(
            account=ac, has_been_read=False).count()

        data.update({
            'unread_messages': unread_messages,
        })

    return data

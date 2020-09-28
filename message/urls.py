from django.urls import path
from .views import (
    messages,
    messageMaker,
    new_messages_check
)


app_name = 'message'
urlpatterns = [
    path('messages/', messages, name='messages'),
    path('message/<str:username>/', messageMaker, name='messageMaker'),
    path('messages/check/', new_messages_check, name='new_essages_check'),

]

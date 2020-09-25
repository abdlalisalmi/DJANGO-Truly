from django.urls import path
from .views import (
    messages,
    messageMaker
)


app_name = 'message'
urlpatterns = [
    path('messages/', messages, name='messages'),
    path('message/<str:username>/', messageMaker, name='messageMaker'),

]

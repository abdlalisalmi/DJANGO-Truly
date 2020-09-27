from django.urls import path
from .views import (
    register,
    login,
    logout,
    profile,
    settings,
    search,
    profile_visit
)


app_name = 'account'
urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('admin/login/', login),
    path('logout/', logout, name='logout'),

    path('profile/', profile, name='profile'),
    path('settings/', settings, name='settings'),

    path('search/', search, name='search'),
    path('account/<str:account>/', profile_visit, name='profile_visit'),

]

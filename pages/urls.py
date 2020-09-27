from django.urls import path
from .views import about_us, contact_us


app_name = 'pages'
urlpatterns = [
    path('about-us/', about_us, name="about_us"),
    path('contact-us/', contact_us, name="contact_us"),
]

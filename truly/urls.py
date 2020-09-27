from django.contrib import admin
from django.urls import path, include
from .views import HomePage, handler404

from django.conf import settings
from django.conf.urls.static import static

handler404 = handler404

urlpatterns = [
    path('', HomePage, name='homePage'),

    path('', include('pages.urls')),

    path('', include('account.urls')),

    path('', include('message.urls')),


    path('admin/', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

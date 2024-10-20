from django.urls import path
from . import views


app_name = 'api_rest'

urlpatterns = [
    path('products/', views.get_products, name='get_products'),
]

"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path, re_path
# from CustomerApp import views
# from ProductApp import views
# # urlpatterns = [
# #     path('customer/', views.customerApi),  # Handles requests to /customer
# #     re_path(r'^customer/([0-9]+)$', views.customerApi),  # Handles requests to /customer/<id>
# #     # path('edit/<int:guest_id>/', GuestEdit.as_view(), name='edit_guest'),
# #     path('admin/', admin.site.urls),  # Admin panel URL
# # ]

# urlpatterns = [
#     path('customer/', views.customerApi),  # Handles requests to /customer
#     re_path(r'^customer/(?P<id>[0-9]+)$', views.customerApi),  # Handles requests to /customer/<id>
#     path('product/',views.productApi),
#     path('admin/', admin.site.urls) # Admin panel URL
# ]

from django.contrib import admin
from django.urls import path, re_path
from CustomerApp import views as customer_views  # Alias for CustomerApp views
from ProductApp import views as product_views   # Alias for ProductApp views
from PurchaseApp import views as purchase_views

urlpatterns = [
    path('customer/', customer_views.customerApi),  # Handles requests to /customer
    re_path(r'^customer/(?P<id>[0-9]+)$', customer_views.customerApi),  # Handles requests to /customer/<id>
    
    path('product/', product_views.productApi),  # Handles requests to /product
    re_path(r'^product/(?P<id>[0-9]+)$', product_views.productApi),
    
    path('purchase/', purchase_views.PurchaseApi), 
    re_path(r'^purchase/(?P<id>[0-9]+)$',  purchase_views.PurchaseApi),
    
    
    path('admin/', admin.site.urls) # Admin panel URL
]

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from ProductApp.models import Product
from ProductApp.serializers import ProductSerializer
# Create your views here.

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def productApi(request, id=0):
    if request.method == 'GET':
        if id:  # If an id is provided in the URL
            try:
                product = Product.objects.get(pk=id)  # Singular name for clarity
            except Product.DoesNotExist:
                return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
            product_serializer = ProductSerializer(product)
            return Response(product_serializer.data, status=status.HTTP_200_OK)
        else:  # If no id is provided, fetch all products
            products = Product.objects.all()
            product_serializer = ProductSerializer(products, many=True)
            return Response(product_serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # Parse request data
        if 'PurchaseItem' in request.data and request.data['PurchaseItem'] is True:
            products = Product.objects.all()
            product_list = [
            {"id": product.id, "name": product.name, "price": float(product.price)} for product in products
            ]
            return JsonResponse(product_list, safe=False)
        else:
            product_serializer = ProductSerializer(data=request.data)
            if product_serializer.is_valid():
                product_serializer.save()
                return JsonResponse(product_serializer.data,status=201)
            return JsonResponse(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
    # Check if the ID is provided
        if not id:
            return Response({"error": "Product ID is required for deletion"}, status=status.HTTP_400_BAD_REQUEST)

        try:
        # Get the customer by ID
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # Delete the customer
        product.delete()
        return JsonResponse({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)

    #for update
    elif request.method == 'PUT':
        if not id:
            return JsonResponse({"message": "Product ID is required in the URL"}, safe=False, status=400)

        # Parse incoming JSON data
        product_data = JSONParser().parse(request)
        
        try:
            # Fetch customer by ID from the database
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return JsonResponse({"message": "Product not found"}, safe=False, status=404)
        
        # Update customer instance using the serializer
        product_serializer = ProductSerializer(product, data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse({"message": "Product updated successfully"}, safe=False, status=200)
        
        # Return validation errors
        return JsonResponse({"message": "Failed to update product", "errors": product_serializer.errors}, safe=False, status=400)









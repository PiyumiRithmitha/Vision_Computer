from django.shortcuts import render
from .models import Purchase
from ProductApp.models import Product
from CustomerApp.models import Customer
import json
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def PurchaseApi(request,id=None):
    if request.method == "POST":
        try:
            # Parse request data
            data = json.loads(request.body)
            product_id = data.get("product_id")
            quantity = data.get("quantity")
            email = data.get("email")

            # Validate required fields
            if not all([product_id, quantity, email]):
                return JsonResponse({"error": "Missing required fields"}, status=400)

            # Fetch customer
            customer = Customer.objects.filter(email=email).first()
            if not customer:
                return JsonResponse({"error": "Customer not found"}, status=400)

            # Fetch product
            product = Product.objects.filter(id=product_id).first()
            if not product:
                return JsonResponse({"error": "Product not found"}, status=400)

            # Calculate total price and ensure quantity is valid
            if quantity <= 0:
                return JsonResponse({"error": "Quantity must be greater than 0"}, status=400)

            total_price = product.price * quantity

            # Create the purchase
            purchase = Purchase.objects.create(
                customer=customer,
                product_name=product.name,
                quantity=quantity,
                
                price=product.price,  # Pass the price of the individual product
                total_price=total_price,  # Total price for the purchase
                email=email,
            )

            return JsonResponse({"message": "Purchase created successfully", "purchase_id": purchase.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)


    elif request.method == "GET":
        email = request.GET.get('email') 
        if id:  # If an ID is provided, get a single purchase
            try:
                purchase = Purchase.objects.get(id=id)
                purchase_data = {
                    "id": purchase.id,
                    "product_name": purchase.product_name,
                    "quantity": purchase.quantity,
                    "price": float(purchase.price),
                    "email": purchase.email,
                    "total_price": float(purchase.total_price)
                }
                return JsonResponse(purchase_data, safe=False, status=200)
            except Purchase.DoesNotExist:
                return JsonResponse({"error": "Purchase not found"}, status=404)
        
        
        elif email:  # If an email is provided, return all purchases for that email
            purchases = Purchase.objects.filter(email=email)
            if not purchases.exists():
                return JsonResponse({"message": "No purchases found for this email"}, status=404)

            purchase_data = [
                {
                    "id": purchase.id,  
                    "product_name": purchase.product_name,
                    "quantity": purchase.quantity,
                    "price": float(purchase.price),
                    "email": purchase.email,
                    "total_price": float(purchase.total_price),
                }
                for purchase in purchases
            ]
            return JsonResponse(purchase_data, safe=False, status=200)
            
        else:  # If no ID, return all purchases
            purchases = Purchase.objects.all()
            if not purchases.exists():
                return JsonResponse({"message": "No purchases found"}, safe=False, status=404)

            purchase_data = [
                {
                    "id": purchase.id,
                    "product_name": purchase.product_name,
                    "quantity": purchase.quantity,
                    "price": float(purchase.price),
                    "email": purchase.email,
                    "total_price": float(purchase.total_price)
                }
                for purchase in purchases
            ]
            return JsonResponse(purchase_data, safe=False, status=200)

            
    elif request.method == 'DELETE':
        # Check if the ID is provided
        if not id:
            return JsonResponse({"error": "Purchase ID is required for deletion"}, status=400)

        try:
            # Fetch the purchase by ID
            purchase = Purchase.objects.get(id=id)
        except Purchase.DoesNotExist:
            return JsonResponse({"error": "Purchase not found"}, status=404)

        # Delete the purchase
        purchase.delete()
        return JsonResponse({"message": "Purchase deleted successfully"}, status=200)






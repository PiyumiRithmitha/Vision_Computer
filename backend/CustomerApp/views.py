from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from CustomerApp.models import Customer
from CustomerApp.serializers import CustomerSerializer,loginSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def customerApi(request, id=0):
    
    if request.method == 'GET':
        # if 'login' in request.data and request.data['login'] is True:
        #         serializer = loginSerializer(data=request.data)
        #         serializer.is_valid(raise_exception=True)
        #         customer = serializer.validated_data['data']

        #         return Response(
        #             {
        #                 "customer": {
        #                     "CId": customer.CId,
        #                     "first_name": customer.first_name,
        #                     "last_name": customer.last_name,
        #                     "email": customer.email,
        #                     "phone_number": customer.phone_number,
        #                     "address": customer.address,
        #                     "roll": customer.roll,

        #                 },
        #             },
        #             status=status.HTTP_200_OK,
        #         )
        # else:
            if id:  # If an id is provided in the URL
                try:
                    customer = Customer.objects.get(pk=id)
                except Customer.DoesNotExist:
                    return JsonResponse({"message": "Customer not found"}, safe=False, status=404)
                customer_serializer = CustomerSerializer(customer)
                return JsonResponse(customer_serializer.data, safe=False, status=200)
            else:  # If no id is provided, fetch all customers
                customers = Customer.objects.all()
                if not customers.exists():
                    return JsonResponse({"message": "No customers found"}, safe=False, status=404)
                customer_serializer = CustomerSerializer(customers, many=True)
                return JsonResponse(customer_serializer.data, safe=False, status=200)

    elif request.method == 'POST':
        if 'login' in request.data and request.data['login'] is True:
            # Authenticate user
            serializer = loginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            customer = serializer.validated_data['customer']

            return JsonResponse(
                {
                    "customer": {
                        "CId": customer.CId,
                        "first_name": customer.first_name,
                        "last_name": customer.last_name,
                        "email": customer.email,
                        "phone_number": customer.phone_number,
                        "address": customer.address,
                        "roll": customer.roll,
                    }
                },
                status=200,
            )
        
        else:
            # Create a new customer
            customer_serializer = CustomerSerializer(data=request.data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                return JsonResponse(customer_serializer.data, status=201)
            return JsonResponse(customer_serializer.errors, status=400)

        
    elif request.method == 'PUT':
        if 'updated' in request.data and request.data['updated'] == False:
            if not id:
                return JsonResponse({"message": "Customer ID is required in the URL"}, safe=False, status=400)
            # Parse incoming JSON data
            customer_data = request.data  # Using DRF's automatic parsing

            try:
                # Fetch customer by ID from the database
                customer = Customer.objects.get(CId=id)
            except Customer.DoesNotExist:
                return JsonResponse({"message": "Customer not found"}, safe=False, status=404)
            
            # Update customer instance using the serializer
            customer_serializer = CustomerSerializer(customer, data=customer_data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                return JsonResponse({"message": "Customer updated successfully"}, safe=False, status=200)
            
            # Return validation errors
            return JsonResponse({"message": "Failed to update customer", "errors": customer_serializer.errors}, safe=False, status=400)
        else:
            # If we reach here, it means updated is not False or missing
            print("updated field is not False or missing.")
            customer_data = request.data  # Using DRF's automatic parsing

            try:
                # Fetch customer by ID from the database
                customer = Customer.objects.get(CId=id)
            except Customer.DoesNotExist:
                return JsonResponse({"message": "Customer not found"}, safe=False, status=404)
            
            # Update customer instance using the serializer
            customer_serializer = CustomerSerializer(customer, data=customer_data)
            if customer_serializer.is_valid():
                customer_serializer.save()
                return JsonResponse({"message": "Customer updated successfully"}, safe=False, status=200)
        
            
    elif request.method == 'DELETE':
        # Check if the ID is provided
        if not id:
            return JsonResponse({"error": "Customer ID is required for deletion"}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            # Get the customer by ID
            customer = Customer.objects.get(CId=id)
        except Customer.DoesNotExist:
            return JsonResponse({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the customer
        customer.delete()
        return JsonResponse({"message": "Customer deleted successfully"}, status=status.HTTP_200_OK)

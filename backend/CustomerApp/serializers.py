from rest_framework import serializers
from CustomerApp.models import Customer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields =  '__all__'

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email field is required.")
        return value

    def validate_phone_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        return value

    def create(self, validated_data):
        password=validated_data.pop('password')
        validated_data['password']=make_password(password)
        return Customer.objects.create(**validated_data)
    
class loginSerializer(serializers.Serializer):
    email=serializers.EmailField(required=True)
    password=serializers.CharField(required=True)

    def validate(self, data):
        try:
            customer=Customer.objects.get(email=data["email"])
        except Customer.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")
        
        if not check_password(data['password'],customer.password):
            raise serializers.ValidationError("Invalid email or password")
        

        data['customer'] = customer
        return data
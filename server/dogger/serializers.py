from django.contrib.auth import authenticate, password_validation
from django.core.validators import RegexValidator
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
# from django.contrib.auth.models import User


from dogger.models import *


class UserModelSerialzer(serializers.ModelSerializer):
  class Meta:
      model = Users
      fields=('first_name','last_name')
      depth = 1
class UserSerializer(serializers.Serializer):

    email=serializers.EmailField()
    password=serializers.CharField(min_length=8, max_length=64)

    def validate(self, data):
        """Validate credentials"""
        user= authenticate(username=data['email'],password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        self.context['user'] = user
        return data
    
    def create(self, data):
        token, created= Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key
class UserSignUpSerializer(serializers.Serializer):

    email=serializers.EmailField(
      validators=[
        UniqueValidator(queryset=Users.objects.all(), message="A user with that email already exists.")
      ]
    )

    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +999999999. Up to 15 digits allowed."
    )
    phone_number = serializers.CharField(validators=[phone_regex])
    password=serializers.CharField(min_length=8, max_length=64)
    password_confirmation=serializers.CharField(min_length=8, max_length=64)

    address = serializers.CharField(min_length=2, max_length=150, required=False)
    first_name = serializers.CharField(min_length=2, max_length=30)
    last_name = serializers.CharField(min_length=2, max_length=30)
    is_owner = serializers.BooleanField(default=False)
    is_walker = serializers.BooleanField(default=False)

    def validate(self, data):
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Passwords don't match.")
        password_validation.validate_password(passwd)
        return data

    def create(self, data):
        data.pop('password_confirmation')
        data['username'] = data['email']
        if data['is_owner']:
          data['is_owner'] = data['is_owner']
        else:
          data['is_walker'] = True
        user = Users.objects.create_user(**data)
        return user


class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dogs
        fields = '__all__'
        depth = 1

class DogSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogSize
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = '__all__'
        depth = 1

class ScheduledWalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledWalks
        fields = '__all__'
        depth = 3

class WalkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetWalkers
        fields = '__all__'
        depth = 5

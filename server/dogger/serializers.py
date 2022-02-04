from django.contrib.auth.models import User
from rest_framework import serializers
from dogger.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        depth = 1

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

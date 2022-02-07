from django.contrib.auth import authenticate, password_validation
from django.core.validators import RegexValidator
from django.forms import CharField
from django.db.models import F
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
# from django.contrib.auth.models import User
from django.http import Http404


from dogger.models import *


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = '__all__'
        depth = 1

class UserModelSerialzer(serializers.ModelSerializer):
  class Meta:
      model = Users
      fields=('id','first_name','last_name', 'is_owner', 'is_walker')
      depth = 1

class WalkerSerializer(serializers.ModelSerializer):
    walker = UserModelSerialzer(read_only=True)
    schedules = ScheduleSerializer(many=True, read_only=True)
    status = serializers.SerializerMethodField("status_method")
    dogs = serializers.SerializerMethodField("dogs_method")

    def status_method(self, obj):
        schedules = obj.schedules.all()
        if len(schedules) == 0:
          return True
        return False

    def dogs_method(self, obj):
        dogs = Dogs.objects.filter(walker=obj).values()
        return dogs
    class Meta:
        model = PetWalkers
        fields = ['id', 'walker','schedules', 'status','dogs']

class WalkerDogSerializer(serializers.ModelSerializer):
    walker = UserModelSerialzer(read_only=True)
    schedules = ScheduleSerializer(many=True, read_only=True)
    class Meta:
        model = PetWalkers
        fields = ['walker', 'schedules']
class DogsModelSerialzer(serializers.ModelSerializer):
  size = serializers.StringRelatedField()
  breed = serializers.StringRelatedField()
  walker = WalkerDogSerializer(read_only=True)
  class Meta:
      model = Dogs
      fields=('id','name','size','age', 'breed','walker')
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
        walker = PetWalkers.objects.create(walker=user)
        return user

class DogSerializer(serializers.Serializer):
    owner_id = serializers.IntegerField(required=False)
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(min_length=2, max_length=30, required=False)
    age = serializers.IntegerField(required=False)
    breed = serializers.CharField(min_length=2, max_length=30,required=False)
    size = serializers.CharField(min_length=2, max_length=10,required=False)
    walker_id = serializers.IntegerField(required=False)
    schedule_id = serializers.IntegerField(required=False)

    def create(self, validated_data):
        validated_data['owner'] = Users.objects.get(pk=validated_data['owner_id'])
        validated_data['size'] = DogSize.objects.get(size=validated_data['size'])
        try:
          validated_data['breed'] = DogBreed.objects.get(name=validated_data['breed'])
        except DogBreed.DoesNotExist:
          raise serializers.ValidationError({'message': 'Invalid data'})
        dog = Dogs.objects.create(**validated_data)
        return dog
    
    def update(self,instance,validated_data):
        if 'walker_id' in validated_data:
          try:
            schedules_walkers = ScheduledWalks.objects.filter(schedule=validated_data['schedule_id'])
            schedule = Schedules.objects.get(pk=validated_data['schedule_id'])
            schedule_size = schedule.size
            
            validated_data['schedule'] = schedule
            if schedule_size is not None:
              if schedule_size != instance.size:
                raise serializers.ValidationError({'message': 'Este paseador establecio un tamaño diferente de perro para esta hora'})
            if len(schedules_walkers) > 3:
              raise serializers.ValidationError({'message': 'Este paseador no cuenta con este horario disponible, favor de seleccionar otro horario o fecha'})
          except Schedules.DoesNotExist:
            raise Http404
          try:
            validated_data['walker'] = PetWalkers.objects.get(pk=validated_data['walker_id'])
          except PetWalkers.DoesNotExist:
            raise Http404
          instance.walker  = validated_data.get("walker", instance.walker)
          schedule_walker = ScheduledWalks.objects.create(schedule=validated_data['schedule'], dog=instance)
        if 'size' in validated_data:
          validated_data['size'] = DogSize.objects.get(size=validated_data['size'])
          instance.size = validated_data.get("size", instance.size)
        if 'breed' in validated_data:
          validated_data['breed'] = DogBreed.objects.get(name=validated_data['breed'])
          instance.breed = validated_data.get("breed", instance.breed)
        instance.name = validated_data.get("name", instance.name)
        instance.age = validated_data.get("age", instance.age)
        instance.save()

        return instance
    
class DogSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogSize
        fields = '__all__'

class DogsSerialzer(serializers.ModelSerializer):
  size = serializers.StringRelatedField()
  breed = serializers.StringRelatedField()
  schedule = serializers.SerializerMethodField("schedule_method")

  def schedule_method(self, obj):
      schedule = ScheduledWalks.objects.filter(dog=obj).annotate(day=F('schedule__day_of_week'), hour=F('schedule__hour')).values('day', 'hour')
      return schedule
  class Meta:
      model = Dogs
      fields=('id','name','size','age', 'breed','schedule')
      depth = 1
class WalkerDetailSerializer(serializers.Serializer):
    walker = UserModelSerialzer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    dogs = serializers.SerializerMethodField("dogs_method")
    schedules = serializers.SerializerMethodField("schedules_method")
    first_name= serializers.CharField(min_length=2, max_length=30, required=False)
    last_name= serializers.CharField(min_length=2, max_length=30, required=False)
    email=serializers.EmailField()

    def dogs_method(self, obj):
        pet_walker = PetWalkers.objects.get(walker=obj)
        dogs = Dogs.objects.filter(walker=pet_walker)
        data = DogsSerialzer(dogs, many=True).data
        return data
    
    def schedules_method(self, obj):
        try:
          pet_walker = PetWalkers.objects.get(walker=obj)
        except PetWalkers.DoesNotExist:
          raise serializers.ValidationError('Invalid data')
        return WalkerDogSerializer(pet_walker).data
    class Meta:
        model = Users
        fields = ['id', 'first_name','last_name', 'email','dogs','schedules']
class ScheduledWalkSerializer(serializers.Serializer):
    size = serializers.CharField(min_length=2, max_length=30, required=False)
    day_of_week = serializers.CharField(min_length=2, max_length=30)
    hour = serializers.CharField(min_length=1, max_length=3,required=False)
    walker_id = serializers.IntegerField(required=False)

    def create(self, validated_data):
        if 'size' in validated_data:
          validated_data['size'] = DogSize.objects.get(size=validated_data['size'])
        try:
          instance = PetWalkers.objects.get(walker=validated_data['walker_id'])
          validated_data.pop('walker_id')
          schedules = Schedules.objects.create(**validated_data)
          instance.schedules.add(schedules)
          instance.save()
        except PetWalkers.DoesNotExist:
          raise serializers.ValidationError('Invalid data')
        
        return schedules

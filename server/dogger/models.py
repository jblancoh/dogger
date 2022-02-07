from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser
# Create your models here.
CHOICES = (
      ('monday', 'Monday'),
      ('tuesday', 'Tuesday'),
      ('wednesday', 'Wednesday'),
      ('thursday', 'Thursday'),
      ('friday', 'Friday'),
      ('saturday', 'Saturday'),
      ('sunday', 'Sunday')
    )
class Users(AbstractUser):
    email = models.EmailField(
        'email address',
        unique=True,
        error_messages={
            'unique': 'A user with that email already exists.'
        }
    )
    age = models.IntegerField(null=True, blank=True)
    phone_number = models.CharField(max_length=17, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    is_owner = models.BooleanField(default=False)
    is_walker = models.BooleanField(default=False)
    timestamp= models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__ (self):
        return "%s - %s %s - %s" % (self.first_name, self.email,self.timestamp, self.is_walker)

class PetWalkers(models.Model):
    walker = models.ForeignKey('Users', on_delete=models.CASCADE)
    schedules = models.ManyToManyField('Schedules', blank=True)

    def __str__ (self):
        return str(self.walker)
class Dogs(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    size = models.ForeignKey('DogSize', on_delete=models.DO_NOTHING)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE)
    walker = models.ForeignKey('PetWalkers', null=True, blank=True, on_delete=models.SET_NULL)
    breed = models.ForeignKey('DogBreed', null=True, blank=True, on_delete=models.DO_NOTHING)

    def __str__ (self):
        return str(self.name)

class DogSize(models.Model):
    size = models.CharField(max_length=8)

    def __str__ (self):
        return self.size

class DogBreed(models.Model):
    name = models.CharField(max_length=40)

    def __str__ (self):
        return self.name

class Schedules(models.Model):
    day_of_week = models.CharField(max_length=10, default='Monday', choices=(CHOICES))
    hour = models.PositiveSmallIntegerField(validators=[MinValueValidator(7), MaxValueValidator(20)])
    size = models.ForeignKey('DogSize', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return "%s %s" % (self.day_of_week, self.hour)
class ScheduledWalks(models.Model):
    schedule = models.ForeignKey('Schedules', on_delete=models.CASCADE)
    dog = models.ForeignKey('Dogs', on_delete=models.CASCADE)
    
    def __str__(self):
        return "%s %s" % (self.schedule.day_of_week, self.dog)
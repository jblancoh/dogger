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
    avatar = models.ImageField(null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    is_owner = models.BooleanField(default=False)
    is_walker = models.BooleanField(default=False)
    timestamp= models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return "%s - %s %s" % (self.first_name, self.email,self.timestamp)

class PetWalkers(models.Model):
    walker = models.ForeignKey('Users', on_delete=models.CASCADE)

    def __str__ (self):
        return self.walker
class Dogs(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    size = models.ForeignKey('DogSize', on_delete=models.DO_NOTHING)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE)
    walker = models.ForeignKey('PetWalkers', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__ (self):
        return self.name

class DogSize(models.Model):
    size = models.CharField(max_length=8)

    def __str__ (self):
        return self.size

class Schedules(models.Model):
    day_of_week = models.CharField(max_length=10, default='Monday', choices=(CHOICES))
    hour = models.PositiveSmallIntegerField(validators=[MinValueValidator(7), MaxValueValidator(20)])
    size = models.ForeignKey('DogSize', null=True, blank=True, on_delete=models.SET_NULL)

class ScheduledWalks(models.Model):

    def __str__(self):
        return "%s"
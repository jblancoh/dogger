from django.contrib import admin

# Register your models here.
from .models import *
class AdminUsers(admin.ModelAdmin):
  list_display = ["email", "__str__", "timestamp"]
  list_filter = ["email", "first_name", "last_name", "timestamp"]
  search_fields = ["email", "first_name", "last_name", "timestamp"]
  class Meta:
      meta = Users

class AdminDogs(admin.ModelAdmin):
  list_display = ["name", "size", "owner", "walker"]
  list_filter = ["name", "size", "owner", "walker"]
  search_fields = ["name", "size", "owner", "walker"]
  class Meta:
      meta = Dogs

# class AdminScheduledWalks(admin.ModelAdmin):
#   list_display = ["schedule", "dog"]
#   list_filter = ["schedule", "dog"]
#   search_fields = ["schedule", "dog"]
#   class Meta:
#       meta = ScheduledWalks

admin.site.register(Users, AdminUsers)
admin.site.register(Dogs, AdminDogs)
admin.site.register(DogSize)
admin.site.register(Schedules)
# admin.site.register(ScheduledWalks, AdminScheduledWalks)
admin.site.register(PetWalkers)
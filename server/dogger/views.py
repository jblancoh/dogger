from django.shortcuts import render
from django.contrib.auth.models import User as Auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import Http404
from dogger.serializers import *
from dogger.models import Users as UsersModel
from dogger.models import Dogs as DogsModel
from dogger.models import DogSize as DogSizeModel
from dogger.models import Schedules as SchedulesModel
from dogger.models import ScheduledWalks as ScheduledWalksModel
from dogger.models import PetWalkers as WalkersModel

# Create your views here.	

class UsersDetailsView(APIView):
	"""
	Retrieve, update or delete a user instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return UsersModel.objects.get(pk=pk)
		except Users.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = UserSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = UserSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		account = Auth.objects.filter(pk)
		account.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class DogsView(APIView):
	"""
	List all dogs by users, or create new dog.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogsModel.objects.get(pk=pk)
		except DogsModel.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		dogs = DogsModel.objects.filter(owner=pk)
		serializer = DogsModelSerialzer(dogs, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):	
		serializer = DogSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def put(self, request, pk, format=None):
		dog = self.get_object(pk)
		serializer = DogSerializer(dog, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
class DogsDetailsView(APIView):
	"""
	Retrieve, update or delete a dog instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return Dogs.objects.get(pk=pk)
		except Dogs.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		dog = self.get_object(pk)
		serializer = DogSerializer(dog)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		dog = self.get_object(pk)
		serializer = DogSerializer(dog, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		dog = self.get_object(pk)
		dog.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class DogSizeView(APIView):
	"""
	List all dog sizes
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = DogSizeModel.objects.all()
		serializer = DogSizeSerializer(users, many=True)
		return Response(serializer.data)

class DogSizeDetailsView(APIView):
	"""
	List a dog size instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogSizeModel.objects.get(pk=pk)
		except DogSize.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSizeSerializer(user)
		return Response(serializer.data)

class SchedulesView(APIView):
	"""
	List all schedules, create new schedules.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = SchedulesModel.objects.all()
		serializer = ScheduleSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = ScheduleSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SchedulesDetailsView(APIView):
	"""
	Retrieve, update or delete a schedule instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return SchedulesModel.objects.get(pk=pk)
		except Schedules.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		schedule = self.get_object(pk)
		serializer = ScheduleSerializer(schedule)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		schedule = self.get_object(pk)
		serializer = ScheduleSerializer(schedule, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		schedule = self.get_object(pk)
		schedule.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class ScheduledWalksView(APIView):
	"""
	List all scheduled walks, create a new scheduled walk.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		schedules = ScheduledWalksModel.objects.all()
		serializer = ScheduledWalkSerializer(schedules, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		if request.data.get('size') == '':
			request.data.pop('size')
		serializer = ScheduledWalkSerializer(data=request.data)
		if serializer.is_valid():
			user = UsersModel.objects.get(pk=request.data.get('walker_id'))
			walker = WalkerDetailSerializer(user)
			serializer.save()
			return Response(walker.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
class ScheduledWalksDetailsView(APIView):
	"""
	Retrieve, update or delete a scheduled walk instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return ScheduledWalksModel.objects.get(pk=pk)
		except ScheduledWalks.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		schedule = self.get_object(pk)
		serializer = ScheduledWalkSerializer(schedule)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		schedule = self.get_object(pk)
		serializer = ScheduledWalkSerializer(schedule, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		schedule = self.get_object(pk)
		schedule.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class WalkersView(APIView):
	"""
	List all walkers, create a new walker.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = PetWalkers.objects.all()
		serializer = WalkerSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = WalkerSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WalkersDetailsView(APIView):
	"""
	Retrieve, update or delete a walker instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return WalkersModel.objects.get(pk=pk)
		except WalkersModel.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = WalkerSerializer(user)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = WalkerSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class WalkerDetailsView(APIView):
	"""
	Retrieve, update or delete a walker instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return UsersModel.objects.get(pk=pk)
		except UsersModel.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = WalkerDetailSerializer(user)
		return Response(serializer.data)
class UsersView(APIView):
	"""
	Login and list users
	"""

	def get(self, request, format=None):
		users = UsersModel.objects.all()
		serializer = UserModelSerialzer(users, many=True)
		return Response(serializer.data)

	def post(self, request, *args, **kwargs):
		serializer=UserSerializer(data=request.data)
		if serializer.is_valid():
			user, token=serializer.save()
			data={
					'data': UserModelSerialzer(user).data,
					'access_token': token
			}
			return Response(data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsersSignUpView(APIView):
	
	def post(self, request, *args, **kwargs):
		serializer=UserSignUpSerializer(data=request.data)
		if serializer.is_valid():
			user=serializer.save()
			data={
					'user': UserModelSerialzer(user).data,
					'message': 'User created successfully!'
			}
			return Response(data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

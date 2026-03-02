from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Customer
from .serializers import CustomerSerializer


class CustomerListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        customers = Customer.objects.filter(user=request.user)

        serializer = CustomerSerializer(customers, many=True)

        return Response(serializer.data)


    def post(self, request):

        serializer = CustomerSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomerDetailView(APIView):

    permission_classes = [IsAuthenticated]


    def get_object(self, pk, user):

        try:
            return Customer.objects.get(pk=pk, user=user)

        except Customer.DoesNotExist:
            return None


    def get(self, request, pk):

        customer = self.get_object(pk, request.user)

        if not customer:
            return Response({"error": "Customer not found"}, status=404)

        serializer = CustomerSerializer(customer)

        return Response(serializer.data)


    def put(self, request, pk):

        customer = self.get_object(pk, request.user)

        if not customer:
            return Response({"error": "Customer not found"}, status=404)

        serializer = CustomerSerializer(customer, data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=400)


    def delete(self, request, pk):

        customer = self.get_object(pk, request.user)

        if not customer:
            return Response({"error": "Customer not found"}, status=404)

        customer.delete()

        return Response({"message": "Customer deleted"})
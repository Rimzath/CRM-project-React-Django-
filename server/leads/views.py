from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Lead
from .serializers import LeadSerializer
from customers.models import Customer
from django.shortcuts import get_object_or_404


class LeadListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        leads = Lead.objects.filter(user=request.user)

        serializer = LeadSerializer(leads, many=True)

        return Response(serializer.data)


    def post(self, request):

        serializer = LeadSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=400)



class LeadDetailView(APIView):

    permission_classes = [IsAuthenticated]


    def get_object(self, pk, user):

        try:
            return Lead.objects.get(pk=pk, user=user)

        except Lead.DoesNotExist:
            return None


    def get(self, request, pk):

        lead = self.get_object(pk, request.user)

        if not lead:
            return Response({"error": "Lead not found"}, status=404)

        serializer = LeadSerializer(lead)

        return Response(serializer.data)


    def put(self, request, pk):

        lead = self.get_object(pk, request.user)

        if not lead:
            return Response({"error": "Lead not found"}, status=404)

        serializer = LeadSerializer(lead, data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=400)


    def delete(self, request, pk):

        lead = self.get_object(pk, request.user)

        if not lead:
            return Response({"error": "Lead not found"}, status=404)

        lead.delete()

        return Response({"message": "Lead deleted"})

class ConvertLeadView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        lead = get_object_or_404(Lead, pk=pk, user=request.user)

        if lead.status == "Converted":
            return Response({"message": "Lead already converted"}, status=400)

        # Create Customer from Lead
        customer = Customer.objects.create(
            user=request.user,
            name=lead.name,
            email=lead.email,
            phone=lead.phone,
        )

        # Update Lead
        lead.status = "Converted"
        lead.customer = customer
        lead.save()

        return Response({
            "message": "Lead converted successfully",
            "customer_id": customer.id
        })
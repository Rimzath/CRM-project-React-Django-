from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Lead
from .serializers import LeadSerializer


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
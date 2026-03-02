from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from leads.models import Lead


class DashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        total_customers = Customer.objects.filter(user=user).count()

        total_leads = Lead.objects.filter(user=user).count()

        converted_leads = Lead.objects.filter(
            user=user,
            status="Converted"
        ).count()

        data = {
            "total_customers": total_customers,
            "total_leads": total_leads,
            "converted_leads": converted_leads
        }

        return Response(data)
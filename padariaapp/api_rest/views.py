from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from site_padaria.models import Product
from .serializers import ProductSerializers


@api_view(['GET'])
def get_products(request):
    if request.method == 'GET':
        product = Product.objects.all()

        serializers = ProductSerializers(product, many=True)
        return Response(serializers.data)

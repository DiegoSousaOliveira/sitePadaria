from django.shortcuts import render
from django.contrib import messages
from .models import Product
from .forms import ProductForm

def home(request):
    foods = Product.objects.filter(type_product='Comida')
    drinks = Product.objects.filter(type_product='Bebida')
    context = {
        'foods': foods,
        'drinks': drinks
    }
    return render(request, 'site_padaria/base.html', context)

def cadastre(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        
        if form.is_valid():
            form.save()

            form = ProductForm()
            context = {
                'form': form
            }

            messages.success(request, 'Cadastro realizado com sucesso!')

            return render(request, 'site_padaria/pages/cadastre.html', context)

        else:
            messages.error(request, 'Houve um erro no cadastro. Por favor, verifique os campos.')

        context = {
            'form': form
        }
        
        return render(request, 'site_padaria/pages/cadastre.html', context)
    
    else:
        form = ProductForm()
        context = {
            'form': form
        }

    return render(request, 'site_padaria/pages/cadastre.html', context)
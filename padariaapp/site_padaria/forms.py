from django.forms import ModelForm
from django.core.exceptions import ValidationError
from .models import Product
from utils.model_validators import validate_png_jpg_or_jpeg

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'type_product', 'value', 'imagem']

    def clean_name(self):
        name = self.cleaned_data.get('name')

        if not name.replace(' ', '').isalpha():
            raise ValidationError('The name field cannot be numeric!')

        return name
    
    def clean_value(self):
        value = self.cleaned_data.get('value')

        if value < 0:
            raise ValidationError('This field cannot have a negative value!')
        return value
            
    def clean_imagem(self):
        image = self.cleaned_data.get('imagem')
        validate_png_jpg_or_jpeg(image)
        return image

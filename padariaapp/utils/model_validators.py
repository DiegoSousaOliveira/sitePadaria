from django.core.exceptions import ValidationError

def validate_png_jpg_or_jpeg(image):
    if not image.name.lower().endswith('.png') and not image.name.lower().endswith('.jpeg') and not image.name.lower().endswith('.jpg'):
        raise ValidationError('Imagem precisa ser PNG ou JPG.')
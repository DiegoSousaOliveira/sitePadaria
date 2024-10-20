from django.db import models
from utils.model_validators import validate_png_jpg_or_jpeg
from utils.imagem import resize_image


class Product(models.Model):
    name = models.CharField(max_length=100)

    TYPES_PRODUCTS = [
        ('Comida', 'Comida'),
        ('Bebida', 'Bebida'),
    ]

    type_product = models.CharField(choices=TYPES_PRODUCTS)
    value = models.FloatField()
    imagem = models.ImageField(
        upload_to='assets/img/%Y/%m/',
        validators=[validate_png_jpg_or_jpeg]
    )

    def save(self, *args, **kwargs) -> None:
        current_imagem_name = str(self.imagem.name)
        super().save(*args, **kwargs)
        imagem_changed = False

        if self.imagem:
            imagem_changed = current_imagem_name != self.imagem.name

        if imagem_changed:
            resize_image(self.imagem, 100)

    def __str__(self) -> str:
        return self.name

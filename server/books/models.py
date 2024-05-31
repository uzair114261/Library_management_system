from django.db import models

# Create your models here.
class Books(models.Model):
    STATUS = (
        ('AVAILABLE', 'Available'),
        ('LOANED', 'Loaned')
    )
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.IntegerField(default=1, null=False)
    category = models.CharField( max_length=100)
    publish_date = models.DateField(null=False)
    status = models.CharField(max_length=200, choices=STATUS)
    image = models.ImageField(upload_to='books')
    
    class Meta:
        unique_together = ('title', 'author')
        
    def save(self, *args, **kwargs):
        if self.quantity <= 0:
            self.status = 'LOANED'
        elif self.quantity > 0:
            self.status = 'AVAILABLE'
        super(Books, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.title
    
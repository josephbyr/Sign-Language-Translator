from django.db import models
from django.conf import settings
import os
import PIL.Image
import cv2
import numpy as np
import tensorflow as tf

classes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space']

# load model
model_path = os.path.join(settings.BASE_DIR, 'asl_classifier.h5')
model = tf.keras.models.load_model(model_path)

# Create your models here.
class Image(models.Model):
    image_field = models.ImageField()
    classification = models.CharField(max_length=20, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Image uploaded at {}'.format(self.uploaded.strftime('%d-%m-%Y %H:%M'))

    def save(self, *args, **kwargs):
        try:
            # load and preprocess image
            user_image = PIL.Image.open(self.image_field)
            user_image = np.array(user_image)
            user_image = cv2.cvtColor(user_image, cv2.COLOR_BGR2GRAY)
            user_image = cv2.resize(user_image, (48, 48))
            user_image = user_image.reshape(-1, 48, 48, 1)

            # classify image
            prediction = model.predict([user_image])
            classification = (classes[int(np.argmax(prediction[0]))])
            
            self.classification = classification

            print('success')
            print('prediction: ' + classification)

        except Exception as e:
            print('failed', e)
        super().save(*args, **kwargs)
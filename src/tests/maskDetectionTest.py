from PIL import Image, ImageOps
import numpy as np

import tensorflow.keras
import argparse
import json
import pandas
import os

parser = argparse.ArgumentParser(description='predict mask')
parser.add_argument('--image', type=str, default=320,
                    help='input image')
args = parser.parse_args()
# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = tensorflow.keras.models.load_model('src/py/keras_model.h5')

# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1.
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
# Replace this with the path to your image
accuracy_score_masked= []
accuracy_score= []
ismasked = []
for root, dirs, files in os.walk('src/mask/out/', topdown=False):
    for name in files:
        image_path = os.path.join(root, name)
        if("masked" in name):
            ismasked.append(True)
        else :
            ismasked.append(False)
        

        print(image_path)
        image= Image.open(image_path)
        #resize the image to a 224x224 with the same strategy as in TM2:
        #resizing the image to be at least 224x224 and then cropping from the center
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)

        #turn the image into a numpy array
        image_array = np.asarray(image)

        # display the resized image
        # image.show()

        # Normalize the image
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

        # Load the image into the array
        data[0] = normalized_image_array

        # run the inference
        prediction = model.predict(data)
        accuracy_score.append(round(prediction[0][0],10))

        accuracy_score_masked.append(round(prediction[0][1],10))
        result = {
            "no mask" :str(round(prediction[0][0],10)),
            "mask" : str(round(prediction[0][1],10)),
            "background": str(round(prediction[0][2],10)) 
        }

print(json.dumps(result))
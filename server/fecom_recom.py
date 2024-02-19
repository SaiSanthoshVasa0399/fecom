# -*- coding: utf-8 -*-
"""Fashion Ecom Recommendation System feature extraction
"""
import os
import random
import shutil
from google.colab import files
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
import numpy as np
from numpy.linalg import norm
import os
from tqdm import tqdm
import pickle


files.upload()

! mkdir ~/.kaggle
! cp kaggle.json ~/.kaggle/
! chmod 600 ~/.kaggle/kaggle.json
!kaggle datasets download paramaggarwal/fashion-product-images-dataset

!unzip fashion-product-images-dataset.zip





# Path to the existing folder containing images
images_folder = 'fashion-dataset/fashion-dataset/images'

# Path to the new folder where selected images will be copied
new_images_folder = 'fashion-dataset/fashion-dataset/new_images2'

# ensure the new folder exists or create it if not
os.makedirs(new_images_folder, exist_ok=True)

# get list of all files in the existing folder
all_files = os.listdir(images_folder)

# randomly select 10,000 files from the list
selected_files = random.sample(all_files, 10000)

# copy selected files to the new folder
for file_name in selected_files:
    source_file = os.path.join(images_folder, file_name)
    destination_file = os.path.join(new_images_folder, file_name)
    shutil.copyfile(source_file, destination_file)

print("Files copied successfully.")

!find /content/fashion-dataset/fashion-dataset/new_images2 -type f | wc -l
! ls /content/fashion-dataset/fashion-dataset/new_images2



print("TensorFlow version:", tensorflow.__version__)

model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

print(model.summary())

def extract_features(img_path,model):
    img = image.load_img(img_path,target_size=(224,224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    return normalized_result

filenames = []

for file in os.listdir('/content/fashion-dataset/fashion-dataset/new_images2'):
    filenames.append(os.path.join('/content/fashion-dataset/fashion-dataset/new_images2',file))

feature_list = []

for file in tqdm(filenames):
    feature_list.append(extract_features(file,model))

pickle.dump(feature_list,open('embeddings2.pkl','wb'))
pickle.dump(filenames,open('filenames2.pkl','wb'))

!zip -r new_images.zip /content/fashion-dataset/fashion-dataset/new_images


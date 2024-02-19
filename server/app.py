#TensorFlow version: 2.12.0
from flask import Flask, jsonify, request, g
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import jwt
from flask_cors import CORS 
import datetime
import base64


import pickle
import tensorflow
import numpy as np
from numpy.linalg import norm
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
from sklearn.neighbors import NearestNeighbors
import cv2
import os

app = Flask(__name__)
CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = 'fecom'  
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)

# to protect endpoints with token verification
def token_required(f):
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]  # get the token from the Authorization header

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except jwt.ExpiredSignatureError as e:
            return jsonify({'message': 'Token is expired'}), 401
        except jwt.InvalidTokenError as e:
            return jsonify({'message': 'Token is invalid'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is invalid'}), 401

        g.user = current_user  
        return f(*args, **kwargs)

    return decorated

# routes
@app.route('/api/register', methods=['POST'])
def register():
    with app.app_context():
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(username=data['username'], email=data['email'], password=hashed_password, full_name=data['full_name'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    with app.app_context():
        data = request.get_json()
        username = data['username']
        password = data['password']
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1000)}, app.config['SECRET_KEY'])
            return jsonify({'token': token}), 200  
        else:
            return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/api/user/', methods=['GET'])
@token_required
def get_user_details():
        user = g.user
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'full_name': user.full_name
        }), 200
        

 
@app.route('/api/similar-products/<slug>/', methods=['GET'])       
def get_similar_products(slug):
    feature_list = np.array(pickle.load(open('embeddings.pkl','rb')))
    filenames = pickle.load(open('filenames.pkl','rb'))

    model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
    model.trainable = False

    model = tensorflow.keras.Sequential([
        model,
        GlobalMaxPooling2D()
    ])
    folder_names = ['content', 'fashion-dataset', 'fashion-dataset', 'new_images', f'{slug}.jpg']
    img_path = os.path.join(*folder_names)
    img = image.load_img(img_path,target_size=(224,224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    neighbors = NearestNeighbors(n_neighbors=6,algorithm='brute',metric='euclidean')
    neighbors.fit(feature_list)

    distances, indices = neighbors.kneighbors([normalized_result])

    similar_images = []
    for file_index in indices[0][1:4]:
        similar_img_path = os.path.relpath(filenames[file_index][1:])
        last_path_component = os.path.basename(similar_img_path)
        slug = os.path.splitext(last_path_component)[0]
        with open(similar_img_path, "rb") as img_file:
            encoded_img = base64.b64encode(img_file.read()).decode('utf-8')
        similar_images.append({'slug': slug, 'image': encoded_img})

    return jsonify(similar_images)
    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

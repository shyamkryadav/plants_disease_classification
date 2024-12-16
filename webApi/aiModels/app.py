import os
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image

app = Flask(__name__)

# Load the model (change the path to the saved model)
MODEL_PATH = './potato_disease_model.h5'  # If youcls used .h5 format
model = load_model(MODEL_PATH)

# Define image preprocessing function
def preprocess_image(img_path):
    img = Image.open(img_path)
    img = img.resize((256, 256))  # Resize to model's expected size
    img_array = np.array(img)  # Convert image to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize the image
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded file temporarily
    img_path = os.path.join('uploads', file.filename)
    file.save(img_path)

    # Preprocess the image
    img_array = preprocess_image(img_path)

    # Predict the class using the model
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)

    # Return the result as JSON
    return jsonify({'predicted_class': str(predicted_class[0])})

if __name__ == '__main__':
    # Create an uploads directory if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(debug=True)

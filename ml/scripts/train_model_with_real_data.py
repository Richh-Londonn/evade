
import tensorflow as tf
from tensorflow.keras import layers, models
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

def load_dataset(file_path):
    data = pd.read_csv(file_path)
    images = np.array([np.array(eval(img)) for img in data['image']])  # Example: image data stored as strings
    labels = data['label'].values
    return images, labels

def preprocess_data(images, labels):
    images = images / 255.0  # Normalize pixel values
    labels = tf.keras.utils.to_categorical(labels, num_classes=2)  # Convert to one-hot encoding
    return images, labels

def create_hazard_detection_model():
    model = models.Sequential([
        layers.Input(shape=(128, 128, 3)),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(2, activation='softmax')  # Binary classification
    ])
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def train_model_with_real_data():
    file_path = './data/hazard_data.csv'  # Path to your dataset
    images, labels = load_dataset(file_path)
    images, labels = preprocess_data(images, labels)
    
    X_train, X_val, y_train, y_val = train_test_split(images, labels, test_size=0.2, random_state=42)
    
    model = create_hazard_detection_model()
    model.fit(X_train, y_train, epochs=10, validation_data=(X_val, y_val))
    model.save('hazard_detection_model_real_data.h5')
    print('Model trained with real data and saved successfully.')

if __name__ == '__main__':
    train_model_with_real_data()

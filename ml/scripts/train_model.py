
import tensorflow as tf
from models.hazard_detection_model import create_hazard_detection_model

def train_model():
    model = create_hazard_detection_model()

    # Example dataset (replace with real data)
    train_images = tf.random.normal([100, 128, 128, 3])
    train_labels = tf.random.uniform([100], maxval=2, dtype=tf.int32)

    val_images = tf.random.normal([20, 128, 128, 3])
    val_labels = tf.random.uniform([20], maxval=2, dtype=tf.int32)

    model.fit(train_images, train_labels, epochs=10, validation_data=(val_images, val_labels))
    model.save('hazard_detection_model.h5')
    print('Model trained and saved successfully.')

if __name__ == '__main__':
    train_model()

import cv2
import tensorflow as tf
import numpy as np

classes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "del", "nothing", "space"]

model = tf.keras.models.load_model("./asl_classifier.h5")

cap = cv2.VideoCapture(0) # use 1 if using external webcam

# Check if the webcam is opened correctly
if not cap.isOpened():
    raise IOError("Cannot open camera")

while True:
    ret, frame = cap.read()

    display_frame = frame

    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame = cv2.resize(frame, (48, 48))
    frame = frame.reshape(-1, 48, 48, 1)
    
    prediction = model.predict([frame])
    final = (classes[int(np.argmax(prediction[0]))])
    
    font = cv2.FONT_HERSHEY_DUPLEX
    cv2.putText(display_frame, final, (200,100), font, 1, (0,0,0), 2, cv2.LINE_AA)

    cv2.imshow('Video', display_frame)
    

    key = cv2.waitKey(1)
    if key == 27: # press esc key to stop
        break

cap.release()
cv2.destroyAllWindows()
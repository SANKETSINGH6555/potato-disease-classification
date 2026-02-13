from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# Allow frontend access
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
MODEL = tf.keras.models.load_model("../potatoes.h5")

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((256, 256))  # Resize to model input size
    image = np.array(image)
    image = image / 255.0  # Normalize
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and preprocess image
    image = read_file_as_image(await file.read())

    # Add batch dimension
    img_batch = np.expand_dims(image, 0)

    # Make prediction
    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))

    return {
        "class": predicted_class,
        "confidence": confidence
    }


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)

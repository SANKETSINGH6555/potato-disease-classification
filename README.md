🥔 Potato Disease Classification using Deep Learning

A full-stack web application that classifies potato leaf diseases using a trained Convolutional Neural Network (CNN) model.

This project uses:

TensorFlow / Keras for model inference

FastAPI for backend API

ReactJS for frontend user interface

📌 Overview

The application allows users to upload an image of a potato leaf and receive a prediction indicating whether the leaf is:

Early Blight

Late Blight

Healthy

The backend processes the image and returns the predicted class along with a confidence score.

📁 Project Structure
potato-disease-classification
│
├── api
│   ├── main.py
│   ├── requirements.txt
│
├── frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── potatoes.h5
├── .gitignore
├── README.md

⚙️ Backend Setup (FastAPI)
1. Navigate to API folder
cd api

2. Create virtual environment
python -m venv venv


Activate (Windows):

venv\Scripts\activate

3. Install dependencies
pip install -r requirements.txt

4. Run the backend server
uvicorn main:app --reload


Backend will run at:

http://127.0.0.1:8000


API documentation available at:

http://127.0.0.1:8000/docs

💻 Frontend Setup (React)
1. Navigate to frontend folder
cd frontend

2. Install dependencies
npm install

3. Start the frontend
npm start


Frontend will run at:

http://localhost:3000

🔄 API Endpoint
POST /predict

Request:

Form-data

Key: file

Value: Image file

Response:

{
  "class": "Early Blight",
  "confidence": 0.95
}

🧠 Model Information

Input Shape: (256, 256, 3)

Output Classes:

Early Blight

Late Blight

Healthy

Model Format: .h5

Framework: TensorFlow / Keras

🛠 Technologies Used

Python

TensorFlow

Keras

FastAPI

Uvicorn

ReactJS

Material UI

Axios

👨‍💻 Author

Sanket Singh
GitHub: https://github.com/SANKETSINGH6555

📄 License

This project is developed for educational and portfolio purposes.

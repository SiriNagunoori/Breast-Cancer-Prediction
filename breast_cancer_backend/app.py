from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os
from PIL import Image
import pytesseract
from pdf2image import convert_from_path
import re
from model_cnn import load_cnn_model, preprocess_image
import torch
import torch.nn.functional as F

# Initialize app
app = Flask(__name__)
CORS(app)

# Paths
MODEL_PATH = r"D:\Breast Cancer Detection\breast_cancer_backend\models\breast_cancer_blood_model.pkl"
SCALER_PATH = r"D:\Breast Cancer Detection\breast_cancer_backend\models\blood_scaler.pkl"
UPLOAD_FOLDER = "uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load models
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
cnn_model = load_cnn_model()

# Tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Expected features for blood report
FEATURE_COLUMNS = [
    "CA15_3", "CEA", "HER2", "BRCA1", "BRCA2",
    "ER_Status", "PR_Status", "WBC", "Lymphocytes", "Platelets"
]

# Utility functions
def extract_text_from_file(file_path):
    """Extract text from image or PDF"""
    text = ""
    if file_path.lower().endswith(".pdf"):
        pages = convert_from_path(file_path)
        for page in pages:
            text += pytesseract.image_to_string(page)
    else:
        img = Image.open(file_path)
        text = pytesseract.image_to_string(img)
    return text

def parse_features(text):
    """Convert OCR text to dictionary for model"""
    features = {}
    for col in FEATURE_COLUMNS:
        match = re.search(rf"{col}\s*[:=]?\s*([\w.]+)", text, re.IGNORECASE)
        if match:
            value = match.group(1)
            try:
                features[col] = float(value)
            except ValueError:
                features[col] = value
        else:
            features[col] = 0
    return features

# Blood report prediction
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        text = extract_text_from_file(file_path)
        features_dict = parse_features(text)
        df = pd.DataFrame([features_dict])

        # Map categorical values
        mapping = {"Low": 0, "Normal": 1, "Medium": 1, "High": 2, "Positive": 1, "Negative": 0}
        for col in df.columns:
            if df[col].dtype == object:
                df[col] = df[col].map(mapping).fillna(0)

        # Scale and predict
        features_scaled = scaler.transform(df)
        preds = model.predict(features_scaled)
        results = ["⚠️ Malignant risk detected" if p == 1 else "✅ Benign" for p in preds]

        return jsonify({"predictions": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        os.remove(file_path)

# Mammogram prediction
@app.route("/predict_mammogram", methods=["POST"])
def predict_mammogram():
    if "file" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        img_tensor = preprocess_image(file_path)
        outputs = cnn_model(img_tensor)
        probs = F.softmax(outputs, dim=1)
        pred_class = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred_class].item()

        label = "⚠️ Malignant detected" if pred_class == 1 else "✅ Benign"
        result = f"{label} (Confidence: {confidence*100:.2f}%)"
        return jsonify({"predictions": [result]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        os.remove(file_path)

if __name__ == "__main__":
    app.run(debug=True)

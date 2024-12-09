from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
import hashlib
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# MongoDB connection using environment variable for security
client = MongoClient(os.getenv('MONGO_URI'))  # Ensure that MONGO_URI is in our .env file
db = client['App']  # Database name
users_collection = db['user_info']  # Collection name for storing user data

# Create a Blueprint
api_blueprint = Blueprint('api', __name__)

# Generate a random salt
def generate_salt():
    return os.urandom(16).hex()

# Function to hash passwords with salt
def hash_password(password, salt):
    return hashlib.sha256((password + salt).encode()).hexdigest()

# Route for user registration
@api_blueprint.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    sex = data.get('sex')
    height = data.get('height')
    weight = data.get('weight')
    daily_calorie_intake = data.get('daily_calorie_intake', 2000)  # Default to 2000 if not provided

    # Check if username already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"message": "Username already exists."}), 400

    try:
        salt = generate_salt()  # Generate a salt for this user
        hashed_password = hash_password(password, salt)
        user_data = {
            "username": username,
            "password": hashed_password,
            "salt": salt,
            "sex": sex,
            "height": height,
            "weight": weight,
            "daily_calorie_intake": daily_calorie_intake,  # Add daily calorie intake goal
            "calories_consumed": 0,  # Initialize calories consumed to 0
            "heart_rate": [],
            "blood_pressure": [],
            "water_consumed": 0,  # Initialize water consumed to 0 cups
            "workout_logs": []  # Initialize workout logs
        }
        users_collection.insert_one(user_data)
        return jsonify({"message": f"User {username} registered successfully."}), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred during registration: {str(e)}"}), 500

# Route for logging heart rate with timestamp
@api_blueprint.route('/heart-rate', methods=['POST'])
def heart_rate_log():
    data = request.json
    username = data.get('username')
    heart_rate_input = data.get('heart_rate')

    user = users_collection.find_one({"username": username})
    if user:
        timestamp = datetime.now().isoformat()  # Current timestamp
        heart_rate_entry = {"value": heart_rate_input, "timestamp": timestamp}
        users_collection.update_one({"username": username}, {"$push": {"heart_rate": heart_rate_entry}})
        return jsonify({"message": f"Heart rate logged for {username}."}), 200
    else:
        return jsonify({"message": "User not found. Please register first."}), 404

# Route for logging blood pressure with timestamp
@api_blueprint.route('/blood-pressure', methods=['POST'])
def blood_pressure_log():
    data = request.json
    username = data.get('username')
    systolic = data.get('systolic')
    diastolic = data.get('diastolic')

    user = users_collection.find_one({"username": username})
    if user:
        timestamp = datetime.now().isoformat()  # Current timestamp
        blood_pressure_entry = {"systolic": systolic, "diastolic": diastolic, "timestamp": timestamp}
        users_collection.update_one({"username": username}, {"$push": {"blood_pressure": blood_pressure_entry}})
        return jsonify({"message": f"Blood pressure logged for {username}."}), 200
    else:
        return jsonify({"message": "User not found. Please register first."}), 404

# Route for retrieving heart rate logs with timestamps
@api_blueprint.route('/get-heart-rate/<username>', methods=['GET'])
def get_heart_rate(username):
    user = users_collection.find_one({"username": username})
    if user and user["heart_rate"]:
        return jsonify({"heart_rate_logs": user["heart_rate"]}), 200
    else:
        return jsonify({"message": "No heart rate data available."}), 404

# Route for retrieving blood pressure logs with timestamps
@api_blueprint.route('/get-blood-pressure/<username>', methods=['GET'])
def get_blood_pressure(username):
    user = users_collection.find_one({"username": username})
    if user and user["blood_pressure"]:
        return jsonify({"blood_pressure_logs": user["blood_pressure"]}), 200
    else:
        return jsonify({"message": "No blood pressure data available."}), 404

# Route for getting average heart rate
@api_blueprint.route('/average-heart-rate/<username>', methods=['GET'])
def average_heart_rate(username):
    user = users_collection.find_one({"username": username})
    if user and user["heart_rate"]:
        heart_rates = [entry["value"] for entry in user["heart_rate"]]
        average_heart_rate = sum(heart_rates) / len(heart_rates)
        return jsonify({"average_heart_rate": int(average_heart_rate)}), 200
    else:
        return jsonify({"message": "No heart rate data available."}), 404

# Route for getting average blood pressure
@api_blueprint.route('/average-blood-pressure/<username>', methods=['GET'])
def average_blood_pressure(username):
    user = users_collection.find_one({"username": username})
    if user and user["blood_pressure"]:
        blood_pressures = user["blood_pressure"]
        total_systolic = sum(bp["systolic"] for bp in blood_pressures)
        total_diastolic = sum(bp["diastolic"] for bp in blood_pressures)
        average_systolic = total_systolic / len(blood_pressures)
        average_diastolic = total_diastolic / len(blood_pressures)
        return jsonify({"average_systolic": int(average_systolic), "average_diastolic": int(average_diastolic)}), 200
    else:
        return jsonify({"message": "No blood pressure data available."}), 404
# Route to get all logged blood pressure entries
@api_blueprint.route('/all-blood-pressures/<username>', methods=['GET'])
def get_all_blood_pressures(username):
    user = users_collection.find_one({"username": username})
    if user and user["blood_pressure"]:
        return jsonify({"blood_pressures": user["blood_pressure"]}), 200
    else:
        return jsonify({"message": "No blood pressure data available."}), 404
# Route for updating user's weight
@api_blueprint.route('/change-weight', methods=['PUT'])
def change_weight():
    data = request.json
    username = data.get('username')
    new_weight = data.get('weight')

    user = users_collection.find_one({"username": username})
    if user:
        users_collection.update_one({"username": username}, {"$set": {"weight": new_weight}})
        return jsonify({"message": f"Weight updated to {new_weight} lbs."}), 200
    return jsonify({"message": "User not found."}), 404

# Route for managing water consumption
@api_blueprint.route('/water-consumption/<username>', methods=['POST', 'GET'])
def manage_water_consumption(username):
    if request.method == 'POST':
        action = request.json.get('action')
        user = users_collection.find_one({"username": username})
        if user:
            if action == "increase":
                users_collection.update_one({"username": username}, {"$inc": {"water_consumed": 1}})
                return jsonify({"message": f"Water consumption increased for {username}."}), 200
            elif action == "decrease" and user["water_consumed"] > 0:
                users_collection.update_one({"username": username}, {"$inc": {"water_consumed": -1}})
                return jsonify({"message": f"Water consumption decreased for {username}."}), 200
            return jsonify({"message": "Invalid action or water consumption already at 0."}), 400
        return jsonify({"message": "User not found."}), 404
    # GET request for current water consumption
    user = users_collection.find_one({"username": username})
    return jsonify({"water_consumed": user["water_consumed"]}) if user else jsonify({"message": "User not found."}), 404

# Route for logging a meal with calories consumed
@api_blueprint.route('/log-meal', methods=['POST'])
def log_meal():
    data = request.json
    username = data.get('username')
    calories_consumed = data.get('calories')

    user = users_collection.find_one({"username": username})
    if user:
        users_collection.update_one({"username": username}, {"$inc": {"calories_consumed": calories_consumed}})
        return jsonify({"message": f"{calories_consumed} calories logged for {username}."}), 200
    return jsonify({"message": "User not found."}), 404

# Route for getting remaining calories for the day
@api_blueprint.route('/remaining-calories/<username>', methods=['GET'])
def remaining_calories(username):
    user = users_collection.find_one({"username": username})
    if user:
        daily_goal = user.get("daily_calorie_intake", 0)
        calories_consumed = user.get("calories_consumed", 0)
        remaining_calories = daily_goal - calories_consumed
        return jsonify({"remaining_calories": max(remaining_calories, 0)}), 200
    return jsonify({"message": "User not found."}), 404
# Route for logging a workout
@api_blueprint.route('/log-workout', methods=['POST'])
def log_workout():
    data = request.json
    username = data.get('username')
    exercise = data.get('exercise')
    muscle_group = data.get('muscle_group')
    repetitions = data.get('repetitions')
    duration = data.get('duration')  # Duration of workout in minutes
    timestamp = datetime.now().isoformat()  # Current timestamp

    user = users_collection.find_one({"username": username})
    if user:
        workout_entry = {
            "exercise": exercise,
            "muscle_group": muscle_group,
            "repetitions": repetitions,
            "duration": duration,
            "timestamp": timestamp
        }
        users_collection.update_one({"username": username}, {"$push": {"workout_logs": workout_entry}})
        return jsonify({"message": f"Workout logged for {username}."}), 200
    else:
        return jsonify({"message": "User not found. Please register first."}), 404

# Route for retrieving workout logs
@api_blueprint.route('/get-workout-logs/<username>', methods=['GET'])
def get_workout_logs(username):
    user = users_collection.find_one({"username": username})
    if user and user["workout_logs"]:
        return jsonify({"workout_logs": user["workout_logs"]}), 200
    else:
        return jsonify({"message": "No workout data available."}), 404

# Route for getting total workout duration for the day
@api_blueprint.route('/total-workout-time/<username>', methods=['GET'])
def total_workout_time(username):
    user = users_collection.find_one({"username": username})
    if user and user["workout_logs"]:
        total_duration = sum(log["duration"] for log in user["workout_logs"])
        return jsonify({"total_workout_time": total_duration}), 200
    else:
        return jsonify({"message": "No workout data available."}), 404


# Create and run the Flask app
if __name__ == '__main__':
    app = Flask(__name__)
    app.register_blueprint(api_blueprint, url_prefix='/api')
    app.run(debug=True)

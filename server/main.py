from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from hashing import hash_password, check_password
import uuid

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

uri = "mongodb+srv://testuser:cys9qijPpt0fhzW7@userdb.kvfsed1.mongodb.net/?retryWrites=true&w=majority&appName=USERDB"
client = MongoClient(uri)
db = MongoClient['Users']
collection = MongoClient['studentUsers']

@app.route("/register", methods = ['POST'])
# FOR USER REGISTRATION
def register():
    user_info = request.json
    user_info['userID'] = str(uuid.uuid4())  # Create a unique userID
    if not user_info or "email" not in user_info or "password" not in user_info or "firstName" not in user_info or "lastName" not in user_info:
        return jsonify({"status": "error", "message": "Missing information."}), 400

    if client.Users.studentUsers.find_one({"email": user_info['email']}):
        return jsonify({"status": "error", "message": "Email already in use. Try Logging in instead."}), 409

    hashed_password = hash_password(user_info['password'])
    user_info['password'] = hashed_password
    client.Users.studentUsers.insert_one(user_info)
    return jsonify({"status": "success", "message": "User registered.", "userId": user_info['userID']}), 201

@app.route("/staffRegister", methods = ['POST'])
def staff_register():
    user_info = request.json
    user_info['userID'] = str(uuid.uuid4())  # Create a unique userID
    if not user_info or "email" not in user_info or "password" not in user_info or "firstName" not in user_info or "lastName" not in user_info or "school" not in user_info:
        return jsonify({"status": "error", "message": "Missing information."}), 400

    if client.Users.staffUsers.find_one({"email": user_info['email']}):
        return jsonify({"status": "error", "message": "Email already in use. Try Logging in instead."}), 409

    hashed_password = hash_password(user_info['password'])
    user_info['password'] = hashed_password
    client.Users.staffUsers.insert_one(user_info)
    return jsonify({"status": "success", "message": "User registered.", "userId": user_info['userID']}), 201

@app.route("/details", methods = ['POST'])
def save_user_details():
    data = request.json
    user_id = data.get('userId')
    details = data.get('Details', {})

    # Directly use the user_id for finding the user since it's stored as a string
    if user_id is None:
        return jsonify({"status": "error", "message": "User ID is required"}), 400

    result = client.Users.studentUsers.update_one(
        {'userID': user_id},
        {'$set': {'Details': details}},
        upsert=True
    )

    if result.modified_count > 0 or result.upserted_id:
        return jsonify({"status": "success", "message": "Details updated successfully"}), 200
    else:
        return jsonify({"status": "error", "message": "No changes made"}), 400
# FOR LOGIN CHECK
@app.route('/login', methods=['POST'])
def login():
    user_info = request.json
    if not user_info or "email" not in user_info or "password" not in user_info:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    user = client.Users.studentUsers.find_one({"email": user_info['email']})
    if not user:
        # Email not found
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

    if not check_password(user_info['password'], user['password']):
        # Password does not match
        return jsonify({"status": "error", "message": "Password or Email incorrect."}), 401

    # Login successful
    return jsonify({"status": "success", "message": "Login successful."}), 200

@app.route('/stafflogin', methods=['POST'])
def Staff_login():
    user_info = request.json
    if not user_info or "email" not in user_info or "password" not in user_info:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    user = client.Users.staffUsers.find_one({"email": user_info['email']})
    if not user:
        # Email not found
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

    if not check_password(user_info['password'], user['password']):
        # Password does not match
        return jsonify({"status": "error", "message": "Password or Email incorrect."}), 401
    
    # Login successful
    return jsonify({"status": "success", "message": "Login successful."}), 200

if __name__ == "__main__":
    app.run(debug=True)
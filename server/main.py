from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from flask_cors import CORS
from hashing import hash_password, check_password
import uuid
import os
from bson import ObjectId
from werkzeug.utils import secure_filename
filename = "my_image.jpg"
secure_filename = secure_filename(filename)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

uri = "mongodb+srv://testuser:cys9qijPpt0fhzW7@userdb.kvfsed1.mongodb.net/?retryWrites=true&w=majority&appName=USERDB"
client = MongoClient(uri)

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
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

    if not check_password(user_info['password'], user['password']):
        return jsonify({"status": "error", "message": "Password or Email incorrect."}), 401

    user_id = str(user.get('userID')) 
    # Login successful
    return jsonify({"status": "success", "userId": user_id, "message": "Login successful."}), 200

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
    user_id = str(user.get('userID')) 
    # Login successful
    return jsonify({"status": "success", "userId": user_id, "message": "Login successful."}), 200

@app.route('/profile', methods =['GET'])
def openProfile():
    userId = request.args.get('userId') 
    # otherId = request.args.get('otherUserId')

    # otherstudent_user = client.Users.studentUsers.find_one({"userID": otherId})
    # if otherstudent_user:
    #     user_data = {
    #         "firstName": otherstudent_user.get('firstName', ''), 
    #         "lastName": otherstudent_user.get('lastName', ''), 
    #         'type': otherstudent_user.get('type', ''), 
    #         "userId" : otherId, 
    #         "Details" : otherstudent_user.get('Details', {})}
    #     return jsonify({"status": "success", "user": user_data}), 200

    student_user = client.Users.studentUsers.find_one({"userID": userId})
    if student_user:
        user_data = {
            "firstName": student_user.get('firstName', ''), 
            "lastName": student_user.get('lastName', ''), 
            'type': student_user.get('type', ''), 
            "userId" : userId, 
            "Details" : student_user.get('Details', {})}
        return jsonify({"status": "success", "user": user_data}), 200
    
    staff_user = client.Users.staffUsers.find_one({"userID": userId})
    if staff_user:
        user_data = {
            "firstName": staff_user.get('firstName', ''), 
            "lastName": staff_user.get('lastName', ''), 
            'type': staff_user.get('type', ''), 
            "userId" : userId, 
            "school" : staff_user.get('school', '')}
        return jsonify({"status": "success", "user": user_data}), 200

    if not student_user or staff_user:
        return jsonify({"status": "error", "message": "User not found"}), 404

@app.route('/home', methods =['GET'])
def openHome():
    userId = request.args.get('userId')
    # Check if the user is a student user
    student_user = client.Users.studentUsers.find_one({"userID": userId})
    if student_user:
        user_data = {
            "firstName": student_user.get('firstName', ''),
            "lastName": student_user.get('lastName', ''),
            'type': student_user.get('type', ''),
            "userId": userId,
            "Details": student_user.get('Details', {})
        }
        return jsonify({"status": "success", "user": user_data}), 200

    # Check if the user is a staff user
    staff_user = client.Users.staffUsers.find_one({"userID": userId})
    if staff_user:
        user_data = {
            "firstName": staff_user.get('firstName', ''),
            "lastName": staff_user.get('lastName', ''),
            'type': staff_user.get('type', ''),
            "userId": userId,
            "school": staff_user.get('school', '')
        }
        return jsonify({"status": "success", "user": user_data}), 200

    # If the user is not found
    return jsonify({"status": "error", "message": "User not found"}), 404

@app.route('/users', methods=['GET'])
def get_users():
    try:
        users_cursor = client.Users.studentUsers.find()
        user_list = []
        for user in users_cursor:
            user['_id'] = str(user['_id'])  # Convert ObjectId to string
            user_list.append(user)


        # user_list = list(users)

        return jsonify(user_list)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/createpost', methods=['POST'])
def createpost():
    post_data = request.json
    post_id = str(uuid.uuid4())
    post_data["_id"] = post_id

    user_id = post_data.get('userId')

    student_user = client.Users.studentUsers.find_one({"userID": user_id})
    if student_user:
        firstName = student_user.get('firstName', '')
        lastName = student_user.get('lastName', '')
        user_type = student_user.get('type', '')

    staff_user = client.Users.staffUsers.find_one({"userID": user_id})
    if staff_user:
        firstName = staff_user.get('firstName', '')
        lastName = staff_user.get('lastName', '')
        user_type = staff_user.get('type', '')

    post_data["firstName"] = firstName
    post_data["lastName"] = lastName
    post_data["type"] = user_type

    client.Users.posts.insert_one(post_data)
    return jsonify({"message": "Post stored successfully"}), 200
   
    
@app.route('/posts', methods = ['GET'])
def display_posts():
    try:
        user_id = request.args.get('userId')

        if user_id:
            # Display user's posts if userId is provided
            posts = list(client.Users.posts.find({'userId': user_id}))
        else:
            # Display all posts if no userId is provided
            posts = list(client.Users.posts.find({}))

        return jsonify(posts)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/polls/<post_id>/vote', methods=['POST'])
def vote(post_id):
    try:
        data = request.json
        selected_options = data.get('selectedOptions', [])

        # Fetch the poll data from the database
        post = client.Users.posts.find_one({"_id": post_id})
        if post is None:
            return jsonify({"error": "Post not found"}), 404

        poll_content = post.get("postContent", {})
        options = poll_content.get("options", [])

        # Update poll data with the selected votes
        for option in options:
            if option["id"] in selected_options:
                option["votes"] += 1

        # Update the poll content in the database
        client.Users.posts.update_one({"_id": post_id}, {"$set": {"postContent.options": options}})

        return jsonify({"message": "Vote recorded successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/internshipsPost', methods=['POST'])
def postInternship():
    post_data = request.json
    job_id = str(uuid.uuid4())
    post_data["_id"] = job_id

    user_id = post_data.get('userId')
    staff_user = client.Users.staffUsers.find_one({"userID": user_id})
    firstName = staff_user.get('firstName', '')
    lastName = staff_user.get('lastName', '')
    post_data["firstName"] = firstName
    post_data["lastName"] = lastName

    post_data["savedBy"] = [user_id]

    client.Internships.internshipPosts.insert_one(post_data)
    return jsonify({"message": "Job stored successfully", "userId": user_id}), 200

@app.route('/saveInternship', methods=['POST'])
def save_internship():
    request_data = request.json
    internship_id = request_data.get('internshipId')
    user_id = request_data.get('userId')

    try:
        if user_id and internship_id:
            internship = client.Internships.internshipPosts.find_one({"_id": internship_id})
            if internship:
                saved_by = internship.get('savedBy', [])
                if user_id not in saved_by:
                    result = client.Internships.internshipPosts.update_one(
                        {"_id": internship_id},
                        {"$addToSet": {"savedBy": user_id}}
                    )
                    if result.modified_count == 1:
                        return jsonify({"message": "Internship saved successfully"}), 200
                return jsonify({"message": "Internship already saved."}), 409
            else:
                return jsonify({"error": "Internship not found"}), 404
        else:
            return jsonify({"error": "Missing user ID or internship ID"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/internships', methods=['GET'])
def get_internships():
    try:
        internships = client.Internships.internshipPosts.find()
        internships_list = [internship for internship in internships]
        return jsonify(internships_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/savedInternships', methods=['GET'])
def get_saved_internships():
    user_id = request.args.get('userId')

    saved_internships = client.Internships.internshipPosts.find({'savedBy': user_id})
    saved_internships_list = list(saved_internships)

    return jsonify(saved_internships_list)

@app.route('/profileImages', methods=['POST'])
def upload_profile_image():
    
    if 'profile_image' not in request.files:
        return 'No file part', 400
    
    profile_image = request.files['profile_image']
    # background_image = request.files['background_image']
    bio = request.form.get('bio', '')
    
    # if profile_image.filename == '' or background_image.filename == '':
    #     return 'No selected file', 400
    
    try:
        profile_filename = secure_filename(profile_image.filename)
        # background_filename = secure_filename(background_image.filename)
        
        profile_image.save(os.path.join(app.config['UPLOAD_FOLDER'], profile_filename))
        # background_image.save(os.path.join(app.config['UPLOAD_FOLDER'], background_filename))
        
        user_id = request.args.get('userId')
        student_user = client.Users.studentUsers.find_one({"userID": user_id})
        staff_user = client.Users.staffUsers.find_one({"userID": user_id})
        
        if student_user: 
            client.Users.studentUsers.update_one(
                {'userID': user_id},
                {'$set': {'profileImage': os.path.join(app.config['UPLOAD_FOLDER'], profile_filename),
                        #   'backgroundImage': os.path.join(app.config['UPLOAD_FOLDER'], background_filename), 
                          'bio': bio}}
            )
            return 'Profile Image uploaded successfully', 200
        
        if staff_user:
            client.Users.staffUsers.update_one(
                {'userID': user_id},
                {'$set': {'profileImage': os.path.join(app.config['UPLOAD_FOLDER'], profile_filename),
                        #   'backgroundImage': os.path.join(app.config['UPLOAD_FOLDER'], background_filename),
                          'bio' : bio}}
            )
            return 'Profile Image uploaded successfully', 200
        
        return 'User ID not found', 404
    except Exception as e:
        print(e)  # Log the error for debugging purposes
        return 'Internal server error', 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
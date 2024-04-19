
import bcrypt
    
def hash_password(password):
    # Convert the password string to bytes
    password_bytes = password.encode('utf-8')
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password.decode('utf-8')

def check_password(password, hashed_password):
    # Convert string values to bytes
    password_bytes = password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    # Check if the provided password matches the hashed password
    return bcrypt.checkpw(password_bytes, hashed_password_bytes)

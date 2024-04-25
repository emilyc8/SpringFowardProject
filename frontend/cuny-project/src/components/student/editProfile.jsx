import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from 'axios'; // Import axios for making HTTP requests
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../../styles/studentProfile.css";

function Edit_Profile({isOpen, onClose}) {
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
    const [bio, setBio] = useState('');

    const handleProfileImageChange = (event) => {
        console.log("Event target:", event.target);
      const file = event.target.files[0];
      console.log("Selected profile image:", file);
      setSelectedProfileImage(file)
    };

    const handleBackgroundImageChange = (event) => {
        console.log("Event target:", event.target);
        const file = event.target.files[0];
        console.log("Selected background image:", file);
        setSelectedBackgroundImage(file);
    };

    const handleBioChange = (event) => {
      setBio(event.target.value);
    };

    const handleUpload = async (event) => {
      event.preventDefault(); // Prevent default form submission
        const userId = localStorage.getItem('userId')
        const profileFormData = new FormData();
        const backgroundFormData = new FormData();

        profileFormData.append('profile_image', selectedProfileImage);
        backgroundFormData.append('background_image', selectedBackgroundImage);
        backgroundFormData.append('bio', bio); // Add bio to the background form data

      try {
        const response1 = await axios.post('http://127.0.0.1:5000/profileImages', profileFormData,{
            params: { userId },
        });

        const response2 = await axios.post('http://127.0.0.1:5000/profileImages', backgroundFormData,{
            params: { userId },
        }); 

        console.log(response1.data)
        console.log(response2.data)

        // Optionally, show a success message or update UI
      } catch (error) {
        console.error('Error uploading images:', error);
        // Handle error: show error message or update UI accordingly
      }
    };

    return(
        <>
            { isOpen && (
                <div className="back" >
                    <form className="card" onSubmit={handleUpload}>
                        <div className="card-top">
                            <button className="close" onClick={onClose}>X</button>
                            <h3>Edit Profile</h3>
                            <button className="save" type="submit">Save</button>
                        </div>
                        <div className="card-image">
                            <div className="image-holder">
                                <label htmlFor="file-upload" className="fileU">
                                    <FontAwesomeIcon icon={faCamera} />
                                </label>
                                <input name="profile_image" id="file-upload" type="file" onChange={handleBackgroundImageChange} />
                            </div>
                        </div>
                        <div className="profile-image">
                                <label htmlFor="profile-upload" className="fileU">
                                    <FontAwesomeIcon icon={faCamera} />
                                </label>
                            <input name="background_image" id="profile-upload" type="file" onChange={handleProfileImageChange} />
                        </div>
                        <div className="card-bio">
                            <p>Bio</p>
                            <TextareaAutosize name="bio"placeholder="Bio" rows={10} value={bio} onChange={handleBioChange} />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Edit_Profile;

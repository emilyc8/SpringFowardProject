import { Link } from "react-router-dom";
import "../../styles/studentProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLessThan} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Edit_Profile from "./editProfile";

function Student_Profile(){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userPosts, setUserPosts] = useState([]);
    

    useEffect(() => {
        const fetchUserInfo = async () => {
            try{
                const userId = localStorage.getItem('userId');
                const response  = await axios.get(`http://127.0.0.1:5000/profile?userId=${userId}`, userId);
                const response2 = await axios.get(`http://127.0.0.1:5000/posts?userId=${userId}`);
                console.log('User info:', response.data);
                console.log(response2.data)
                setUser(response.data.user);
                setUserPosts(response2.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, [])



    
    const [isOn, setIsOn] = useState(false)
    const feedStyle = isOn ? { overflow: 'hidden', height: '100vh' } : {};
   
    return(
        <div className="student" style={feedStyle}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : user ? (
                <>
                    <Edit_Profile isOpen={isOn} onClose={() => setIsOn(!isOn)}/>
                    <div class="sticky topbar">
                      {/* insert image logo when created */}
                      <div className="logo1">
                             <div className="image"></div>
                             <p>CUNY Connect</p>
                         </div>
                     </div>
                     <div class="sticky separation"></div>
                     <div className="main">
                         <div class="sticky wrap">
                             <div className="sidebar">
                                 <div className="profile">
                                     <img className="pfp" src="../pfp.png"/>
                                     <span>{user.firstName} {user.lastName}</span>
                                 </div>
                                 <div className="selection">
                                     <Link to="/student/studentProfile">
                                         <button className="Profile"><img src="../profile_logo.png"></img>
                                         <span>Profile</span>
                                         </button>
                                 </Link> 
                                     <Link to="/student/studentHome">
                                         <button className="Home"><img src="../home_logo.png"></img>
                                             <span>Home</span>
                                         </button>
                                     </Link>
                                     <Link to = "/student/studentInternships">
                                         <button className="Internships"><img src="../inter_logo.png"></img>
                                             <span>Internships</span>
                                         </button>
                                     </Link>
                                     <Link to = "/chatbot">
                                <button className="Chatbot"><img src="../logochat.png"></img>
                                    <span>Chatbot</span>
                                </button>
                            </Link>
                                 </div>
                                 <div className="logout">
                                     <Link to="/">
                                         <FontAwesomeIcon icon={faLessThan} /><p>Log Out</p>
                                     </Link>
                                 </div>
                             </div>
                         </div>
                         <div className="display">
                             <div className="top">
                                 <img className="pfp" src="../pfp.png"/>
                                 <div className="background">
                                     blank
                                 </div>
                                 <div className="bio">
                                     <div className="info">
                                         <p>{user.firstName + " " + user.lastName}</p>
                                         <p>{user.Details.school} - {user.type}</p>
                                     </div>
                                     <div className="bioText">
                                         {/* <p>{text}</p> */}
                                     </div>
                                     <div className="btm">
                                         <button onClick={() => setIsOn(!isOn)} className="edit">
                                             Edit Profile
                                         </button>
                                     </div>
                                 </div>
                             </div>

                             <div className="other">
                                 <div className="posts2">
                                        <h1>Activity</h1>
                                        <div className="posts_small">
                                            {userPosts.length > 0 ? (
                                                userPosts.map(post => (
                                                    <div className="ps1" key={post._id}>
                                                        {post.postType === "poll" ? (
                                                            <>
                                                                <p>You posted this | {new Date(post.postTime).toLocaleString()}</p>
                                                                <p>{post.postContent.question}</p>
                                                                <ul>
                                                                    {post.postContent.options.map((option, index) => (
                                                                        <li key={index}>{option.text}</li>
                                                                    ))}
                                                                </ul>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p>You posted this | {new Date(post.postTime).toLocaleString()}</p>
                                                                <p>{post.postContent}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No posts found. Create your first post!</p>
                                            )}
                                        </div>
                                 </div>
                                 <div className="experience">
                                     <h1>Experience</h1>
                                     <div className="elist">
                                        {user.Details.experience && user.Details.experience.length > 0 ? (
                                            user.Details.experience.map((exp, index) => (
                                                <div key={index} className="experience-item">
                                                    <p>{exp.company}</p>
                                                    <p>{exp.position}</p>
                                                    <p>{exp.startDate} - {exp.endDate}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>None listed</p>
                                        )}
                                     </div>
                                 </div>
                                 <div className="education">
                                     <h1>Education</h1>
                                     <div className="ewrap">
                                         {/* <img className="school" src="../JJC_logo.png" height={50} width={50}></img> */}
                                         <p>{user.Details.school + " - " + user.Details.degree}</p>
                                     </div>
                                 </div>
                                 <div className="skills">
                                     <h1>Skills</h1>
                                     <div className="skill_list">
                                         <ul className="skill_list">
                                         {user.Details.skills.map((skill, index) => (
                                                <li key={index}>{skill}</li>
                                            ))}
                                         </ul>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}
export default Student_Profile
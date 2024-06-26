import { Link } from "react-router-dom";
import "../../styles/staffProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLessThan} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

function Staff_Profile(){
    
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

   
    return(
        <div className="student">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : user ? (
                <>
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
                                <span>{user.firstName + " " + user.lastName}</span>
                            </div>
                            <div className="selection">
                                <Link to="/staff/staffProfile">
                                    <button className="Profile"><img src="../profile_logo.png"></img>
                                    <span>Profile</span>
                                    </button>
                            </Link> 
                                <Link to="/staff/staffHome">
                                    <button className="Home"><img src="../home_logo.png"></img>
                                        <span>Home</span>
                                    </button>
                                </Link>
                                <Link to = "/staff/staffInternships">
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
                                <br></br>
                            </div>
                            <div className="bio">
                                <div className="info">
                                    <p>{user.firstName + " " + user.lastName}</p>
                                    <p>{user.school} - {user.type}</p>
                                </div>
                                <div className="bioText">
                                    <p>None</p>
                                </div>
                                <div className="btm">
                                    <button className="edit">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="other">
                            <div className="postJob">
                                
                                <h1>Are you Hiring?</h1>
                                <div className="ewrap">
                                    <img className="image" src="../post.png" height={100} width={150}></img>
                                    <p>Begin showcasing your job, internship or volunteer opportunity with students</p>
                                    <div className="create"><Link to= '/staff/createJob/'><button>Create</button></Link></div>
                                </div>
                            </div>
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
                            <div className="job_openings">
                                <h1>Internship Openings</h1>
                                <div className="elist">
                                    <div className="example">
                                        <img src="../placeholder.png" title="Company" height={80}width={100}></img>
                                        <div className="jobtitle">JOB TITLE</div>
                                        <p className="location">New York, New York</p>
                                        <p>1 Week ago</p>
                                    </div>

                                    <div className="example">
                                        <img src="../placeholder.png" title="Company" height={80}width={100}></img>
                                        <div className="jobtitle">JOB TITLE</div>
                                        <p className="location">New York, New York</p>
                                        <p>1 Week ago</p>
                                    </div>
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
export default Staff_Profile
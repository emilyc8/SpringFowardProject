import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLessThan } from "@fortawesome/free-solid-svg-icons";
import PostOverlay from '../postOverlay'
import ConnectButton from '../connectButton';
import UserPosts from "../userPost";

function StaffHome(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState('');

    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try{
                const userId = localStorage.getItem('userId');
                const response  = await axios.get(`http://127.0.0.1:5000/home?userId=${userId}`, userId);
                const response2 = await axios.get('http://127.0.0.1:5000/posts');
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
    }, []);

    const [isOn, setIsOn] = useState(false)
    const feedStyle = isOn ? { overflow: 'hidden', height: '100vh' } : {};

    return(
        
        <div className="feed" style={feedStyle}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : user ? (
                <>
                <PostOverlay isOpen={isOn} onClose={() => setIsOn(!isOn)}/>
                <div class="sticky topbar">
                    {/* insert image logo when created */}
                    <div className="logo1">
                        <div className="image"></div>
                        <p>CUNY Connect</p>
                    </div>
                </div>
                <div class="sticky separation"><br></br></div>
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
                                <Link to="/staff/staffInternships">
                                    <button className="Internships"><img src="../inter_logo.png"></img>
                                        <span>Internships</span>
                                    </button>
                                </Link>
                                <Link>
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
                    <div className="sticky  make">
                        <img className="pfp" src="../pfp.png"/>
                        <input type="text" className="add" placeholder="Make a Post" onClick={() => setIsOn(!isOn)} ></input>
                        <div className="media"><button onClick={() => setIsOn(!isOn)}><FontAwesomeIcon icon={faPlus} /></button></div>
                    </div>
                    <div className="posts">
                        <UserPosts userPosts={userPosts} />
                    </div>
                    <div className="sticky rightbar">
                        <div className="recommendations">
                            <h3>Recommended Users</h3>
                            <div className="person">
                                <img className="pfp" src="../pfp.png"/>
                                <div className="info">
                                    <p>Name - {user.type}</p>
                                    <p2>{user.school}</p2>
                                </div>
                                <ConnectButton className="connect"/>
                            </div>
                            <div className="person">
                                <img className="pfp" src="../pfp.png"/>
                                <div className="info">
                                    <p>Name - {user.type}</p>
                                    <p2>{user.school}</p2>
                                </div>
                                <ConnectButton className="connect"/>
                            </div>
                            <div className="person">
                                <img className="pfp" src="../pfp.png"/>
                                <div className="info">
                                    <p>Name - {user.type}</p>
                                    <p2>{user.school}</p2>
                                </div>
                                <ConnectButton className="connect"/>
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
export default StaffHome;
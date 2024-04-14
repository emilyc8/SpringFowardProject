import { Link } from "react-router-dom";
import { useState } from "react";
import '../../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLessThan } from "@fortawesome/free-solid-svg-icons";
import {faComment} from "@fortawesome/free-regular-svg-icons"
import LikeButton from '../likeButton'  
import PostOverlay from '../postOverlay'


function Home(){

    const numComments = 3;
    const name = "Full Name";
    let types = {
        type1: "Student", 
        type2: "Professor"
    };
    
    let schools = {
        school1: "Queens College",
        school2: "John Jay College",
        school3: "City College"
        // example of a few schools
    }

    //date variables
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const today = `${month}/${day}/${year}`;
    //time variables
    const hours = currentDate.getHours();
    const mins = ('0'+ currentDate.getMinutes()).slice(-2);

    let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
    labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
    aliquip ex ea commodo consequat.`

    //state variables
    const [isOn, setIsOn] = useState(false)
    const feedStyle = isOn ? { overflow: 'hidden', height: '100vh' } : {};

    return(
        <div className="feed" style={feedStyle}>
            <PostOverlay isOpen={isOn} onClose={() => setIsOn(!isOn)}/>
            <div class="sticky topbar">
                {/* insert image logo when created */}
                <div className="logo">
                    <p>Logo/</p>
                </div>
            </div>
            <div class="sticky separation"><br></br></div>
            <div className="main">
                <div class="sticky wrap">
                    <div className="sidebar">
                        <div className="profile">
                            <img className="pfp" src="../pfp.png"/>
                            <span>{name}</span>
                        </div>
                        <div className="selection">
                            <Link to="/student/studentProfile">
                                <button className="Profile"><img src="../profile_logo.png"></img>
                                <span>Profile</span>
                                </button>
                           </Link> 
                           <Link to="/student/studentProfile">
                                <button className="Home"><img src="../home_logo.png"></img>
                                    <span>Home</span>
                                </button>
                            </Link>
                            <Link to="/student/studentInternships">
                                <button className="Internships"><img src="../inter_logo.png"></img>
                                    <span>Internships</span>
                                </button>
                            </Link>
                        </div>
                        <div className="logout">
                        <Link to="/login">
                        <FontAwesomeIcon icon={faLessThan} /><p>Log Out</p>
                        </Link>
                    </div>
                    </div>
                </div>
                <div className="sticky make">
                    <img className="pfp" src="../pfp.png"/>
                    <input type="text" className="add" placeholder="Make a Post" onClick={() => setIsOn(!isOn)} ></input>
                    <div className="media"><button onClick={() => setIsOn(!isOn)}><FontAwesomeIcon icon={faPlus} /></button></div>
                </div>
                <div className="posts">
                    <div className="single">
                        <div className="top">
                            <Link to="/student/otherProfile"><img className="pfp" src="../pfp.png"/></Link>
                            <div className="info">
                                <p>{name} - {types.type1}</p>
                                <p>{today} at {`${hours}:${mins}`}</p>
                            </div>
                        </div>
                        <div className="postText">
                            {text}
                        </div>
                        <div className="interactions">
                            <button className="comments"><FontAwesomeIcon icon={faComment} /><span>{numComments}</span></button>
                            <LikeButton/>
                        </div>
                    </div>
                    <div className="singleImage">
                    <div className="top">
                        <Link to="/professor/profile_professor"><img className="pfp" src="../pfp.png"/></Link>
                            <div className="info">
                                <p>{name} - {types.type2}</p>
                                <p>{today} at {`${hours}:${mins}`}</p>
                            </div>
                        </div>

                        <div className="postText">
                            {text}
                        </div>

                        <div className="image">
                            <img src="../placeholder.png" alt="#placeholder" />
                        </div>

                        <div className="interactions">
                            <button className="comments"><FontAwesomeIcon icon={faComment} /><span>{numComments}</span></button>
                            <LikeButton/>
                        </div>
                    </div>
                    <div className="single">
                        <div className="top">
                            <img className="pfp" src="../pfp.png"/>
                            <div className="info">
                                <p>{name} - {types.type1}</p>
                                <p>{today} at {`${hours}:${mins}`}</p>
                            </div>
                        </div>

                        <div className="postText">
                            {text}
                        </div>

                        <div className="interactions">
                            <button className="comments"><FontAwesomeIcon icon={faComment} /><span>{numComments}</span></button>
                            <LikeButton/>
                        </div>
                    </div>
                </div>
                <div className="sticky rightbar">
                    <div className="recommendations">
                        <h3>Recommended Users</h3>
                        <div className="person">
                            <img className="pfp" src="../pfp.png"/>
                            <div className="info">
                                <p>{name} - {types.type1}</p>
                                <p2>{schools.school1}</p2>
                            </div>
                            <connectButton/>
                        </div>
                        <div className="person">
                            <img className="pfp" src="../pfp.png"/>
                            <div className="info">
                                <p>{name} - {types.type1}</p>
                                <p2>{schools.school2}</p2>
                            </div>
                            <connectButton/>
                        </div>
                        <div className="person">
                            <img className="pfp" src="../pfp.png"/>
                            <div className="info">
                                <p>{name} - {types.type1}</p>
                                <p2>{schools.school3}</p2>
                            </div>
                            <connectButton/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
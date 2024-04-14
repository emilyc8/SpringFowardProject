import { Link } from "react-router-dom";
import "../../styles/professorProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLessThan} from "@fortawesome/free-solid-svg-icons";

function Professor_Profile(){
    const name = "Full Name";
    
    let types = {
        type1: "Student", 
        type2: "Professor"
    };
    let schools = {
        school1: "Queens College",
        school2: "John Jay College",
        school3: "City College"

    }
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
    const year = currentDate.getFullYear();
    const today = `${month}/${day}/${year}`;
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    return(
        <div className="student">
            <div class="sticky topbar">
                {/* insert image logo when created */}
                <div className="logo">
                    <p>Logo/</p>
                </div>
            </div>
            <div class="sticky separation"></div>
            <div className="main">
                <div class="sticky wrap">
                    <div className="sidebar">
                        <div className="profile">
                            <img className="pfp" src="../pfp.png"/>
                            <span>Full Name</span>
                        </div>
                        <div className="selection">
                            <Link to="/professor/professorProfile">
                                <button className="Profile"><img src="../profile_logo.png"></img>
                                <span>Profile</span>
                                </button>
                           </Link> 
                            <Link to="/professor/professorHome">
                                <button className="Home"><img src="../home_logo.png"></img>
                                    <span>Home</span>
                                </button>
                            </Link>
                            <Link to = "/professor/professorInternships">
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
                <div className="display">
                    <div className="top">
                        <img className="pfp" src="../pfp.png"/>
                        <div className="background">
                            <br></br>
                        </div>
                        <div className="bio">
                            <div className="info">
                                <p>{name}</p>
                                <p>{schools.school1} - {types.type2}</p>
                            </div>
                            <div className="bioText">
                                <p>{text}</p>
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
                                <img className="school logo" src="../post.jpg" height={100} width={150}></img>
                                <p>Begin showcasing your job, internship or volunteer opportunity with students</p>
                                <button>Create</button>
                            </div>
                        </div>
                        <div className="posts2">
                            <h1>Activity</h1>
                            <div className="posts_small">
                                <div className="ps1">
                                    <p>You posted this | {today}</p>
                                    <p>{text}</p>

                                </div>
                                <div className="ps1">
                                    <p>You posted this | {today}</p>
                                    <p>{text}</p>
                                </div>
                            </div>
                            <button className="footer">Show All Posts <FontAwesomeIcon icon={faCaretDown} /></button>
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
        </div>
    );
}
export default Professor_Profile
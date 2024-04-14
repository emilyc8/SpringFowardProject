import { Link } from "react-router-dom";
import "../../styles/studentProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLessThan} from "@fortawesome/free-solid-svg-icons";

function Student_Profile(){
    const name = "Full Name";
    
    let types = {
        type1: "Student", 
        type2: "Professor"
    }
    let schools = {
        school1: "Queens College",
        school2: "John Jay College",
        school3: "City College"
        // example of a few schools
    }
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const today = `${month}/${day}/${year}`;
    let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`
   
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
                            <span>{name}</span>
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
                            <Link to = "/student/internships">
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
                            blank
                        </div>
                        <div className="bio">
                            <div className="info">
                                <p>{name}</p>
                                <p>{schools.school2} - {types.type1}</p>
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
                            {/* on click display all posts */}
                            <button className="footer">Show All Posts <FontAwesomeIcon icon={faCaretDown} /></button>
                        </div>
                        <div className="experience">
                            <h1>Experience</h1>
                            <div className="elist">
                                <img src="../placeholder.png"></img>
                                <div className="example">
                                    <div className="jobtitle">JOB TITLE</div>
                                    <p className="time">May {year-2} - June {year}</p>
                                    <p className="location">{schools.school3}</p>
                                </div>
                            </div>
                        </div>
                        <div className="education">
                            <h1>Education</h1>
                            <div className="ewrap">
                                <img className="school logo" src="../JJC_logo.png" height={50} width={50}></img>
                                <p>{schools.school2}</p>
                            </div>
                        </div>
                        <div className="skills">
                            <h1>Skills</h1>
                            <div className="skill_list">
                                <ul className="skill_list">
                                    <li>Writing</li>
                                    <li>Microsoft Excel</li>
                                    <li>Editing</li>
                                    <li>Adobe Photoshop</li>
                                </ul>
                                <div className="showall">
                                    <button className="footer">Show All Skills <FontAwesomeIcon icon={faCaretDown} /> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Student_Profile
import { Link } from "react-router-dom";
import '../../styles/internships.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import Load from '../postLoad';
import { useState, useEffect} from "react";
import {slice, concat } from 'lodash';
import axios from "axios";


const LENGTH = 12;
const DATA = [ ...Array(LENGTH).keys() ];
const LIMIT = 3;

export default function Internships(){

    const [active, setActive] = useState("two")
    const [internships, setInternships] = useState([]);
    const [savedInternships, setSavedInternships] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response3  = await axios.get(`http://127.0.0.1:5000/home?userId=${userId}`, userId);
                const response = await axios.get(`http://127.0.0.1:5000/internships?`);
                const response2 = await axios.get(`http://127.0.0.1:5000/savedInternships?userId=${userId}`);
                setSavedInternships(response2.data); 
                console.log(response2.data)
                setInternships(response.data);
                console.log(response.data);
                setUser(response3.data.user);
                
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="internships">
            <div class="sticky topbar">
                {/* insert image logo when created */}
                <div className="logo1">
                    <div className="image"></div>
                    <p>CUNY Connect</p>
                </div>
            </div>
            <div class="sticky separation"></div>
            <div className="main">
                <div class="stickywrap">
                    <div className="sidebar">
                        <div className="profile">
                            <img className="pfp" src="../pfp.png"/>
                            <span>{user.firstName + " " + user.lastName}</span>
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
                        </div>
                        <div className="logout">
                            <Link to="/">
                                <FontAwesomeIcon icon={faLessThan} /><p>Log Out</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className="up">
                        {/* columns */}
                        <div className="searchbar">
                            <input type="text" placeholder="Search"></input>
                        </div>
                        <div className="filters">
                            Filters
                        </div>
                        <div className="pick">
                            <div className="foryou">
                                <button onClick={() => setActive("one")}>FOR YOU</button>
                            </div>
                            <div className="all"></div>
                                <button onClick={() => setActive("two")}>ALL</button>
                            <div className="saved">
                                <button onClick={() => setActive("three")}>SAVED</button>
                            </div>
                        </div>
                    </div>
                    <div className="under">
                        {active === "two" && internships.map(internship => (
                                <Load key={internship._id} type="type1" internship={internship}/>
                            ))}
                        
                        {active === "three" && savedInternships.map(savedInternship => (
                                <Load key={savedInternship._id} type="type3" savedInternship={savedInternship} />
                            ))}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Link } from "react-router-dom";
import '../../styles/internships.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLessThan } from "@fortawesome/free-solid-svg-icons";
import Load from "../postLoad";
import { useState, useEffect } from "react";
import {slice, concat, } from 'lodash';
import axios from "axios";


export default function Internships2(){
    const [active, setActive] = useState("all")
    
    const [showMore,setShowMore] = useState(true);
    const [internships, setInternships] = useState([]);
    // const [index,setIndex] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/internships?`);
                setInternships(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };

        fetchData();
    }, []);

    // const loadMore = () => {
    //     const newIndex = index + 1;
    //     const newShowMore = newIndex < internships.length;
    //     setIndex(newIndex);
    //     setShowMore(newShowMore);
    // };

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
                            <span>Full Name</span>
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
                            <Link to="/chatbot">
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
                <div className="middle">
                    <div className="up">
                        <div className="searchbar">
                            <input type="text" placeholder="Search"></input>
                        </div>
                        <div className="filters">
                            Filters
                        </div>
                        <div className="pick">
                            <div className="all">
                                <button onClick={() => setActive("all")}>ALL</button>
                            </div>
                            <div className="posted">
                                <button onClick={() => setActive("posted")}>POSTED</button>
                            </div>
                        </div>
                    </div>
                    <div className="under">
                        {active === "all" && internships.map(internship => (
                            <Load key={internship._id} type="type1" internship={internship} />
                        ))}
                        {/* {active === "posted" && internships.map(internship => (
                            <Load key={internship._id} type="type3" internship={internship} />
                        ))} */}
                        {/* {active === "posted" && list2.map(() =><Load type = "type3"/>)} */}
                        {/* {active === "all" && showMore && <button className="loadMore" onClick={loadMore}> Load More </button>} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

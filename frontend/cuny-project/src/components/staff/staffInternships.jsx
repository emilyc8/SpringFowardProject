import { Link } from "react-router-dom";
import '../../styles/internships.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLessThan } from "@fortawesome/free-solid-svg-icons";
import Load from "../postLoad";
import { useState } from "react";
import {slice, concat, } from 'lodash';


const LENGTH = 12;
const DATA = [ ...Array(LENGTH).keys() ];
const LIMIT = 3;

export default function Internships2(){
    const [active, setActive] = useState("all")
    
    const [showMore,setShowMore] = useState(true);
    const [list,setList] = useState(slice(DATA, 0, LIMIT))
    const [list2,setList2] = useState(slice(DATA, 0, LIMIT))
    const [index,setIndex] = useState(LIMIT);

    const loadMore = () =>{
        const newIndex = index + LIMIT;
        const newShowMore = newIndex < (LENGTH - 1);
        const newList = concat(list, slice(DATA, index, newIndex));
        if (active) {
            setIndex(newIndex);
            setList(newList);
            setShowMore(newShowMore);
        }
    }

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
                            <div className="all"></div>
                                <button onClick={() => setActive("all")}>ALL</button>
                            <div className="posted">
                                <button onClick={() => setActive("posted")}>POSTED</button>
                            </div>
                        </div>
                    </div>
                    <div className="under">
                        {active === "all" && list.map(()=><Load type = "type1"/>)}
                        {active === "posted" && list2.map(() =><Load type = "type3"/>)}
                        {active === "all" && showMore && <button className="loadMore" onClick={loadMore}> Load More </button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

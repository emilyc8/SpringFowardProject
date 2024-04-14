import React from "react";

let list = {
    item1: "list item1",
    item2: "list item2",
    item3: "list item3",
    item4: "list item4",
    item5: "list item5"
}
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
const year = currentDate.getFullYear();
const today = `${month}/${day}/${year}`;
let description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
culpa qui officia deserunt mollit anim id est laborum.`

let name = 'Professor. Name'
let location = 'Remote'

function Open({isOpen, onClose, type}){
    if(type === "type1"){
        return(
            <>
                {
                    isOpen ? (
                        <div className="open">
                            <div className="close">
                                <button className="close" onClick={onClose}>X</button>
                            </div>
                            <div className="card">
                                    <div className="info">
                                        <h1 className='title'>TITLE</h1>
                                    </div>
                                    <div className="sub">
                                        <p>POSTED BY: <a>{name}</a> - LOCATION: {location}</p>
                                        <p className='date'>{today}</p>
                                    </div>
                                    <div className="desc">
                                        <h1>DESCRIPTION:</h1>
                                        <p>{description}</p>
                                    </div>
                                    <div className="qualifications">
                                        <h1>QUALIFICATIONS</h1>
                                        <ul>
                                            <li>{list.item1}</li>
                                            <li>{list.item2}</li>
                                            <li>{list.item3}</li>
                                            <li>{list.item4}</li>
                                            <li>{list.item5}</li>
                                        </ul>
                                    </div>
                                    <div className="responsiblities">
                                        <h1>RESPONSIBILITIES</h1>
                                        <p>{description}</p>
                                    </div>

                                    <div className="apply">
                                        <button className="apply">Apply</button>
                                        <button type = "submit" className="save">Save</button>
                                    </div>
                                </div>
                        </div>
                    ) :null
                }
            </>
        );
    } else if(type === "type3"){
        return(
            <>
                {
                    isOpen ? (
                        <div className="open2">
                            <div className="close">
                                <button className="close" onClick={onClose}>X</button>
                            </div>
                            <div className="card">
                                    <div className="info">
                                        <h1 className='title'>TITLE</h1>
                                    </div>
                                    <div className="sub">
                                        <p>POSTED BY: <a>{name}</a> - LOCATION: {location}</p>
                                        <p className='date'>{today}</p>
                                    </div>
                                    <div className="desc">
                                        <h1>DESCRIPTION:</h1>
                                        <p>{description}</p>
                                    </div>
                                    <div className="qualifications">
                                        <h1>QUALIFICATIONS</h1>
                                        <ul>
                                            <li>{list.item1}</li>
                                            <li>{list.item2}</li>
                                            <li>{list.item3}</li>
                                            <li>{list.item4}</li>
                                            <li>{list.item5}</li>
                                        </ul>
                                    </div>
                                    <div className="responsiblities">
                                        <h1>RESPONSIBILITIES</h1>
                                        <p>{description}</p>
                                    </div>

                                    <div className="edit">
                                        <button className="edit">Edit</button>
                                    </div>
                                </div>
                        </div>
                    ) :null
                }
            </>
        );
    }
}

export default Open;
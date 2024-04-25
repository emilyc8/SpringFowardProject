import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "./likeButton";
import InteractivePoll from "./interactivePoll";


function Post({ post }) {

    const { userId, postTime, postContent, firstName, lastName, type, postType } = post;
    const formattedPostTime = new Date(postTime).toLocaleString();

    console.log("Post object:", post);

    const renderPostContent = () => {
        if (postType === 'poll') {
            return <InteractivePoll poll={postContent} />;
        } else {
            return <div className="text-post-content">{postContent}</div>;
        }
    };

    return (
        <div className="single-post">
            <div className="post-info">
                <Link to={`/profile/${userId}`}>
                    <img className="pfp" src="../pfp.png" alt="Profile Picture" />
                </Link>
                <div className="info">
                    <p>{firstName + " " + lastName} - {type}</p>
                    <p>{formattedPostTime}</p>
                </div>
            </div>

            {renderPostContent()}

            <div className="interactions">
                <button className="comments">
                    <FontAwesomeIcon icon={faComment} />
                    <span>0</span>
                </button>
                <LikeButton />
            </div>
        </div>
    );
}

export default Post

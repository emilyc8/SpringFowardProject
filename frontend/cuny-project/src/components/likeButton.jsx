
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import { faHeart  as faHeartSolid }from '@fortawesome/free-solid-svg-icons';


function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleClick = () => {
        setLiked(!liked);
        if (!liked) {
            setLikes(likes + 1);  // Increase likes if it's about to be liked
        } else {
            setLikes(likes - 1);  // Decrease likes if it's about to be unliked
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`one ${liked ? 'liked' : ''}`}
            style={{ color: liked ? 'rgb(75, 171, 255)' : 'initial' }}
        >
            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular } />
            <span>{likes}</span>
        </button>
    );
}

export default LikeButton;
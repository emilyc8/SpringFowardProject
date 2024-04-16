import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';


function ConnectButton() {
  // State to manage if the user is followed (or button is clicked)
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle onClick event
  const handleOnClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button className="connect" 
        type='submit'
        onClick={handleOnClick}
        style={{ background: isClicked ? '#ACCDFF' : 'initial', color: isClicked ? '#ffff' : 'initial'}}
        >
      <FontAwesomeIcon className="follow" icon={isClicked ? faUserCheck : faUserPlus } />
    </button>
  );
}

export default ConnectButton;
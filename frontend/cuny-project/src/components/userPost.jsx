import Post from "./post";
import React from "react";

function UserPosts({ userPosts }) {
    console.log("UserPosts component - userPosts:", userPosts); 
    const isLoading = !userPosts;

    return (
      <div className="user-posts">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          userPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        )}
      </div>
    );
  }
  
  export default UserPosts;
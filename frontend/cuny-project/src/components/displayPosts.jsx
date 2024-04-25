import { useState, useEffect } from "react";

function Posts() {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [none, setNone] = useState('');

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                // Fetch user-specific posts data
                const response = await axios.get('http://127.0.0.1:5000/user-posts');
                setUserPosts(response.data.userPosts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    return (
        <div className="main">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : none ? (
                <p>No posts yet...</p>
            ) : (
                <div className="all-posts">
                    {userPosts.map((userData) => (
                        <div key={userData.userId}>
                            <h2>User ID: {userData.userId}</h2>
                            <UserPosts userPosts={userData.posts} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Posts;
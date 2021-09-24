import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username 
                ? await axios.get("https://node-social-backend-1990.herokuapp.com/api/posts/profile/" + username) 
                : await axios.get("https://node-social-backend-1990.herokuapp.com/api/posts/timeline/" + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                }));
        };
        fetchPosts();
    },[username, user._id])

    useEffect(() => {
        const setUserOnline = async () => {
            try {
                await axios.put("https://node-social-backend-1990.herokuapp.com/api/users/" + user._id,
                    {
                        userId: user._id,
                        isOnline: true,
                    });
    
            } catch(err) {
                console.log(err)
            }
        };
        setUserOnline()
    }, [user])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share user={user} />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}

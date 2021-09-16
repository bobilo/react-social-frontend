import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./comments.css";

export default function Comments({ userName, comment}) {
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://node-social-backend-1990.herokuapp.com/api/users?username=${userName}`);
            setUser(res.data);
        };
        fetchUser();
    },[userName])

    return (
        <div className="comments">
            <Link className="link" to={`/profile/${userName}`}>
                <img className="postProfileImg" 
                    src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} 
                    alt="" 
                />
            </Link>
            <div className="commentText">
                <span className="commentUser">{userName}</span>
                <span className="commentValue">{comment}</span>
            </div>
        </div>
    )
}

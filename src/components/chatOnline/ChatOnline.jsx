import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './chatOnline.css';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            try {
                    const res = await axios.get("https://node-social-backend-1990.herokuapp.com/api/users/friends/" + currentId);
                    setFriends(res.data);

                } catch(err) {
                console.log(err);
                }
        }

        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        const res = await axios.get(`https://node-social-backend-1990.herokuapp.com/api/conversations/find/${currentId}/${user._id}`);
        setCurrentChat(res.data);
    }

    return (
        <div className="chatOnline">
            {
                onlineFriends.map((o) => (
                    <div className="chatOnlineFriend" onClick={() => {handleClick(o)}}>
                        <div className="chatOnlineImgContainer">
                            <img className="chatOnlineImg" src={o.profilePicture ? PF + o.profilePicture : PF+"person/noAvatar.png"} alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o.username}</span>
                    </div>
                ))
            }
            
        </div>
    )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './conversation.css';

export default function Conversation({ conversation, currentUser }) {
    const [friend, setFriend] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getFriend = async () => {
            try {
                const res = await axios.get("https://node-social-backend-1990.herokuapp.com/api/users?userId=" + friendId);
                setFriend(res.data);

            } catch(err) {
                console.log(err);
            }
        };
        getFriend();
    }, [currentUser, conversation])

    return (
        <div className="conversation">
            <img src={friend.profilePicture ? PF + friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="conversationImg" />
            <span className="conversationName">{friend.username}</span>
        </div>
    )
}

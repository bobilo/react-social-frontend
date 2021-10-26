import React from 'react';
import "./message.css";
import {format} from "timeago.js";

export default function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="assets/person/noAvatar.png" alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messsageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}

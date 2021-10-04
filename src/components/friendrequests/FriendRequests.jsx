import "./friendrequests.css";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";

export default function FriendRequests({ user }) {
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleFollow = async() => {
        try {
            if(followed) {
                await axios.put("https://node-social-backend-1990.herokuapp.com/api/users/" + user._id + "/unfollow", {
                    userId: currentUser._id,
                });
                dispatch({type:"UNFOLLOW", payload: user._id})
            } else {
                await axios.put("https://node-social-backend-1990.herokuapp.com/api/users/" + user._id + "/follow", {
                    userId: currentUser._id,
                });
                dispatch({type:"FOLLOW", payload: user._id})
            }

        } catch(err) {
            console.log(err);
        }
        setFollowed(!followed);
    };

    return (
        <div>
            {
                (user._id !== currentUser._id) ? (
                    <div>
                        {
                          (currentUser.followers.includes(user._id) && !currentUser.followings.includes(user._id)) ? (
                            <li className="sidebarFriend">
                                <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
                                <span className="sidebarFriendName">{user.username}</span>
                                <button className="sidebarFollowButton" onClick={handleFollow}>
                                    {followed ? "Unfollow" : "Follow" }
                                    {followed ? <Remove /> : <Add /> }
                                </button>
                            </li>
                          ) : (
                            null
                          ) 
                        }  
                    </div>
                    
                ) : (
                    null
                )
            }
        </div>
    )
}

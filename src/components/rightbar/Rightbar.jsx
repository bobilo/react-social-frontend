import "./rightbar.css"
import { Users } from '../../dummyData';
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [user, currentUser.followings])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("https://node-social-backend-1990.herokuapp.com/api/users/friends/" + user._id);
                setFriends(friendList.data);

            } catch(err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

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

    const HomeRightbar = () => {
        return(
            <>
             <div className="birthdayContainer">
                   <img className="birthdayImg" src="/assets/gift.png" alt="" />
                   <span className="birthdayText">
                       {" "}
                       <b>John</b> and <b>3 other friends</b> have a birthday today
                    </span>
               </div>
               <img src="/assets/ad.png" alt="" className="rightbarAd" />
               <h4 className="rightbarTitle">Online Friends</h4>
               <ul className="rightbarFriendlist">
                   { Users.map((u) => (
                       <Online key={u.id} user={u} />
                   ))}
               </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return(
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleFollow}>
                    {followed ? "Unfollow" : "Follow" }
                    {followed ? <Remove /> : <Add /> }
                </button>
            )}
                <div className="userInfoContainer">
                    <h4 className="rightbarTitle">User information</h4>
                    {
                        (user._id === currentUser._id) ? (
                            <label><EditIcon htmlColor="RoyalBlue" className="editButtonIcon" /></label>
                        ) : (
                            null
                        )
                    }
                </div>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? "Single" 
                            : user.relationship === 2 ? "Married" 
                            : "Complicated"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link className="link" to={"/profile/"+friend.username}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                
            </>
        )
    }
    return (
        <div className="rightbar">
           <div className="rightbarWrapper">
              {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div> 
        </div>
    )
}

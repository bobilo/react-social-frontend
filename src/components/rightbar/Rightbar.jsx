import "./rightbar.css";
import Online from "../online/Online";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import EditProfileDialog from "../../dialogs/editProfileDialog/EditProfileDialog";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [birthdayFriends, setBirthdayFriends] = useState([]);
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
    const [open, setOpen] = useState(false);
    const [showBirthdayFriends, setShowBirthdayFriends] = useState(false);
    const birthdayMsg = useRef();
    const birthdayUserId = useRef();
    const birthdayUserName = useRef();

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

    useEffect(() => {
        const getBirthdayFriends = async () => {
            try {
                const birthdayFriendList = await axios.get("https://node-social-backend-1990.herokuapp.com/api/users/birthdayfriends/" + currentUser._id);
                setBirthdayFriends(birthdayFriendList.data);

            } catch(err) {
                console.log(err);
            }
        };
        getBirthdayFriends();
    }, [currentUser]);

    const toggleBirthdayFriends = () => {
        setShowBirthdayFriends(true);
    }

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
        window.location.reload();
    };

    const handleBirthdayPost = async(e) => {
        e.preventDefault();
        const newBirthday = {
            userId: currentUser._id,
            friendUserId: birthdayUserId.current.value,
            friendUserName: birthdayUserName.current.value,
            desc: birthdayMsg.current.value,
        }
        try {
            await axios.post("https://node-social-backend-1990.herokuapp.com/api/posts/timeline", newBirthday);
            window.location.reload();

        } catch(err) {
            console.log(err);
        }
    }

    const openEditProfileDialog = () => setOpen(true);

    const HomeRightbar = () => {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const birthdayFriendList = [];

        if (birthdayFriends.length > 0 ){
            birthdayFriends.map(friend => {
                if ((new Date(friend.dob).getDate() === dd) && (new Date(friend.dob).getMonth() + 1 === mm) && (friend.followers.includes(currentUser._id))) {
                    birthdayFriendList.push(friend);
                }
                return birthdayFriendList;
            })
        }
            
        return(
            <>
                {
                    (birthdayFriendList.length > 0) ? (
                        <div>
                            {
                                !showBirthdayFriends ? 
                                    <div className="birthdayContainer">
                                        <img className="birthdayImg" src="/assets/gift.png" alt="" />
                                        {
                                            birthdayFriendList.length > 1 ?
                                                <span className="birthdayText" onClick={toggleBirthdayFriends}>
                                                    <p><b>{birthdayFriendList[0].username}</b> and <b>{birthdayFriendList.length - 1} other friend(s)</b> have a birthday today</p>
                                                </span>
                                            :
                                                <span className="birthdayText" onClick={toggleBirthdayFriends}>
                                                    <p><b>{birthdayFriendList[0].username}</b> have a birthday today</p>
                                                </span>
                                        }    
                                    </div>
                                :
                                    <div>
                                        <h4 className="rightbarTitle">Today Birthdays</h4>
                                        <hr className="birthdayHr" />
                                        {
                                            birthdayFriendList.map((f) => (
                                                <div>
                                                    <div className="birthdays">
                                                        <Link className="link" to={`/profile/${f.username}`}>
                                                            <img className="userProfileImg" 
                                                                src={f.profilePicture ? PF + f.profilePicture : PF+"person/noAvatar.png"} 
                                                                alt="" 
                                                            />
                                                        </Link>
                                                        <div className="birthdayUser">
                                                            <span className="username">{f.username}</span>
                                                            <span className="dob">{new Date(f.dob).toDateString()}.  {Math.floor((new Date() - new Date(f.dob).getTime()) / 3.15576e+10)} years old</span>
                                                            <div>
                                                                {
                                                                    (f.gender === "Male") ? (
                                                                        <>
                                                                            <input className="postBirthdayInput" placeholder="Post on his timeline" ref={birthdayMsg} />
                                                                            <input className="postBirthdayInput" value={f._id} hidden ref={birthdayUserId} />
                                                                            <input className="postBirthdayInput" value={f.username} hidden ref={birthdayUserName} />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <input className="postBirthdayInput" placeholder="Post on her timeline" ref={birthdayMsg} />
                                                                            <input className="postBirthdayInput" value={f._id} hidden ref={birthdayUserId} />
                                                                            <input className="postBirthdayInput" value={f.username} hidden ref={birthdayUserName} />
                                                                        </>
                                                                    )
                                                                }
                                                                <button className="birthdayPostButton" onClick={handleBirthdayPost}>POST</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className="birthdayHr" />
                                                </div>  
                                            ))
                                        
                                        }
                                    </div>     
                            }
                        </div>
                    ) : (
                        null
                    )
                }
                        
               <img src="/assets/ad.png" alt="" className="rightbarAd" />
               <h4 className="rightbarTitle">Online Friends</h4>
               <ul className="rightbarFriendlist">
                   { birthdayFriends.map((u) => (
                       <Online key={u._id} user={u} />
                   ))}
               </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        const dob = user.dob;
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
                            <label><EditIcon htmlColor="RoyalBlue" className="editButtonIcon" onClick={openEditProfileDialog} /></label>
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
                        <span className="rightbarInfoKey">Gender:</span>
                        <span className="rightbarInfoValue">{user.gender}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Date of Birth:</span>
                        <span className="rightbarInfoValue">
                            {
                                dob ? (new Date(dob).toDateString()
                                ) : (
                                    null
                                )
                            }
                        </span>
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
                        <div>
                            {
                                (friend.followers.includes(user._id) && friend.followings.includes(user._id)) ? (
                                    <Link className="link" to={"/profile/"+friend.username}>
                                        <div className="rightbarFollowing">
                                            <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                            <span className="rightbarFollowingName">{friend.username}</span>
                                        </div>
                                    </Link>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    ))}
                </div>
                <EditProfileDialog
                    open={open}
                    user={user}
                    handleClose={() => setOpen(false)}
                />
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

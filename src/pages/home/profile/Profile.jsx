import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { IconButton } from "@material-ui/core";

import "./profile.css";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Feed from "../../../components/feed/Feed";
import Rightbar from "../../../components/rightbar/Rightbar";
import { AuthContext } from '../../../context/AuthContext';
import ProfilePhotoUploadDialog from "../../../dialogs/profilePhotoUploadDialog/ProfilePhotoUploadDialog";
import CoverPhotoUploadDialog from "../../../dialogs/coverPhotoUploadDialog/CoverPhotoUploadDialog";

export default function Profile() {
    const [user, setUser] = useState({});
    const {user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    const [openProfilePhotoUploadDialog, setProfilePhotoDialogOpen] = useState(false);
    const [openCoverPhotoUploadDialog, setCoverPhotoDialogOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://node-social-backend-1990.herokuapp.com/api/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    },[username])

    const openProfilePhotoDialog = () => setProfilePhotoDialogOpen(true);
    const openCoverPhotoDialog = () => setCoverPhotoDialogOpen(true);
    
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"} alt="" />
                            {
                                (user._id === currentUser._id) ? (
                                    <>
                                        <IconButton className="coverPhotoButton" onClick={openCoverPhotoDialog}>
                                            <AddAPhotoIcon htmlColor="LightSlateGrey" />
                                        </IconButton>
                                    </>
                                ) : (
                                    null
                                )
                            }
                            
                            <div className="profilePhoto">
                                {
                                    (user._id === currentUser._id) ? (
                                        <IconButton className="profilePhotoButton" onClick={openProfilePhotoDialog}>
                                            <AddAPhotoIcon htmlColor="LightSlateGrey" />
                                        </IconButton>
                                    ) : (
                                        null
                                    )
                                }
                                <img className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                            </div>
                            
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
                <ProfilePhotoUploadDialog 
                    open={openProfilePhotoUploadDialog}
                    user={user}
                    handleClose={() => setProfilePhotoDialogOpen(false)}
                />
                <CoverPhotoUploadDialog 
                    open={openCoverPhotoUploadDialog}
                    user={user}
                    handleClose={() => setCoverPhotoDialogOpen(false)}
                />
            </div>
        </>
    )
}

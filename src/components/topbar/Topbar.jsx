import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = async () => {
        try {
            await axios.put("https://node-social-backend-1990.herokuapp.com/api/users/" + user._id,
                {
                    userId: user._id,
                    isOnline: false,
                });

        } catch(err) {
            console.log(err)
        }
        
        dispatch({ type: "LOGOUT" });
        setAnchorEl(null);
      };
    
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="link">
                    <span className="logo">Bonface Social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                <Link to="/" className="link">
                    <span className="topbarLink">Homepage</span>
                </Link>
                <Link to={`/profile/${user.username}`} className="link">
                    <span className="topbarLink">Timeline</span>
                </Link>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <img src={
                        user.profilePicture 
                        ? PF + user.profilePicture 
                        : PF + "person/noAvatar.png"
                        } 
                        alt="" className="topbarImg" />
                </Button>
                <Menu 
                    className="menu"
                    id="simple-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Link to={`/profile/${user.username}`} className="link">
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>    
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Topbar;

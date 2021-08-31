import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        setAnchorEl(null);
        window.location.replace("/login");
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
                <Button aria-controls="simple-menu" aria-haspop="true" onClick={handleClick}>
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

import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import FriendsSuggestions from "../friendsuggestions/FriendsSuggestions";
import FriendRequests from "../friendrequests/FriendRequests";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const res = await axios.get("https://node-social-backend-1990.herokuapp.com/api/users/all");
        setUsers(res.data);

      } catch(err) {
        console.log(err);
      }
    };
    fetchUsers();
  })

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />Users
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>Users
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h4 className="sidebarTitle">Friend Requests</h4>
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <FriendRequests key={u.id} user={u} />
          ))}
        </ul>
        <h4 className="sidebarTitle">People you may know</h4>
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <FriendsSuggestions key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
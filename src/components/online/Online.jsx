import "./online.css"

export default function Online({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            { !user.isOnline ? 
               <p></p> 
            :
                <li className="rightbarFriend">
                    <div className="rightbarProfileImgContainer">
                        <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarProfileImg" />
                        <span className="rightbarOnline"></span>
                    </div>
                    <span className="rightbarUsername">{user.username}</span>
                </li>
            } 
        </div>
    )
}

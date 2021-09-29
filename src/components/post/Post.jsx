import axios from 'axios';
import './post.css';
import { MoreVert, Send, PlayArrow } from '@material-ui/icons';
import { useState, useEffect, useRef } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { AuthContext } from '../../context/AuthContext';
import Comments from '../comments/Comments';

export default function Post({ post }) {
    const comment = useRef();
    const [like, setLike] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments.length);
    const [isliked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const postComments = post.comments;
    

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://node-social-backend-1990.herokuapp.com/api/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    },[post.userId])

    const likeHandler = async () => {
        try {
            await axios.put("https://node-social-backend-1990.herokuapp.com/api/posts/" + post._id + "/like", {userId: currentUser._id});

        } catch(err) {
            console.log(err);
        }
        setLike(isliked ? like-1 : like+1)
        setIsLiked(!isliked)
    }

    const commentHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.put("https://node-social-backend-1990.herokuapp.com/api/posts/" + post._id + "/comment", {username: currentUser.username, comment: comment.current.value });

        } catch(err) {
            console.log(err);
        }
        setComments(comments+1)
        window.location.reload();
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`https://node-social-backend-1990.herokuapp.com/api/posts/${post._id}`, {
                data: {userId: currentUser._id }
            });
            window.location.reload();

        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link className="link" to={`/profile/${user.username}`}>
                            <img className="postProfileImg" 
                                src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} 
                                alt="" 
                            />
                        </Link>
                        {
                            (!post.friendUserId) ? (
                                <Link className="link" to={`/profile/${user.username}`}>
                                <span className="postUserName">
                                    {user.username}
                                </span>
                                </Link>
                            ) : (
                                <>
                                <Link className="link" to={`/profile/${user.username}`}>
                                    <span className="postUserName">
                                        {user.username} 
                                    </span>
                                </Link>
                                <PlayArrow />
                                <Link className="link" to={`/profile/${post.friendUserName}`}>
                                    <span className="postUserName">
                                        {post.friendUserName}
                                    </span>
                                </Link>
                                </>
                            )
                        }
                        
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MoreVert className="movertIcon"/>
                        </IconButton>
                        <Menu 
                            id="simple-menu"
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: 'absolute', horizontal: 'absolute' }}
                            transformOrigin={{ vertical: 'absolute', horizontal: 'absolute' }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >   
                            {
                                (post.userId === currentUser._id) ? (
                                    <>
                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem onClick={handleClose}>Hide post</MenuItem>
                                        <MenuItem onClick={handleClose}>Save post</MenuItem>
                                    </>
                                )    
                            }
                            
                        </Menu>    
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post?.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{comments} comments</span>
                    </div>
                </div>
                <hr className="postHr" />
                {
                    postComments.map((c) => (
                        <Comments 
                            userName={Object.keys(c)}
                            comment={Object.values(c)}
                        />
                    ))
                }
                <div className="postComment">
                    <Link className="link" to={`/profile/${currentUser.username}`}>
                        <img className="postProfileImg" 
                            src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF+"person/noAvatar.png"} 
                            alt="" 
                        />
                    </Link>
                    <input className="postCommentInput" placeholder="Write a comment" ref={comment} />
                    <Send className="commentIcon" onClick={commentHandler} />
                </div>
            </div>
        </div>
    )
}

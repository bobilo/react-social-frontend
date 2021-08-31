import { useRef, useContext } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall({ 
            email: email.current.value, 
            password: password.current.value 
        }, 
        dispatch);
    };

    const handleClick = () => {
        window.location.replace("/register");
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Bonfacesocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Bonfacesocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleLogin}>
                        <input placeholder="Email" required className="loginInput" type="email" ref={email} />
                        <input placeholder="Password" required className="loginInput" type="password" minLength="6" ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={handleClick}>
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Create a New Account"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

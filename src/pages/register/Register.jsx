import axios from "axios";
import { useRef } from "react"
import { useHistory } from "react-router";
import "./register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match!");

        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("https://node-social-backend-1990.herokuapp.com/api/auth/register", user);
                history.push("/login");

            } catch(err) {
                console.log(err);
            }
        }
    }

    const handleClick = () => {
        window.location.replace("/login");
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
                    <form className="loginBox" onSubmit={handleRegister}>
                        <input ref={username} placeholder="Username" required className="loginInput" />
                        <input ref={email} placeholder="Email" required className="loginInput" type="email" />
                        <input ref={password} placeholder="Password" required className="loginInput" type="password" />
                        <input ref={confirmPassword} placeholder="Confirm Password" required className="loginInput" type="password" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton" onClick={handleClick}>Login into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

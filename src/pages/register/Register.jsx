import axios from "axios";
import { useRef } from "react"
import { useHistory } from "react-router";
import "./register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const dob  = useRef();
    const gender = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match!");

        } else {
            console.log(dob.current.value);
            const user = {
                username: username.current.value,
                email: email.current.value,
                dob: dob.current.value,
                gender: gender.current.value,
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
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Bonfacesocial</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on Bonfacesocial.
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleRegister}>
                        <input ref={username} placeholder="Username" required className="registerInput" />
                        <input ref={email} placeholder="Email" required className="registerInput" type="email" />
                        <input ref={dob} required className="registerInput" type="text" 
                            onFocus={(e) => (e.currentTarget.type = "date")}
                            onBlur={(e) => (e.currentTarget.type = "text")}
                            placeholder="Date of Birth" 
                        />
                        <select placeholder="Gender" className="registerInput" ref={gender} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input ref={password} placeholder="Password" required className="registerInput" type="password" />
                        <input ref={confirmPassword} placeholder="Confirm Password" required className="registerInput" type="password" />
                        <button className="registerButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton" onClick={handleClick}>Login into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

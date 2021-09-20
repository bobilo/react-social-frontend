import axios from "axios";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./resetpassword.css";

export default function ResetPassword() {
    const password = useRef();
    const { user } = useContext(AuthContext);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://node-social-backend-1990.herokuapp.com/api/users/${user._id}`, {
                userId: user._id,
                password: password.current.value
            });
            localStorage.setItem("user", null);
            window.location.replace("/login");
            
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <div className="reset">
            <div className="resetWrapper">
                <div className="resetLeft">
                    <h3 className="resetLogo">Bonfacesocial</h3>
                    <span className="resetDesc">
                        Connect with friends and the world around you on Bonfacesocial.
                    </span>
                </div>
                <div className="resetRight">
                    <form className="resetBox" onSubmit={handlePasswordReset}>
                        <input placeholder="New Password" required className="resetInput" type="password" minLength="6" ref={password} />
                        <button className="resetButton" type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

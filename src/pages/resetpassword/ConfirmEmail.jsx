import { CircularProgress } from "@material-ui/core";
import { useContext, useRef } from "react";
import { confirmUserCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./resetpassword.css";

export default function ConfirmEmail() {
    const email = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmUserCall({
            email: email.current.value
        },
        dispatch);     
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
                    <form className="resetBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" required className="resetInput" type="email" ref={email} />
                        <button className="resetButton" type="submit">
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Confirm Email"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });

    try {
        const res = await axios.post("https://node-social-backend-1990.herokuapp.com/api/auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch(err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};

export const confirmUserCall = async (userEmail, dispatch) => {
    dispatch({ type: "CONFIRM_USER_START" });

    try{
        const res = await axios.post("https://node-social-backend-1990.herokuapp.com/api/auth/confirmuser", userEmail);
        dispatch({ type: "CONFIRM_USER_SUCCESS", payload: res.data });

    } catch(err) {
        dispatch({ type: "CONFIRM_USER_FAILURE", payload: err });
    }
};
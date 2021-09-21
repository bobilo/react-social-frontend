import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    resetUser: JSON.parse(localStorage.getItem("resetUser")) || null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("resetUser", JSON.stringify(state.resetUser));
    }, [state.user, state.resetUser]);
    
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                resetUser: state.resetUser,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
                {children}
            </AuthContext.Provider>
    );
};
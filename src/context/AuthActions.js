export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const Logout = () => ({
    type: "LOGOUT",
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const ConfirmUserStart = (userEmail) => ({
    type: "CONFIRM_USER_START",
});

export const ConfirmUserSuccess = (user) => ({
    type: "CONFIRM_USER_SUCCESS",
    payload: user,
});

export const ConfirmUserFailure = (error) => ({
    type: "CONFIRM_USER_FAILURE",
    payload: error
});
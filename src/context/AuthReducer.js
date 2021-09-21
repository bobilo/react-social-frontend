const AuthReducer = (state, action) => {
    switch(action.type){
       case "LOGIN_START":
           return {
               user: null,
               resetUser: null,
               isFetching: true,
               error: false,
           };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                resetUser: null,
                isFetching: false,
                error: false,
            };

        case "LOGIN_FAILURE":
            return {
                user: null,
                resetUser: null,
                isFetching: false,
                error: action.payload,
            };
        case "CONFIRM_USER_START":
            return {
                user: null,
                resetUser: null,
                isFetching: true,
                error: false,
            };

        case "CONFIRM_USER_SUCCESS":
            return {
                user: null,
                resetUser: action.payload,
                isFetching: false,
                error: false,
            };

        case "CONFIRM_USER_FAILURE":
            return {
                user: null,
                resetUser: null,
                isFetching: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                resetUser: null,
                isFetching: false,
                error: false,
            };    
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };

        default:
            return state;
    }
}

export default AuthReducer;
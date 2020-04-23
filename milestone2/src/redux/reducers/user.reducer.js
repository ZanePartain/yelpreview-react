
export const setUser = (user) => {
    return {
        type: 'SETUSER',
        payload: user
    };
};

const initialAppState = {
    user: {}
};

const userReducer = (state=initialAppState, action) => {
    switch(action.type) {
        case 'SETUSER':
            return {...state, user: action.payload};

        default:
            return state;
    }
}

export default userReducer;
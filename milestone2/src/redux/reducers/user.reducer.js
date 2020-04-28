export const setUser = (user) => {
    return (dispatch) => {
        dispatch(setUserOnly(user));
        let friendsPromise = getFriends(user);
        friendsPromise.then((friends) => dispatch(setFriendsOnly(friends)));
        friendsPromise.then(getTips).then((tips) => dispatch(setTipsOnly(tips)));
    }
};

const getTips = (friends) => Promise.all(
    friends.map((friend, index) => {
        fetch(
            'http://localhost:3000/tip/latestByUser/' + friend.id,
            {method: 'GET'})
            .then((resp) => {
                return resp.json();
            }).catch((err) => console.log(err))
    })
).then((tips) => tips.filter((tip) => tip != null))

const getFriends = (user) => fetch(
    'http://localhost:3000/friend/friendsOf/' + user.id,
    {method: 'GET'}
).then((resp) => {
    return resp.json();
}).catch((err) => console.log(err))

const setUserOnly = (user) => {
    return {
        type: 'SETUSER',
        payload: user
    };
};

const setFriendsOnly = (friends) => {
    return {
        type: 'SETFRIENDS',
        payload: friends
    };
};

const setTipsOnly = (tips) => {
    console.log(tips);
    return {
        type: 'SETTIPS',
        payload: tips
    };
};

const initialAppState = {
    user: {},
    friends: [],
    tips: []
};

const userReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case 'SETUSER':
            return {...state, user: action.payload};

        case 'SETFRIENDS':
            return {...state, friends: action.payload};

        case 'SETTIPS':
            return {...state, tips: action.payload};

        default:
            return state;
    }
}

export default userReducer;
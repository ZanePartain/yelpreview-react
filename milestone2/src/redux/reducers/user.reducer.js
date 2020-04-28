export const setUser = (user) => {
    return (dispatch) => {
        dispatch(setUserOnly(user));
        let friendsPromise = getFriends(user);
        friendsPromise.then((friends) => dispatch(setFriendsOnly(friends)));
        friendsPromise.then(getTips).then((tips) => dispatch(setTipsOnly(tips)));
    }
};

const getTips = (friends) => {
    let promises = friends.map((friend, index) => {
        return fetch(
            'http://localhost:3000/tip/latestByUser/' + friend.id,
            {method: 'GET'}
        ).then((resp) => {
            return resp.json();
        }).catch((err) => console.log(err))
    });
    let all = Promise.all(promises);
    return all.then(arr => arr.filter(tip => tip != null));
}

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
    return {
        type: 'SETTIPS',
        payload: tips
    };
};

export const setName = (name) => {
    return (dispatch) => {
        dispatch(setNameOnly(name));
        fetch(
            'http://localhost:3000/user/byName/' + name,
            {method: 'GET'}
        ).then((resp) => {
            return resp.json();
        }).then(userList => {
            dispatch(setMatchingOnly(userList))
        }).catch(err =>{
            console.log(err);
        });
    }
}

const setNameOnly = (name) => {
    return {
        type: 'SETNAME',
        payload: name
    }
}

const setMatchingOnly = (matchingUsers) => {
    return {
        type: 'SETMATCHINGUSERS',
        payload: matchingUsers
    }
}

export const setUserMatchingID = (userID) => {
    return {
        type: 'SETUSER',
        payload: this.props.matchingUsers.find(
            (elem) => {
                return elem.id === userID;
            }
        )
    }
}

const initialAppState = {
    user: {},
    friends: [],
    tips: [],
    name: '',
    usersMatchingName: []
};

const userReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case 'SETUSER':
            return {...state, user: action.payload};

        case 'SETFRIENDS':
            return {...state, friends: action.payload};

        case 'SETTIPS':
            return {...state, tips: action.payload};

        case 'SETNAME':
            return {...state, name: action.payload};

        case 'SETMATCHINGUSERS':
            return {...state, usersMatchingName: action.payload}

        default:
            return state;
    }
}

export default userReducer;
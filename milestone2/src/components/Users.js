import React, {Component} from "react";
import UserSelect from "./UserSelect";
import UserInfo from "./UserInfo";
import FriendsList from "./FriendsList";


class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UserSelect/>
                <UserInfo/>
                <FriendsList/>
            </div>
        )
    }
}

export default Users;

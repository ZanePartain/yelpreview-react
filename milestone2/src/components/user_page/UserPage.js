import React, {Component} from "react";
import UserSelect from "./UserSelect";
import UserInfo from "./UserInfo";
import FriendsList from "./FriendsList";
import LatestTips from "./LatestTips";
import {Col, Row} from "reactstrap";


class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Row>
                            <UserSelect/>
                            <UserInfo/>
                        </Row>
                        <FriendsList/>
                    </Col>
                    <LatestTips/>
                </Row>
            </div>
        )
    }
}

export default Users;

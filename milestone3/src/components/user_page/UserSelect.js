import React, {Component} from "react";
import {Col, Input, InputGroup, Label} from "reactstrap";
import {connect} from "react-redux";
import {setName, setUser} from "../../redux/reducers/user.reducer";


class UserSelect extends Component {
    constructor(props) {
        super(props);
    }

    updateUserList = (e) => {
        let name = e.target.value;
        this.props.handleSetName(name);
    }

    updateSelectedUser = (e) => {
        let userID = e.target.value;
        this.props.handleSetUser(this.props.matchingUsers.find(
            (elem) => {
                return elem.id === userID;
            }));
    }

    render() {
        return (
            <div >
                <InputGroup >
                    <Col >
                        <Label for='name'>Name</Label>
                        <Input placeholder='Name' name='name' onChange={this.updateUserList} />
                        <Input type='select' name='selectedUser' onChange={this.updateSelectedUser}>
                            {
                                this.props.matchingUsers.map((user, index) => {
                                    return (
                                        <option key={index} value={user.id} id={user.id}>{user.id}</option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                </InputGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        matchingUsers: state.user.usersMatchingName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetUser: (newUser) => dispatch(setUser(newUser)),
        handleSetName: (newName) => dispatch(setName(newName)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSelect);

import React, {Component} from "react";
import {Col, Input, InputGroup, Label} from "reactstrap";
import {connect} from "react-redux";
//import {setUser} from "../../redux/reducers/user.reducer";


class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchingUsers: []
        }
    }

    updateUserList = e => fetch(
        'http://localhost:3000/user/byName/' + e.target.value,
        {method: 'GET'}
        ).then((resp) => {
            return resp.json();
        }).then(userList => {
            this.setState({matchingUsers: userList})
        }).catch(err =>{
            console.log(err);
        });

    updateSelectedUser = (e) => {
        console.log(e.target);
        this.props.handleSetUser(this.state.matchingUsers.find(
            (elem) => {
                return elem.id === e.target.value;
            }
        ));
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <Col>
                        <Label for='name'>Name</Label>
                        <Input placeholder='Name' name='name' onChange={this.updateUserList} />
                        <Input type='select' name='selectedUser' onChange={this.updateSelectedUser}>
                            {
                                this.state.matchingUsers.map((user, index) => {
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //handleSetUser: (newUser) => dispatch(setUser(newUser)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSelect);

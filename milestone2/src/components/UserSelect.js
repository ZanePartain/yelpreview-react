import React, {Component} from "react";
import {Col, Input, InputGroup, Label} from "reactstrap";


class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchingUsers: [],
            selectedUser: {}
        }
    }

    updateUserList = e => fetch(
        'http://localhost:3000/user/byName/' + e.target.value,
        {method: 'GET'}
        ).then((resp) => {
            console.log(resp);
            return resp.json();
        }).then(userList => {
            console.log(userList);
            this.setState({matchingUsers: userList})
        }).catch(err =>{
            console.log(err);
        });


    render() {
        return (
            <div>
                <InputGroup>
                    <Col>
                        <Label for={'name'}>Name</Label>
                        <Input placeholder={'Name'} name={'name'} onChange={this.updateUserList} />
                        <Input type={'select'} name={'selectedUser'}>
                            {
                                this.state.matchingUsers.map((user, index) => {
                                    return (
                                        <option key={index} value={user} id={user}>{user.id}</option>
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

export default UserSelect;
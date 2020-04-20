import React, {Component} from "react";
import {Input, InputGroup} from "reactstrap";


class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            matchingUsers: [],
            selectedUser: {}
        }
    }

    updateUserList = e => fetch(
        'http://localhost:3000/user/byName/' + this.state.name,
        {method: 'GET'}
        ).then((resp) => {
            let userList = resp.json();
            this.setState({matchingUsers: userList})
        }).catch(err =>{
            console.log(err);
        });


    render() {
        return (
            <div>
                <InputGroup>
                    <Input placeholder={'Name'} name={'name'} onChange={this.updateUserList} />
                    <Input type={'select'} name={'selectedUser'}>
                        {
                            this.state.matchingUsers.map((user, index) => {
                                return (
                                    <option key={index} value={user} id={user}>{user}</option>
                                )
                            })
                        }
                    </Input>
                </InputGroup>
            </div>
        )
    }
}

export default UserSelect;
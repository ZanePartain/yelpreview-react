import React, {Component} from "react";
import {Input, InputGroup, Table, Button} from "reactstrap";
import {connect} from "react-redux";
import {setName, setUser} from "../../redux/reducers/user.reducer";


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null
        }
    }

    updateLocation = () => {
        fetch(
            'http://localhost:3000/user/setLocation/' + this.props.user.id + '/' + this.state.latitude + '/' + this.state.longitude,
            {method: 'POST'}
            ).catch(err => console.log(err))
    }

    render() {
        //if (this.props.user) {
            return (
                <div>
                    User Info
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <InputGroup>
                                        <Input value={this.props.user.name}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Stars</td>
                                <td>
                                    <InputGroup>
                                        <Input value={this.props.user.stars}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Fans</td>
                                <td>
                                    <InputGroup>
                                        <Input value={this.props.user.fans}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Yelping Since</td>
                                <td>
                                    <InputGroup>
                                        <Input value={this.props.user.yelping_since}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Votes</td>
                                <td>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Funny</td>
                                                <td>
                                                    <InputGroup>
                                                        <Input value={this.props.user.funny}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Cool</td>
                                                <td>
                                                    <InputGroup>
                                                        <Input value={this.props.user.cool}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Useful</td>
                                                <td>
                                                    <InputGroup>
                                                        <Input value={this.props.user.useful}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                            <tr>
                                <td>Tip Count</td>
                                <td>
                                    <InputGroup>
                                        <Input value={this.props.user.tip_count}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Total Tip Likes</td>
                                <td>
                                    <InputGroup>
                                        <Input value={this.props.user.total_likes}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Latitude</td>
                                                <td>
                                                    <InputGroup>
                                                        <Input value={this.props.user.latitude} onChange={(e) => this.setState({latitude: e.target.value})}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Longitude</td>
                                                <td>
                                                    <InputGroup>
                                                        <Input value={this.props.user.longitude} onChange={(e) => this.setState({longitude: e.target.value})}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={this.updateLocation}>Update Location</Button>
                </div>
            );
        // } else {
        //     return (
        //         <div>
        //             Select a user
        //         </div>
        //     )
        // }
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
        handleSetName: (newName) => dispatch(setName(newName)),
        handleSetUser: (newUser) => dispatch(setUser(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
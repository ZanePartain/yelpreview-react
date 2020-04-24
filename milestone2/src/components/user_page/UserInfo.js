import React, {Component} from "react";
import {Input, InputGroup, Table} from "reactstrap";
import {connect} from "react-redux";


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                                                        <Input value={this.props.user.latitude}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Longitude</td>
                                                <td>
                                                    <InputGroup>
                                                        <Input value={this.props.user.longitude}/>
                                                    </InputGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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
    };
};

export default connect(mapStateToProps)(UserInfo);
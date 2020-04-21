import React, {Component} from "react";
import {Table} from "reactstrap";


class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stars</th>
                        <th>Fans</th>
                        <th>Yelping Since</th>
                        <th>Funny</th>
                        <th>Cool</th>
                        <th>Useful</th>
                        <th>Tip Count</th>
                        <th>Total Tip Likes</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.friends.map((friend, index) => {
                        return (
                            <tr>
                                <td>{friend.name}</td>
                                <td>{friend.stars}</td>
                                <td>{friend.fans}</td>
                                <td>{friend.yelping_since}</td>
                                <td>{friend.funny}</td>
                                <td>{friend.cool}</td>
                                <td>{friend.useful}</td>
                                <td>{friend.tip_count}</td>
                                <td>{friend.total_likes}</td>
                                <td>{friend.latitude}</td>
                                <td>{friend.longitude}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default FriendsList;
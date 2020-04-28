import React, {Component} from "react";
import {Table} from "reactstrap";
import {connect} from "react-redux";

class LatestTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.friends !== prevProps.friends) {
            this.updateTips();
        }
    }

    updateTips() {
        let tips = [];
        this.props.friends.map((friend, index) => {
            fetch(
                'http://localhost:3000/tip/latestByUser/' + friend.id,
                {method: 'GET'}
            ).then((resp) => {
                return resp.json()
            }).then((tip) => {
                tips.push(tip)
            })
        })

        this.setState({tips: tips})
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Posted By</th>
                        <th>Business</th>
                        <th>City</th>
                        <th>Text</th>
                        <th>Date</th>
                        <th>Likes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tips.map((tip, index) => {
                        return (
                            <tr>
                                <td>{tip.user.name}</td>
                                <td>{tip.business.name}</td>
                                <td>{tip.business.city}</td>
                                <td>{tip.text}</td>
                                <td>{tip.date}</td>
                                <td>{tip.likes}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        friends: state.user.friends
    };
};

export default connect(mapStateToProps)(LatestTips);
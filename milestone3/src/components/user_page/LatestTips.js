import React, {Component} from "react";
import {Table} from "reactstrap";
import {connect} from "react-redux";

class LatestTips extends Component {
    constructor(props) {
        super(props);
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
                    {this.props.tips.map((tip, index) => {
                        return (
                            <tr>
                                <td>{tip.user_name}</td>
                                <td>{tip.business_name}</td>
                                <td>{tip.business_city}</td>
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
        tips: state.user.tips
    };
};

export default connect(mapStateToProps)(LatestTips);
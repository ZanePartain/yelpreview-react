import React, {Component} from "react";
import {Table} from "reactstrap";

class LatestTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: []
        }
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

export default LatestTips;
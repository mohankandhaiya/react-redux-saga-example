import React, { Component } from 'react'
import { Divider } from 'antd'
import Comments from "../comments";

class Review extends Component {
    render() {
        return (
            <div className="review-container">
                <div className="font">Review</div>
                <Divider />
                <Comments />
            </div>
        )
    }
}

export default Review

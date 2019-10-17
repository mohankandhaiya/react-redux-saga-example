import React, { Component } from 'react'
import { Divider } from 'antd'
import Comments from "../comments";

class Review extends Component {
    render() {
        return (
            <div className="review-container">
                <div>Review</div>
                <Divider />
                <Comments />
                <Divider />
                <Comments />
                <Divider />
                <Comments />
            </div>
        )
    }
}

export default Review

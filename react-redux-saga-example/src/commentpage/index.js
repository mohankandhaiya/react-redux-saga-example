import React, { Component } from 'react'
import Index from "../post";
import Ratings from "../Ratings";
import Review from "../review";

class CommentPage extends Component {
    render() {
        return (
            <div>
                <Index />
                <Ratings />
                <Review />
            </div>
        )
    }
}

export default CommentPage

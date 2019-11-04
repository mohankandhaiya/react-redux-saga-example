import React, { Component } from 'react'
import {Table, Tooltip} from 'antd';
import moment from 'moment';
import {connect} from "react-redux";
import {store} from "../store";
import actions from "../constants";

class Index extends Component {

    componentDidMount(){
        // store.dispatch({type: actions.CATEGORY})
    }

    comments = (x) =>
        <div>
            <div>{ x.Comments }</div>
            <div>Posted by <span className="orange-color">{x.Username}</span></div>
        </div>;

    render() {

        const Comments = this.props.comments;

        return (
            <div className="post-container">
                <div className="orange-color">{this.props.role}</div>
                {/*<div className="title">Topics</div>*/}
                { Comments &&
                    Comments.data.data.map(this.comments)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data.Comments);
    return {
        topics: state.data.Topics,
        userId: state.data.UserId.data,
        role: state.data.Role.data.Role,
        comments: state.data.Comments
    }
};

export default connect(mapStateToProps)(Index)
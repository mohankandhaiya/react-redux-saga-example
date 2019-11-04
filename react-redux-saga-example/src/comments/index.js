import React, { Component } from 'react'
import {Comment, Tooltip, Avatar, Divider, Rate} from 'antd';
import moment from 'moment';
import {connect} from "react-redux";

class Comments extends Component {

    reviews = (x) =>
        <div>
            <Comment
                author={ <a className="orange-color">{x.Name}</a> }
                avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                content={ <p>{x.Comments}</p> }
                datetime={ <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}> <span>{moment().fromNow()}</span> </Tooltip> }
            />
            <Rate allowHalf style={{ fontSize: 16, paddingLeft: 45 }} value={x.Stars} />
            <Divider />
        </div>;

    render() {

        const Reviews = this.props.reviews;

        return (
            <div>
            {   Reviews &&
                Reviews.data.data.map(this.reviews)
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data.Reviews);
    return {
        userId: state.data.UserId.data,
        role: state.data.Role.data.Role,
        comments: state.data.Comments,
        reviews: state.data.Reviews
    }
};

export default connect(mapStateToProps)(Comments)
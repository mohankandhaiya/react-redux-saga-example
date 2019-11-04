import React from "react";
import { Tooltip, Avatar, Rate, Comment, Icon } from 'antd';
import moment from 'moment';
import {store} from "../store";
import actions from "../constants";
import {connect} from "react-redux";

class CommentPage extends React.Component {

    state = {
        likes: 0,
        dislikes: 0,
        action: null,
    };

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    componentDidMount(){
        store.dispatch({type: actions.COMMENTS, payload: this.props.name})
    }

    render() {

        const { likes, dislikes, action } = this.state;

        const actions = [
            <span key="comment-basic-like">
            <Tooltip title="Like">
              <Icon
                  type="like"
                  theme={action === 'liked' ? 'filled' : 'outlined'}
                  onClick={this.like}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
          </span>,
            <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
              <Icon
                  type="dislike"
                  theme={action === 'disliked' ? 'filled' : 'outlined'}
                  onClick={this.dislike}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
          </span>,
            <span key="comment-basic-reply-to">Reply to</span>,
        ];

        return (
            <div>
                <div className="post-container">
                    <div className="category">Category name</div>
                    <div className="title">Title</div>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <div>
                        <div> Posted by Mohan Kandhaiya </div>
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="center rate-container">
                    <Rate />
                    <p>(2 Ratings)</p>
                    <p>Click the above star to rate it.</p>
                </div>
                <Comment
                    actions={actions}
                    author={this.props.name}
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    content={
                        <p>
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes beautifully
                            and efficiently.
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data);
    return {
        name: state.data
    }
};

export default connect(mapStateToProps)(CommentPage)
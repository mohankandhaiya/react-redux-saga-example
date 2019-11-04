import React, { Component } from 'react'
import Index from "../post";
import Ratings from "../Ratings";
import Review from "../review";
import {connect} from "react-redux";
import {Avatar, Button, Comment, Divider, Input, Modal, Rate, Tooltip} from "antd";
import moment from "moment";
import {BrowserRouter} from "react-router-dom";
import {store} from "../store";
import actions from "../constants";

const { TextArea } = Input;

class CommentPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    componentDidMount(){
        // store.dispatch({type: actions.TOPICS, payload: this.props.userId})
        store.dispatch({type: actions.COMMENTS, payload: this.props.author});
        store.dispatch({type: actions.REVIEWS, payload: this.props.author});
        store.dispatch({type: actions.AVERAGE_RATING, user: this.props.author});
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({ comments: e.target.value });
    };

    changeHandler =  value => {
        console.log(value);
        this.setState({ rate: value });
    };

    showModal = () => {
        console.log("Clicked the button Visible");
        return this.props.history.push("/categories/topics/comment/rate");
    };

    addTopics = () => {
        return this.props.history.push("/categories/topics/add");
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    submitHandler = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const payload= this.state;
                const { dispatch } = this.props;
                dispatch({type: 'POST_COMMENTS', payload: {payload}});
            }
        });
    };

    rate = (x) =>
        <div className="post-container center" onClick={this.showModal}>
            <div className="bold font">Ratings</div>
            <Rate allowHalf style={{ fontSize: 20 }} value={x.avg} />
            <div>Click the above star to rate it.</div>
        </div>;

    comments = (x) =>
        <div>
            <div>{ x.Topics }</div>
            <div>Posted by <span className="orange-color">{x.Name}</span></div>
        </div>;

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

        const Comments = this.props.comments;
        const Rate = this.props.rate;
        const Reviews = this.props.reviews;
        const { loading, rate, comments } = this.state;
        const { visible } = this.state;

        return (
            <div>
                <BrowserRouter>
                {/*<Index />*/}
                <div className="post-container">
                    <div className="orange-color">{this.props.role}</div>
                    {/*<div className="title">Topics</div>*/}
                    { Comments &&
                    Comments.data.data.map(this.comments)
                    }
                </div>
                <div>
                    { Rate &&
                    Rate.data.data.map(this.rate)
                    }
                </div>
                <div className="review-container">
                    <div className="font">Review</div>
                    <Divider />
                    <div>
                        {   Reviews &&
                        Reviews.data.data.map(this.reviews)
                        }
                    </div>
                </div>
                    <Modal
                        title="Ratings & Feedback"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" className="modal-button" onClick={this.handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" className="modal-button" loading={loading} onClick={this.submitHandler}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <div className="center">
                            <Rate onChange={this.changeHandler} value={rate} />
                            <p>Click the above star to rate it.</p>
                        </div>

                        <p>Comments</p>
                        <TextArea
                            value={comments}
                            onChange={this.onChange}
                            rows={5}
                        />
                        <TextArea rows={4} />
                    </Modal>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data);
    return {
        topics: state.data.Topics,
        userId: state.data.UserId.data,
        role: state.data.Role.data.Role,
        comments: state.data.Comments,
        rate: state.data.AverageRatings,
        reviews: state.data.Reviews,
        author: state.data.Author
    }
};

export default connect(mapStateToProps)(CommentPage)
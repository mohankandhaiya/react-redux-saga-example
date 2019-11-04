import React, { Component } from 'react'
import { Modal, Button, Rate, Input } from 'antd'
import {store} from "../store";
import actions from "../constants";
import {connect} from "react-redux";

const { TextArea } = Input;

class Modals extends Component {

    state = {
        stars: 0,
        comments: '',
        name: 'Default Name',
        author: ''
    };

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({ comments: e.target.value });
    };

    changeHandler =  value => {
        this.setState({ stars: value });
    };

    handleOk = () => {
    };

    handleCancel = () => {
        setTimeout(
            function() {
                return this.props.history.push('/categories/topics/comment');
            }.bind(this),
            1000
        );
    };

    handleSubmit = () => {
        console.log(this.props);
        this.setState({
            name: this.props.user,
            author: this.props.author
        }, () => {
            const payload= this.state;
            store.dispatch({type: actions.POST_COMMENTS, payload: {payload}});
            this.handleCancel()
        });
    };

    render() {

        const { loading, rate, comments } = this.state;

        return (
            <div>
                <Modal
                    title="Ratings & Feedback"
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" className="modal-button" onClick={this.handleCancel}> Cancel </Button>,
                        <Button key="submit" type="primary" className="modal-button" loading={loading} onClick={this.handleSubmit}> Submit </Button>,
                    ]}
                >
                    <div className="center">
                        <Rate onChange={this.changeHandler} allowHalf style={{ fontSize: 32 }} value={rate} />
                        <p className="sm-size">Click the above star to rate it.</p>
                    </div>

                    <p>Comments</p>
                    <TextArea value={comments} onChange={this.onChange} rows={4} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data);
    return {
        author: state.data.Author.data,
        user: state.data.User.user
    }
};

export default connect(mapStateToProps)(Modals)
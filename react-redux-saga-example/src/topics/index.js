import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { Dropdown, Button, Icon, Table, Menu, Tag, List } from 'antd'
import { Popconfirm, Form } from 'antd';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import { Modal, Rate } from 'antd'
import Ratings from "../Ratings";
import {store} from "../store";
import actions from "../constants";

class Topics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data:[],
            topics:[],
            test:[],
            editingKey: '',
            visible: false,
            key: ''
        }
    }

    componentDidMount(){
        store.dispatch({type: actions.TOPICS, payload: this.props.userId})
    }

    showComments = user => {
        this.props.history.push("/categories/topics/comment");
        // store.dispatch({type: actions.COMMENTS, payload: user});
        // store.dispatch({type: actions.REVIEWS, payload: user});
        // store.dispatch({type: actions.AVERAGE_RATING, user: user});
        store.dispatch({type: actions.AUTHOR, author:user})
    };

    addTopics = () => {
        return this.props.history.push("/categories/topics/add");
    };

    editTopics = key => {
        this.props.history.push("/categories/topics/edit");
        store.dispatch({type: actions.OBJECT_ID, payload:{key}});
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

    handleDelete = (key,role) => {
        console.log(role);
        store.dispatch({type: actions.DELETE_TOPICS, payload:{key, role}})
    };

    category = (x) => {
        return ( { key:x.objectId, role:x.Developer, desc:x.Description })
    };

    topics = (x) => {
        return ( { key:x.objectId, name:x.Name, age:x.Age, qualification:x.Qualification, experience:x.Experience, desc:x.Topics })
    };

    render() {

        const { visible } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
                render: (text, record) => <a onClick={ () => this.showComments(record)}>{text}</a>,
            },
            {
                title: 'Description',
                dataIndex: 'desc',
                key: 'desc',
                width: '40%',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: '10%',
            },
            {
                title: 'Qualification',
                dataIndex: 'qualification',
                key: 'qualification',
                width: '10%',
            },
            {
                title: 'Experience',
                dataIndex: 'experience',
                key: 'experience',
                width: '10%',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'x',
                width: '20%',
                render: (text, record) =>
                    <span>
                        <Button type="primary" className="topics-btn-size"><a onClick={() => this.editTopics(record.key)}> Edit </a></Button>
                        <Button type="danger" className="topics-btn-size"><a onClick={() => this.handleDelete(record.key, this.props.userId)}> Delete </a></Button>
                    </span>
            },
        ];

        const Topics = this.props.topics;

        return (
            <div>
                <Router>
                    <h2 className="margin"> Topics </h2>
                    <Button className="margin" type="primary"><a onClick={() => this.addTopics()}> Add Row </a></Button>

                    { Topics &&
                        <Table columns={columns} dataSource={
                            Topics.data.map(this.topics)
                        } bordered/>
                    }

                    <Modal
                        title="Ratings & Feedback"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" className="modal-button" onClick={this.handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" className="modal-button" onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <div className="center">
                            <Rate />
                            <p>(2 Ratings)</p>
                            <p>Click the above star to rate it.</p>
                        </div>
                        <p>Comments</p>
                        <textarea  row="15"></textarea>
                    </Modal>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data.UserId.data);
    return {
        topics: state.data.Topics,
        userId: state.data.UserId.data,
        role: state.data.Role.data.Role
    }
};

export default connect(mapStateToProps)(Topics)
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Table, Modal } from 'antd'
import {store} from "../store";
import { BrowserRouter } from "react-router-dom";
import Ratings from "../Ratings";
import actions from "../constants";

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        store.dispatch({type: actions.CATEGORY})
    }

    showModal = key => {
        this.setState({
            visible: true,
            key: key
        });
        console.log("Yep Working")
    };

    category = (x) => {
        return ( { key:x.objectId, role:x.Developer, desc:x.Description, obj:x.UserId })
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

    handleTopics = key => {
        console.log(this.props);
        this.props.history.push('/categories/topics/');
        store.dispatch({type: actions.USER_ID, payload:{key}});

    };

    render() {
        const columns = [
            {
                title: 'Developer Role',
                dataIndex: 'role',
                key: 'role',
                width: '15%',
                render: (text, record) => <a onClick={() => this.handleTopics(record.obj)}>{text}</a>
            },
            {
                title: 'Description',
                dataIndex: 'desc',
                key: 'desc',
                width: '65%',
            },
            {
                title: 'Action',
                key: 'action',
                width: '20%',
                render: (text, record) =>
                    <span>
                        <Button type="primary" className="topics-btn-size"><a onClick={() => this.showModal(record.key)}> Edit </a></Button>
                        <Button type="danger" className="topics-btn-size"> Delete </Button>
                    </span>
            },
        ];

        const Categories = this.props.category.Category;
        const { visible } = this.state;

        return (
            <div>
                <BrowserRouter>
                    <h2> Categories </h2>

                { Categories &&
                <Table columns={columns} dataSource={
                    Categories.map(this.category)
                } bordered
                       name={(key) => ({
                           onClick: () => this.showModal(key)
                       })}
                />
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
                    <Ratings />
                    <p>Comments</p>
                    <textarea  row="15"></textarea>
                </Modal>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data);
    return {
        category: state.data
    }
};

export default connect(mapStateToProps)(Categories)
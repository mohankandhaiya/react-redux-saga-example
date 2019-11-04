import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Table, Modal, Layout, Menu } from 'antd'
import {store} from "../store";
import { BrowserRouter } from "react-router-dom";
import Ratings from "../Ratings";
import actions from "../constants";

const { Sider } = Layout;
const { SubMenu } = Menu;

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

    menuCategory = (x) =>
        <Menu.Item key={x.UserId} onClick={ (key) => this.handleTopics(key) }>
             {x.Developer}
        </Menu.Item>;


    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleTopics = (x) => {
        console.log(this.props);
        this.props.history.push('/categories/topics/');
        store.dispatch({type: actions.USER_ID, userId: x.obj });
        store.dispatch({type: actions.ROLE, Role: x.role });
    };

    render() {
        const columns = [
            {
                title: 'Developer Role',
                dataIndex: 'role',
                key: 'role',
                width: '25%',
                render: (text, record) => <a onClick={() => this.handleTopics(record)}>{text}</a>
            },
            {
                title: 'Description',
                dataIndex: 'desc',
                key: 'desc',
                width: '75%',
            },
        ];

        const Categories = this.props.category.Category;
        const { visible } = this.state;

        return (
            <div>
                <BrowserRouter>
                    <h2 className="margin"> Categories </h2>
                    {/*<Sider theme="light">*/}


                        { Categories &&
                        <Table columns={columns} dataSource={
                            Categories.map(this.category)
                        } bordered
                        />
                        }


                        {/*{ Categories &&*/}
                        {/*<Menu onClick={this.handleClick} defaultOpenKeys={['category']} mode="inline" className="sider-height">*/}
                        {/*    <SubMenu key="category" title={ <span> Category </span> }>*/}
                        {/*        {Categories.map(this.menuCategory)}*/}
                        {/*    </SubMenu>*/}
                        {/*</Menu>*/}
                        {/*}*/}

                    {/*</Sider>*/}

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
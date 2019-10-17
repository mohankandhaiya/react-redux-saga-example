import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import {store} from "../store";
import EditTopics from "../forms/editTopics";
import EditCategory from "../forms/editCategory";

const { Option } = Select;

class DrawerForm extends React.Component {
    state = { visible: true };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/*<Button type="primary" onClick={this.showDrawer}> Add Category </Button>*/}
                <Drawer
                    title="Create a new Category"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form onSubmit={() => (store.dispatch({type:'POST_CATEGORY'}))} layout="vertical" hideRequiredMark>
                        <Form.Item label="Developer">
                            {getFieldDecorator('developer', {
                                rules: [{ required: true, message: 'Please enter Developer' }],
                            })(<Input placeholder="Developer" />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please enter Description' }],
                            })(
                                <Input placeholder="Description" />)}
                        </Form.Item>
                    </Form>
                    <EditCategory />
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ width: 230, marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={this.onClose} type="primary" style={{ width: 230 }}>
                            Submit
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const CategoryTable = Form.create()(DrawerForm);

export default CategoryTable
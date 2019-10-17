import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';

class EditTopics extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" hideRequiredMark>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please enter Name' }],
                    })(<Input placeholder=" Name " />)}
                </Form.Item>
                <Form.Item label="Age">
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: 'Please enter Age' }],
                    })(
                        <Input placeholder="Age" />)}
                </Form.Item>
                <Form.Item label="Qualification">
                    {getFieldDecorator('qualification', {
                        rules: [{ required: true, message: 'Please enter Qualification' }],
                    })(<Input placeholder="Qualification" />)}
                </Form.Item>
                <Form.Item label="Experience">
                    {getFieldDecorator('experience', {
                        rules: [{ required: true, message: 'Please enter Experience' }],
                    })(
                        <Input placeholder="Experience" />)}
                </Form.Item>
            </Form>
        )
    }
}

export default EditTopics
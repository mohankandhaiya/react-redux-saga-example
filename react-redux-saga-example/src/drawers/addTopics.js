import React, { Component } from 'react'
import { Drawer, Form, Button, Input } from 'antd';
import { store } from '../store'
import {connect} from "react-redux";

class AddTopicsDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            name: "",
            age: "",
            qualification: "",
            experience: ""
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.history.push("/categories/topics/")
    };

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const payload = {
                    "name": this.state.name,
                    "age": this.state.age,
                    "qualification": this.state.qualification,
                    "experience": this.state.experience,
                    "userid": this.props.userId
                };
                console.log(payload);
                store.dispatch({type: 'ADD_TOPICS', payload: {payload}});
                console.log("Executed");
                setTimeout(
                    function() {
                            console.log(this.props.history);
                            return this.props.history.push('/categories/topics/');
                    }.bind(this),
                    100
                );
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { name, age, qualification, experience } = this.state;

        return (
            <div>
                <Drawer
                    title="Create a new Topic"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter Name' }],
                            })(<Input placeholder="Name" name="name" value={name} onChange={this.changeHandler} />)}
                        </Form.Item>
                        <Form.Item label="Age">
                            {getFieldDecorator('age', {
                                rules: [{ required: true, message: 'Please enter Age' }],
                            })(
                                <Input placeholder="Age" name="age" value={age} onChange={this.changeHandler} />)}
                        </Form.Item>
                        <Form.Item label="Qualification">
                            {getFieldDecorator('qualification', {
                                rules: [{ required: true, message: 'Please enter Qualification' }],
                            })(<Input placeholder="Qualification" name="qualification" value={qualification} onChange={this.changeHandler} />)}
                        </Form.Item>
                        <Form.Item label="Experience">
                            {getFieldDecorator('experience', {
                                rules: [{ required: true, message: 'Please enter Experience' }],
                            })(
                                <Input placeholder="Experience" name="experience" value={experience} onChange={this.changeHandler} />)}
                        </Form.Item>
                    </Form>
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
                        <Button onClick={this.handleSubmit} type="primary" style={{ width: 230 }}>
                            Submit
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.data);
    return {
        topics: state.data.Topics,
        userId: state.data.UserId.data.payload.key
    }
};

const AddTopics = Form.create()(AddTopicsDrawer);

export default connect(mapStateToProps)(AddTopics)
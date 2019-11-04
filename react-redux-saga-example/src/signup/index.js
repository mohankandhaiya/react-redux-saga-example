import React, { Component, AutoCompleteOption, Option, residences } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Divider } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
// import { Form, Input } from 'antd';
import { connect } from 'react-redux'

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email:"",
            name:"",
            password:""
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const payload= this.state;
                console.log(payload);
                const { dispatch } = this.props;
                dispatch({type: 'REQUEST_SIGNUP', payload: {payload}});
                this.props.history.push("/login")
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, name, password } = this.state;

        return (
            <div className="container-register">
                <div className="head">REGISTER NOW</div>
                <div className="tagline">Join a growing community</div>
                <Form onSubmit={this.handleSubmit} className="login-form" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="FIRSTNAME">
                                {getFieldDecorator('firstname', {
                                    rules: [{ required: true, message: 'Please input your firstname!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Firstname" />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="LASTNAME">
                                {getFieldDecorator('lastname', {
                                    rules: [{ required: true, message: 'Please input your lastname!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Lastname" />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="USERNAME">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username" name="name" value={name} onChange={this.changeHandler}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="YOUR CURRENT EMAIL ADDRESS">
                        {getFieldDecorator('emailaddress', {
                            rules: [{ required: true, message: 'Please input your Email Address!' }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email Address" name="email" value={email} onChange={this.changeHandler}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="CREATE A PASSWORD">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password" name="password" value={password} onChange={this.changeHandler}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="CONFIRM A PASSWORD">
                        {getFieldDecorator('confirmpassword', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Confirm Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn-size"> Create Account </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const SignUpForm = Form.create({ name: 'signup' })(Signup);

const mapStateToProps = state => {
    console.log(state);
    return {
        redirect: state.data.Login
    }
};

export default connect(mapStateToProps)(SignUpForm)
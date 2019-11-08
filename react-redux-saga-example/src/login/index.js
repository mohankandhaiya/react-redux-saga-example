import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username:"",
            password:"",
            redirect: false
        };
    }

    handleClick = () => {
        const payload={
                "login":this.state.username,
                "password":this.state.password
        };
        const { dispatch } = this.props;
        dispatch({type: 'REQUEST_LOGIN', payload: {payload}});
    };

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    routeHandler = () => {
        console.log(this.props)
        this.props.history.push('/signup/');
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const payload={
                    "login":this.state.username,
                    "password":this.state.password
                };
                console.log(payload);
                const { dispatch } = this.props;
                dispatch({type: 'REQUEST_LOGIN', payload: {payload}});
                setTimeout(
                    function() {
                        if(this.props.redirect.status === 200){
                            console.log(this.props.history);
                            return this.props.history.push('/categories/');
                        }
                    }.bind(this),
                    1000
                );
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const Login = this.props.redirect;

        // if(this.state.redirect){
        //     return <Redirect to="/categories/" />
        // }

        return (
            <div className="container">
                <div className="head">WELCOME BACK</div>
                <div className="tagline">Please sign in to your account</div>
                <BrowserRouter>
                    <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
                        <Form.Item label="YOUR EMAIL ADDRESS" required={false}>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input
                                    name="username" onChange={this.changeHandler}
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Email Address" className="padding"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="PASSWORD" required={false}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    name="password" onChange={this.changeHandler}
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password" className="padding"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })
                            (<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot sm-margin-bottom" href=""> Forgot password </a>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })
                            (<Checkbox> I have read the <a>Terms and Conditions</a> </Checkbox>)}
                            <Button type="primary" htmlType="submit" className="btn-size margin-top"> Login </Button>
                            <Divider orientation="center">OR</Divider>
                            <p className="center size"><a onClick={this.routeHandler}>Signup</a></p>
                        </Form.Item>
                    </Form>
                </BrowserRouter>
            </div>
        );
    }
}

const LoginForm = Form.create({ name: 'login' })(Login);

const mapStateToProps = state => {
    console.log(state.data.Login);
    return {
        redirect: state.data.Login
    }
};

export default connect(mapStateToProps)(LoginForm)
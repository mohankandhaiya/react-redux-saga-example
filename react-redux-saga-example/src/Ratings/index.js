import React, {Component} from 'react'
import {Button, Modal, Rate, Input} from 'antd'
import {connect} from "react-redux";

const { TextArea } = Input;

class Ratings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({ comments: e.target.value });
    };

    changeHandler =  value => {
        console.log(value);
        this.setState({rate: value });
    };

    showModal = () => {
        console.log("Clicked the button Visible");
        this.setState({
            visible: true,
        });
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const payload= this.state;
                console.log(payload);
                const { dispatch } = this.props;
                dispatch({type: 'POST_COMMENTS', payload: {payload}});
            }
        });
    };

    rate = (x) =>
        <div className="post-container center">
            <div className="bold font">Ratings</div>
            <Rate allowHalf style={{ fontSize: 20 }} value={x.avg} />
            <div>Click the above star to rate it.</div>
        </div>;

    render() {

        const Rate = this.props.rate;
        const { loading, rate, comments, visible } = this.state;

        return (
            <div>
            <div onClick={this.showModal}>
                { Rate &&
                Rate.data.data.map(this.rate)
                }
            </div>
            <Modal
                title="Ratings & Feedback"
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" className="modal-button" onClick={this.handleCancel}> Cancel </Button>,
                    <Button key="submit" type="primary" className="modal-button" loading={loading} onClick={this.submitHandler}> Submit </Button>,
                ]}
            >
                <div className="center">
                    <Rate onChange={this.changeHandler} value={rate} />
                    <p>Click the above star to rate it.</p>
                </div>
                <p>Comments</p>
                <TextArea value={comments} onChange={this.onChange} autoSize={{ minRows: 3, maxRows: 5 }} />
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data.AverageRatings);
    return {
        rate: state.data.AverageRatings
    }
};

export default connect(mapStateToProps)(Ratings);
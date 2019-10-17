import React, { Component } from 'react'
import { Modal, Button, Rate } from 'antd'
import Ratings from './Ratings'

class Modals extends Component {

    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
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

    render() {

        const { visible, loading } = this.state;

        return (
            <div>
                <Button type="primary" className="modal-button" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal
                    title="Ratings & Feedback"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" className="modal-button" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" className="modal-button" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Ratings />

                    <p>Comments</p>
                    <textarea  row="15">
              </textarea>

                </Modal>
            </div>
        )
    }
}

export default Modals
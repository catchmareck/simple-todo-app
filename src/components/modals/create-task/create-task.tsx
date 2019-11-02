import React, { Component } from 'react';
import './create-task.scss';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay";

class CreateTaskModal extends Component<any, any> {
    
    private closing = false;
    private modal: any = null;
    private onClose: Function;

    constructor(props: { show: boolean, onClose?: Function }) {
        super(props);

        this.state = {
            show: props.show
        };

        this.onClose = props.onClose || (() => {});
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        if (!this.closing && this.state.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }

        if (this.modal === null && this.props.show === true) {

            this.modal = document.createElement('div');
            this.modal.style.position = 'absolute';
            this.modal.style.width = '100%';
            this.modal.style.height = '100%';
            document.body.prepend(this.modal);
            ReactDOM.render(<ModalOverlay />, this.modal);
        }

        if (!this.closing && this.modal && this.props.show === false) {
            this.closeModal();
        }
    }

    closeModal() {

        this.closing = true;
        this.setState({ show: false }, () => {

            ReactDOM.unmountComponentAtNode(this.modal);
            document.body.removeChild(this.modal);

            this.modal = null;
            this.onClose.call(null);
            this.closing = false
        });

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-task-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Create Task</p>
                    <i className="close" onClick={this.closeModal}>&times;</i>
                </div>
                <div className="modal-body">
                    <form className="form">
                        <input type="text" name="title" placeholder="Task title"/>
                        <textarea name="description" placeholder="Task description"></textarea>
                        <input type="date" name="deadline" placeholder="Deadline"/>
                        <select name="assignees">
                            <option value="1">John Doe</option>
                            <option value="2">Alie Bartner</option>
                            <option value="3">Evan Hoggs</option>
                        </select>

                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateTaskModal;

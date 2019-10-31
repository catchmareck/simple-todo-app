import React, { Component } from 'react';
import './delete-list-info.scss';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay";

class DeleteListInfoModal extends Component<any, any> {

    private closing = false;
    private modal: any = null;

    constructor(props: { show: boolean }) {
        super(props);

        this.state = {
            show: props.show
        };

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
    }

    closeModal() {

        this.closing = true;
        this.setState({ show: false }, () => {

            ReactDOM.unmountComponentAtNode(this.modal);
            document.body.removeChild(this.modal);

            this.modal = null;
            this.closing = false
        });

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="delete-list-info" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">List deleted</p>
                </div>
                <div className="modal-body">
                    <p>The list has been successfully deleted.</p>
                    <button onClick={this.closeModal}>Ok</button>
                </div>
            </div>
        );
    }
}

export default DeleteListInfoModal;

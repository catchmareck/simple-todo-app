import React, { Component } from 'react';
import './edit-list.scss';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay";

class EditListModal extends Component<any, any> {
    
    private closing = false;
    private modal: any = null;
    private onClose: Function;
    private onDeleteClick: Function;

    constructor(props: { show: boolean, onClose?: Function, onDeleteClick?: Function }) {
        super(props);

        this.state = {
            show: props.show
        };

        this.onClose = props.onClose || (() => {});
        this.onDeleteClick = props.onDeleteClick || (() => {});
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
            <div id="edit-list-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Edit list</p>
                    <button className="close delete" onClick={() => this.onDeleteClick()}>Delete</button>
                </div>
                <div className="modal-body">
                    <form className="form">
                        <input type="text" name="listname" placeholder="List name"/>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditListModal;

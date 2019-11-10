import React, {Component} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../components/modals/modal-overlay";

class ModalsManager {

    private closing = false;
    private modal: any = null;
    private onClose: Function;

    constructor(private modalComponent: Component<any, any>) {

        this.onClose = modalComponent.props.onClose || (() => {});
    }

    componentDidUpdate() {

        if (!this.closing && this.modalComponent.state.show !== this.modalComponent.props.show) {
            this.modalComponent.setState({ show: this.modalComponent.props.show });
        }

        if (this.modal === null && this.modalComponent.props.show === true) {

            this.modal = document.createElement('div');
            this.modal.style.position = 'absolute';
            this.modal.style.width = '100%';
            this.modal.style.height = '100%';
            document.body.prepend(this.modal);
            ReactDOM.render(<ModalOverlay />, this.modal);
        }

        if (!this.closing && this.modal && this.modalComponent.props.show === false) {
            this.closeModal();
        }
    }

    closeModal() {

        this.closing = true;
        this.modalComponent.setState({ show: false }, () => {

            ReactDOM.unmountComponentAtNode(this.modal);
            document.body.removeChild(this.modal);

            this.modal = null;
            this.onClose.call(null);
            this.closing = false
        });

    }
}

export default ModalsManager;
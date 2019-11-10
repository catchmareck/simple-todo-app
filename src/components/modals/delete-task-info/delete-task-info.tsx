import React, { Component } from 'react';
import './delete-task-info.scss';
import ModalsManager from "../../../services/modals-manager";

class DeleteTaskInfoModal extends Component<any, any> {

    private modalsManager: ModalsManager;

    constructor(props: { show: boolean, onClose?: Function }) {
        super(props);

        this.state = {
            show: props.show
        };

        this.modalsManager = new ModalsManager(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        this.modalsManager.componentDidUpdate();
    }

    closeModal() {

        this.modalsManager.closeModal();
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="delete-task-info" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Task deleted</p>
                </div>
                <div className="modal-body">
                    <p>The task has been successfully deleted.</p>
                    <button onClick={this.closeModal}>Ok</button>
                </div>
            </div>
        );
    }
}

export default DeleteTaskInfoModal;

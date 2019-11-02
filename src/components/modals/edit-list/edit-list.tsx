import React, { Component } from 'react';
import './edit-list.scss';
import ModalsManager from "../../../services/modals-manager";

class EditListModal extends Component<any, any> {
    
    private modalsManager: ModalsManager;
    private onDeleteClick: Function;

    constructor(props: { show: boolean, onClose?: Function, onDeleteClick?: Function }) {
        super(props);

        this.state = {
            show: props.show
        };

        this.modalsManager = new ModalsManager(this);
        this.onDeleteClick = props.onDeleteClick || (() => {});
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

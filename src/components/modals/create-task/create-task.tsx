import React, { Component } from 'react';
import './create-task.scss';
import ModalsManager from "../../../services/modals-manager";

class CreateTaskModal extends Component<any, any> {
    
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

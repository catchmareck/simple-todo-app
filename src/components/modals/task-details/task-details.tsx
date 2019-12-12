import React, { Component } from 'react';
import './task-details.scss';
import ModalsManager from "../../../services/modals-manager";

class TaskDetailsModal extends Component<any, any> {

    private modalsManager: ModalsManager;
    private onEditClick: Function;

    constructor(props: { show: boolean, onClose?: Function, onEditClick?: Function }) {
        super(props);

        this.state = {
            show: props.show
        };

        this.modalsManager = new ModalsManager(this);
        this.onEditClick = props.onEditClick || (() => {});
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
            <div id="task-details-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">{this.props.task.taskTitle}</p>
                    <button className="close" onClick={() => this.onEditClick()}>Edit</button>
                </div>
                <div className="modal-body">

                    <div className="row">
                        <p className="task-description">On list: {this.props.task.listName}</p>
                    </div>

                    <div className="row d-flex details-middle-row">
                        <input type="date" defaultValue={this.props.task.deadline} placeholder="Deadline" readOnly={true} aria-readonly={true} />
                        <input type="checkbox" id="is-done" disabled={true} aria-readonly={true} />
                        <label htmlFor="is-done">Done?</label>
                    </div>

                    <div className="row">
                        <select multiple defaultValue={["2"]} disabled={true}>
                            <option value="1">John Doe</option>
                            <option value="2">Alie Bartner</option>
                            <option value="3">Evan Hoggs</option>
                        </select>
                    </div>

                    <button onClick={this.closeModal}>Ok</button>
                </div>
            </div>
        );
    }
}

export default TaskDetailsModal;

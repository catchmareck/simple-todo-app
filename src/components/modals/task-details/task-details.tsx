import React, { Component } from 'react';
import axios from 'axios';
import './task-details.scss';
import ModalsManager from "../../../services/modals-manager";
import AuthManager from "../../../services/auth-manager";
import env from "../../../services/env";

class TaskDetailsModal extends Component<any, any> {

    private modalsManager: ModalsManager;
    private onEditClick: Function;

    constructor(props: { show: boolean, task: any, onClose?: Function, onEditClick?: Function }) {
        super(props);

        this.state = {
            show: props.show,
            task: { taskDeadline: '', tasklist: {}, users: [] }
        };

        this.modalsManager = new ModalsManager(this);
        this.onEditClick = props.onEditClick || (() => {});
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        this.modalsManager.componentDidUpdate();

        if (this.props.show === true && this.state.task.taskId !== this.props.task.taskId) {

            this.readTaskDetails()
                .then((result) => {

                    const { data: [ task ] } = result;
                    this.setState({ task });
                });
        }
    }

    private readTaskDetails() {

        return axios.get(`${env.apiUrl}/tasks/read/${this.props.task.taskId}`);
    }

    closeModal() {

        this.modalsManager.closeModal();
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const [dateInputValue] = this.state.task.taskDeadline.split('T');
        const assigneesValue = this.state.task.users.map((user: any) => user.userId.toString());
        return (
            <div id="task-details-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">{this.state.task.taskTitle}</p>
                    <button className="close" onClick={() => this.onEditClick()}>Edit</button>
                </div>
                <div className="modal-body">

                    <div className="row">
                        <p className="task-description">On list: {this.state.task.tasklist.listName}</p>
                    </div>

                    <div className="row d-flex details-middle-row">
                        <input type="text" className={'type-date'} defaultValue={dateInputValue} placeholder="Deadline" readOnly={true} aria-readonly={true} />
                        <input type="checkbox" id="is-done" disabled={true} aria-readonly={true} checked={this.state.task.isDone} />
                        <label htmlFor="is-done">Done?</label>
                    </div>

                    <div className="row">
                        <select multiple defaultValue={assigneesValue} disabled={true}>
                            {AuthManager.currentUser.team.users.map((user: any) => {
                                return (<option value={user.userId}>{user.displayName}</option>)
                            })}
                        </select>
                    </div>

                    <button onClick={this.closeModal}>Ok</button>
                </div>
            </div>
        );
    }
}

export default TaskDetailsModal;

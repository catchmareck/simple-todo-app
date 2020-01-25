import React, { Component } from 'react';
import axios from 'axios';
import './tasklists.scss';
import {
    CreateListModal,
    CreateTaskModal,
    DeleteListInfoModal,
    DeleteTaskInfoModal,
    EditListModal, EditTaskModal,
    TaskDetailsModal
} from "../index";
import AuthManager from "../../services/auth-manager";
import env from "../../services/env";

class Taskslists extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            showCreateListModal: false,
            showEditListModal: false,
            showEditTaskModal: false,
            showDeleteListModal: false,
            showDeleteTaskModal: false,
            showCreateTaskModal: false,
            showTaskDetailsModal: false,
            task: { tasklist: {} },
            tasklist: {},
            tasklists: []
        };

        this.showTaskDetailsModal = this.showTaskDetailsModal.bind(this);
    }

    componentDidMount(): void {

        this.readTasklists();
    }

    private readTasklists() {

        axios.get(`${env.apiUrl}/teams/${AuthManager.currentUser.team.teamId}/tasklists/read`)
            .then((response) => {

                const { data } = response;
                this.setState({ tasklists: data });
            });
    }

    navigateTo(link: string) {

        this.props.history.push(link);
    }

    showModal(which: string) {

        this.setState({ [`show${which}Modal`]: true });
    }

    showCreateTaskModal(tasklist: any) {

        this.setState({ tasklist }, () => this.showModal('CreateTask'));
    }

    showTaskDetailsModal(task: any) {

        this.setState({ task }, () => this.showModal('TaskDetails'));
    }

    showEditListModal(tasklist: any) {

        this.setState({ tasklist }, () => this.showModal('EditList'));
    }

    resetModalsState() {

        this.setState({
            showCreateListModal: false,
            showEditListModal: false,
            showEditTaskModal: false,
            showDeleteListModal: false,
            showDeleteTaskModal: false,
            showCreateTaskModal: false,
            showTaskDetailsModal: false
        });
    }

    refreshTasklists() {

        this.readTasklists();
    }

    deleteList() {

        axios.delete(`${env.apiUrl}/teams/${AuthManager.currentUser.team.teamId}/tasklists/delete/${this.state.tasklist.listId}`)
            .then(() => this.showModal('DeleteList'))
            .then(() => this.readTasklists());
    }

    deleteTask() {

        axios.delete(`${env.apiUrl}/tasks/delete/${this.state.task.taskId}`)
            .then(() => this.showModal('DeleteTask'))
            .then(() => this.readTasklists());
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="tasklists" className="d-flex px-3">
                <div className="row tasklists-header">
                    <button onClick={() => this.navigateTo('/team-settings')}>Edit team</button>
                    <button className={'ml-2'} onClick={() => this.navigateTo('/user-settings')}>Edit user</button>
                </div>
                <div className="row tasklists-body d-flex">
                    {this.state.tasklists.map((tasklist: any) => {
                        return (
                            <div className="tasklist">
                                <p className="tasklist-header"><a onClick={() => this.showEditListModal(tasklist)}>{tasklist.listName}</a></p>
                                <div className="tasklist-body">
                                    {tasklist.tasks.map((task: any) => {
                                        const isOverdue = Date.parse(task.taskDeadline) <= Date.now();
                                        return (
                                            <div className={`task ${task.isDone ? 'done' : ''} ${isOverdue ? 'overdue' : ''}`} onClick={() => this.showTaskDetailsModal(task)}>{task.taskTitle}</div>
                                        );
                                    })}
                                    <button onClick={() => this.showCreateTaskModal(tasklist)}>Add +</button>
                                </div>
                            </div>
                        );
                    })}
                    <div className="d-flex add-tasklist-column">
                        <button onClick={() => this.showModal('CreateList')}>Add +</button>
                    </div>
                </div>
                <CreateListModal show={this.state.showCreateListModal} onClose={this.resetModalsState.bind(this)} onSuccess={this.refreshTasklists.bind(this)} />
                <EditListModal show={this.state.showEditListModal} tasklist={this.state.tasklist} onDeleteClick={() => this.deleteList()} onClose={this.resetModalsState.bind(this)} onSuccess={this.refreshTasklists.bind(this)} />
                <CreateTaskModal show={this.state.showCreateTaskModal} tasklist={this.state.tasklist} onClose={this.resetModalsState.bind(this)} onSuccess={this.refreshTasklists.bind(this)} />
                <TaskDetailsModal show={this.state.showTaskDetailsModal} task={this.state.task} onEditClick={() => this.showModal('EditTask')} onClose={this.resetModalsState.bind(this)} />
                <EditTaskModal show={this.state.showEditTaskModal} task={this.state.task} tasklists={this.state.tasklists} onDeleteClick={() => this.deleteTask()} onClose={this.resetModalsState.bind(this)} onSuccess={this.refreshTasklists.bind(this)} />
                <DeleteTaskInfoModal show={this.state.showDeleteTaskModal} onClose={this.resetModalsState.bind(this)} />
                <DeleteListInfoModal show={this.state.showDeleteListModal} onClose={this.resetModalsState.bind(this)} />
            </div>
        );
    }
}

export default Taskslists;

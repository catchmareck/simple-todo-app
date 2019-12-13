import React, {ChangeEvent, Component, FormEvent} from 'react';
import axios from 'axios';
import env from "../../../services/env";
import './edit-task.scss';
import ModalsManager from "../../../services/modals-manager";
import ValidationManager from "../../../services/validation-manager";
import AuthManager from "../../../services/auth-manager";
import {type} from "os";

class EditTaskModal extends Component<any, any> {

    private modalsManager: ModalsManager;
    private onDeleteClick: Function;

    constructor(props: { show: boolean, task: any, tasklists: any[], onClose?: Function, onDeleteClick?: Function, onSuccess?: Function }) {
        super(props);

        this.state = {
            show: props.show,
            edit: {
                fields: {
                    title: '',
                    description: '',
                    deadline: '',
                    assignees: [],
                    done: false,
                    list: ''
                },
                validation: {
                    message: '',
                    titleOk: true,
                    descriptionOk: true,
                    deadlineOk: true,
                    assigneesOk: true,
                    doneOk: true,
                    listOk: true
                }
            }
        };

        this.modalsManager = new ModalsManager(this);
        this.onDeleteClick = props.onDeleteClick || (() => {});
        this.closeModal = this.closeModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleChange(e: ChangeEvent) {

        const target: HTMLInputElement = e.target as HTMLInputElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = target.value;
        this.setState({ [formType]: state });
    }

    handleSelectChange(e: ChangeEvent) {

        const target: HTMLSelectElement = e.target as HTMLSelectElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = Array.from(target.selectedOptions,(e) => (e as HTMLOptionElement).value);
        this.setState({ [formType]: state });
    }

    handleCheckboxChange(e: ChangeEvent) {

        const target: HTMLInputElement = e.target as HTMLInputElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = target.checked;
        this.setState({ [formType]: state });
    }

    handleEdit(e: FormEvent) {

        e.preventDefault();

        const { valid, ...fields } = this.validateEditForm();

        const stateValidation = Object.keys(fields).reduce((res: any, curr: string) => {
            res[`${curr}Ok`] = (fields as any)[curr];
            return res;
        }, {});

        const { edit } = this.state;
        edit.validation = {
            message: valid ? '' : 'Please fill all required fields correctly',
            ...stateValidation
        };
        this.setState({ edit });

        if (valid) {
            this.editTask()
                .then(() => this.props.onSuccess())
                .then(() => this.closeModal());
        }
    }

    private validateEditForm(): { valid: boolean, title: boolean, description: boolean, deadline: boolean, assignees: boolean, done: boolean, list: boolean } {

        const { title, description, deadline, list } = this.state.edit.fields;

        const validation = {
            title: this.requiredFieldValid(title),
            description: this.requiredFieldValid(description),
            deadline: this.dateFieldValid(deadline),
            assignees: true,
            done: true,
            list: this.requiredFieldValid(list)
        };

        return {
            valid: !Object.values(validation).includes(false),
            ...validation
        }
    }

    private editTask() {

        const { title: taskTitle, description: taskDescription, done: isDone, deadline: taskDeadline } = this.state.edit.fields;
        const listId = +this.state.edit.fields.list;
        const assignees = this.state.edit.fields.assignees.map((ass: any) => Number(ass));

        return axios.put(`${env.apiUrl}/tasks/update/${this.props.task.taskId}`, { listId, taskTitle, taskDescription, isDone, taskDeadline, assignees });
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    private dateFieldValid(field: string): boolean {

        return ValidationManager.dateFieldValid(field);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        this.modalsManager.componentDidUpdate();

        if (this.state.show && this.state.edit.fields.title !== this.props.task.taskTitle) {


            this.readTaskDetails()
                .then((result) => {

                    const { data: [ task ] } = result;
                    const { edit } = this.state;
                    edit.fields = {
                        title: task.taskTitle,
                        description: task.taskDescription,
                        deadline: task.taskDeadline.split('T')[0],
                        assignees: task.users.map((user: any) => user.userId),
                        done: task.isDone,
                        list: task.tasklist.listId
                    };

                    this.setState({ edit });
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

        return (
            <div id="edit-task-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Edit task</p>
                    <button className="close delete" onClick={() => this.onDeleteClick()}>Delete</button>
                </div>
                <div className="modal-body">
                    <form className="form" onSubmit={this.handleEdit}>

                        <p className="text-center invalid-form-message m-0 mt-1">{this.state.edit.validation.message}</p>

                        <div className="row">
                            <input type="text" className={!this.state.edit.validation.titleOk ? "invalid-user-input" : ""} name="edit-title" placeholder="Task title"value={this.state.edit.fields.title} onChange={this.handleChange} />
                            <textarea className={!this.state.edit.validation.descriptionOk ? "invalid-user-input" : ""} name="edit-description" placeholder="Task description"value={this.state.edit.fields.description} onChange={this.handleChange} ></textarea>
                        </div>

                        <div className="row d-flex details-middle-row">
                            <input type="date" className={!this.state.edit.validation.deadlineOk ? "invalid-user-input" : ""} name="edit-deadline" placeholder="Deadline" value={this.state.edit.fields.deadline} onChange={this.handleChange} />
                            <input type="checkbox" id="is-done" className={!this.state.edit.validation.doneOk ? "invalid-user-input" : ""} name="edit-done" value={this.state.edit.fields.done} checked={this.state.edit.fields.done} onChange={this.handleCheckboxChange} />
                            <label htmlFor="is-done">Done?</label>
                        </div>

                        <div className="row d-flex">
                            <p className="text-center invalid-form-message m-0 mt-1 w-100">{!this.state.edit.validation.deadlineOk ? "Deadline should be later than today and have format of DD-MM-YYYY" : ""}</p>
                        </div>

                        <div className="row">
                            <select name="edit-assignees" multiple className={!this.state.edit.validation.assigneesOk ? "invalid-user-input" : ""} value={this.state.edit.fields.assignees} onChange={this.handleSelectChange}>
                                <option value="" defaultChecked={true} disabled>Assignees</option>
                                {AuthManager.currentUser.team.users.map((user: any) => {
                                    return (<option value={user.userId}>{user.displayName}</option>);
                                })}
                            </select>
                            <select name="edit-list" className={!this.state.edit.validation.listOk ? "invalid-user-input" : ""} value={this.state.edit.fields.list} onChange={this.handleSelectChange}>
                                <option value="" defaultChecked={true} disabled>List</option>
                                {this.props.tasklists.map((tasklist: any) => {
                                    return (<option value={tasklist.listId}>{tasklist.listName}</option>);
                                })}
                            </select>
                        </div>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditTaskModal;

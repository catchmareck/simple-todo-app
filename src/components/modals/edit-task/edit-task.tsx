import React, {ChangeEvent, Component, FormEvent} from 'react';
import './edit-task.scss';
import ModalsManager from "../../../services/modals-manager";

class EditTaskModal extends Component<any, any> {

    private modalsManager: ModalsManager;
    private onDeleteClick: Function;

    constructor(props: { show: boolean, onClose?: Function, onDeleteClick?: Function }) {
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
            this.closeModal();
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

    private requiredFieldValid(field: string): boolean {

        return Boolean(field) && field.length > 0;
    }

    private dateFieldValid(field: string): boolean {

        const now = Date.now();
        const selected = Date.parse(field);

        return Boolean(field) && selected >= now;
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        this.modalsManager.componentDidUpdate();
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
                            <input type="text" className={!this.state.edit.validation.titleOk ? "invalid-user-input" : ""} name="edit-title" placeholder="Task title"value={this.state.edit.fields.name} onChange={this.handleChange} />
                            <textarea className={!this.state.edit.validation.descriptionOk ? "invalid-user-input" : ""} name="edit-description" placeholder="Task description"value={this.state.edit.fields.description} onChange={this.handleChange} ></textarea>
                        </div>

                        <div className="row d-flex details-middle-row">
                            <input type="date" className={!this.state.edit.validation.deadlineOk ? "invalid-user-input" : ""} name="edit-deadline" placeholder="Deadline" value={this.state.edit.fields.deadline} onChange={this.handleChange} />
                            <input type="checkbox" id="is-done" className={!this.state.edit.validation.doneOk ? "invalid-user-input" : ""} value={this.state.edit.fields.done} onChange={this.handleChange} />
                            <label htmlFor="is-done">Done?</label>
                        </div>

                        <div className="row d-flex">
                            <p className="text-center invalid-form-message m-0 mt-1 w-100">{!this.state.edit.validation.deadlineOk ? "Deadline should be later than today" : ""}</p>
                        </div>

                        <div className="row">
                            <select name="edit-assignees" multiple className={!this.state.edit.validation.assigneesOk ? "invalid-user-input" : ""} value={this.state.edit.fields.assignees} onChange={this.handleSelectChange}>
                                <option value="" defaultChecked={true} disabled>Assignees</option>
                                <option value="1">John Doe</option>
                                <option value="2">Alie Bartner</option>
                                <option value="3">Evan Hoggs</option>
                            </select>
                            <select name="edit-list" className={!this.state.edit.validation.listOk ? "invalid-user-input" : ""} value={this.state.edit.fields.list} onChange={this.handleChange}>
                                <option value="" defaultChecked={true} disabled>List</option>
                                <option value="1">Todo</option>
                                <option value="2">Bugs</option>
                                <option value="3">Current sprint</option>
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

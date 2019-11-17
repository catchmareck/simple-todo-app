import React, {ChangeEvent, Component, FormEvent} from 'react';
import './create-task.scss';
import ModalsManager from "../../../services/modals-manager";

class CreateTaskModal extends Component<any, any> {

    private modalsManager: ModalsManager;

    constructor(props: { show: boolean, onClose?: Function }) {
        super(props);

        this.state = {
            show: props.show,
            create: {
                fields: {
                    title: '',
                    description: '',
                    deadline: '',
                    assignees: []
                },
                validation: {
                    message: '',
                    titleOk: true,
                    descriptionOk: true,
                    deadlineOk: true,
                    assigneesOk: true
                }
            }
        };

        this.modalsManager = new ModalsManager(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
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

    handleCreate(e: FormEvent) {

        e.preventDefault();

        const { valid, ...fields } = this.validateCreateForm();

        const stateValidation = Object.keys(fields).reduce((res: any, curr: string) => {
            res[`${curr}Ok`] = (fields as any)[curr];
            return res;
        }, {});

        const { create } = this.state;
        create.validation = {
            message: valid ? '' : 'Please fill all required fields correctly',
            ...stateValidation
        };
        this.setState({ create });

        if (valid) {
            this.closeModal();
        }
    }

    private validateCreateForm(): { valid: boolean, title: boolean, description: boolean, deadline: boolean, assignees: boolean } {

        const { title, description, deadline } = this.state.create.fields;

        const validation = {
            title: this.requiredFieldValid(title),
            description: this.requiredFieldValid(description),
            deadline: this.dateFieldValid(deadline),
            assignees: true
        };

        return {
            valid: !Object.values(validation).includes(false),
            ...validation
        }
    }

    private requiredFieldValid(field: string): boolean {

        return Boolean(field) && field.trim().length > 0;
    }

    private dateFieldValid(field: string): boolean {

        const selectedDate = new Date(field);
        const dayValid = selectedDate.getDate() <= 31;
        const monthValid = selectedDate.getMonth() <= 11;
        const yearValid = selectedDate.getFullYear() <= 9999;

        const now = Date.now();
        const selected = Date.parse(field);

        return Boolean(field) && selected >= now && dayValid && monthValid && yearValid;
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
                    <form className="form" onSubmit={this.handleCreate}>
                        <p className="text-center invalid-form-message m-0 mt-1">{this.state.create.validation.message}</p>
                        <input type="text" className={!this.state.create.validation.titleOk ? "invalid-user-input" : ""} name="create-title" placeholder="Task title" value={this.state.create.fields.name} onChange={this.handleChange} />
                        <textarea className={!this.state.create.validation.descriptionOk ? "invalid-user-input" : ""} name="create-description" placeholder="Task description" value={this.state.create.fields.description} onChange={this.handleChange} ></textarea>
                        <input type="date" className={!this.state.create.validation.deadlineOk ? "invalid-user-input" : ""} name="create-deadline" placeholder="Deadline" value={this.state.create.fields.deadline} onChange={this.handleChange} />
                        <p className="text-center invalid-form-message m-0 mt-1">{!this.state.create.validation.deadlineOk ? "Deadline should be later than today and have format of DD-MM-YYYY" : ""}</p>
                        <select multiple className={!this.state.create.validation.assigneesOk ? "invalid-user-input" : ""} name="create-assignees" value={this.state.create.fields.assignees} onChange={this.handleSelectChange}>
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

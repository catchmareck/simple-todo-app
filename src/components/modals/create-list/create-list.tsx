import React, {ChangeEvent, Component, FormEvent} from 'react';
import axios from 'axios';
import './create-list.scss';
import ModalsManager from "../../../services/modals-manager";
import ValidationManager from "../../../services/validation-manager";
import env from "../../../services/env";
import AuthManager from "../../../services/auth-manager";

class CreateListModal extends Component<any, any> {

    private modalsManager: ModalsManager;

    constructor(props: { show: boolean, onClose?: Function, onSuccess?: Function }) {
        super(props);

        this.state = {
            show: props.show,
            create: {
                fields: {
                    name: ''
                },
                validation: {
                    message: '',
                    nameOk: true
                }
            }
        };

        this.modalsManager = new ModalsManager(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: ChangeEvent) {

        const target: HTMLInputElement = e.target as HTMLInputElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = target.value;
        this.setState({ [formType]: state });
    }

    handleCreate(e: FormEvent) {

        e.preventDefault();

        const { valid, name } = this.validateCreateForm();

        const { create } = this.state;
        create.validation = {
            message: valid ? '' : 'Please fill all required fields correctly',
            nameOk: name,
            descriptionOk: true
        };
        this.setState({ create });

        if (valid) {
            this.createList()
                .then(() => this.props.onSuccess())
                .then(() => this.closeModal());
        }
    }

    private validateCreateForm(): { valid: boolean, name: boolean } {

        const { name } = this.state.create.fields;

        const validName = this.requiredFieldValid(name);

        return {
            valid: validName,
            name: validName
        }
    }

    private createList() {

        const { name: listName } = this.state.create.fields;
        return axios.post(`${env.apiUrl}/teams/${AuthManager.currentUser.team_id}/tasklists/create`, { listName });
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        this.modalsManager.componentDidUpdate();
    }

    closeModal() {

        this.modalsManager.closeModal();
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-list-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Create list</p>
                    <i className="close" onClick={this.closeModal}>&times;</i>
                </div>
                <div className="modal-body">
                    <form className="form" onSubmit={this.handleCreate}>
                        <input type="text" className={!this.state.create.validation.nameOk ? "invalid-user-input" : ""} name="create-name" placeholder="List name" value={this.state.create.fields.name} onChange={this.handleChange} />
                        <p className="text-center invalid-form-message m-0 mt-1">{!this.state.create.validation.nameOk ? "This field is required" : ""}</p>

                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateListModal;

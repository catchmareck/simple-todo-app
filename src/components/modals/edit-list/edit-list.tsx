import React, {ChangeEvent, Component, FormEvent} from 'react';
import axios from 'axios';
import env from "../../../services/env";
import './edit-list.scss';
import ModalsManager from "../../../services/modals-manager";
import ValidationManager from "../../../services/validation-manager";
import AuthManager from "../../../services/auth-manager";

class EditListModal extends Component<any, any> {

    private modalsManager: ModalsManager;
    private onDeleteClick: Function;

    private tempListName: string;

    constructor(props: { show: boolean, tasklist: any, onClose?: Function, onDeleteClick?: Function, onSuccess?: Function }) {
        super(props);

        this.state = {
            show: props.show,
            edit: {
                fields: {
                    name: props.tasklist.listName || ''
                },
                validation: {
                    message: '',
                    nameOk: true
                }
            }
        };

        this.tempListName = '';

        this.modalsManager = new ModalsManager(this);
        this.onDeleteClick = props.onDeleteClick || (() => {});
        this.closeModal = this.closeModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: ChangeEvent) {

        const target: HTMLInputElement = e.target as HTMLInputElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = target.value;
        this.setState({ [formType]: state });

        this.tempListName = target.value;
    }

    handleEdit(e: FormEvent) {

        e.preventDefault();

        const { valid, name } = this.validateCreateForm();

        const { edit } = this.state;
        edit.validation = {
            message: valid ? '' : 'Please fill all required fields correctly',
            nameOk: name,
            descriptionOk: true
        };
        this.setState({ edit });

        if (valid) {
            this.editList()
                .then(() => (this.props.onSuccess || (() => {}))())
                .then(() => this.closeModal());
        }
    }

    private validateCreateForm(): { valid: boolean, name: boolean } {

        const { name } = this.state.edit.fields;

        const validName = this.requiredFieldValid(name);

        return {
            valid: validName,
            name: validName
        }
    }

    private editList() {

        const { name: listName } = this.state.edit.fields;
        return axios.put(`${env.apiUrl}/teams/${AuthManager.currentUser.team.teamId}/tasklists/update/${this.props.tasklist.listId}`, { listName });
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        this.modalsManager.componentDidUpdate();
        this.tempListName = this.props.tasklist.listName;
    }

    closeModal() {

        this.modalsManager.closeModal();
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="edit-list-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Edit list</p>
                    <button className="close delete" onClick={() => this.onDeleteClick(this.props.tasklist)}>Delete</button>
                </div>
                <div className="modal-body">
                    <form className="form" onSubmit={this.handleEdit}>
                        <input type="text" className={!this.state.edit.validation.nameOk ? "invalid-user-input" : ""} name="edit-name" placeholder="List name" value={this.tempListName} onChange={this.handleChange} />
                        <p className="text-center invalid-form-message m-0 mt-1">{!this.state.edit.validation.nameOk ? "This field is required" : ""}</p>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditListModal;

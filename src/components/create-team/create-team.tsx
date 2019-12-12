import React, {ChangeEvent, Component, FormEvent} from 'react';
import axios from 'axios';
import './create-team.scss';
import ValidationManager from "../../services/validation-manager";
import env from "../../services/env";
import AuthManager from "../../services/auth-manager";

class CreateTeam extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            create: {
                fields: {
                    name: '',
                    description: ''
                },
                validation: {
                    message: '',
                    nameOk: true,
                    descriptionOk: true
                }
            }
        };

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
            this.create()
                .then(() => this.props.history.push('/tasklists'));
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

    private create() {

        const { name: teamName, description: teamDescription } = this.state.create.fields;
        const adminId = AuthManager.currentUser.userId;
        return axios.post(`${env.apiUrl}/teams/create`, { teamName, teamDescription, adminId });
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-team" className="d-flex px-3">
                <h3>Create a team</h3>
                <form id="create-team-form" className="form" onSubmit={this.handleCreate}>
                    <input type="text" className={!this.state.create.validation.nameOk ? "invalid-user-input" : ""} name="create-name" placeholder="Team name" value={this.state.create.fields.name} onChange={this.handleChange} />
                    <p className="text-center invalid-form-message m-0 mt-1">{!this.state.create.validation.nameOk ? "This field is required" : ""}</p>
                    <textarea name="create-description" placeholder="Team description" value={this.state.create.fields.description} onChange={this.handleChange}></textarea>

                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default CreateTeam;

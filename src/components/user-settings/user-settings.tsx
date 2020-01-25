import React, {ChangeEvent, Component, FormEvent} from 'react';
import './user-settings.scss';
import ValidationManager from "../../services/validation-manager";
import AuthManager from "../../services/auth-manager";
import axios from "axios";
import env from "../../services/env";

class UserSettings extends Component<any, any> {

    private authManager: AuthManager = new AuthManager();
    constructor(props: any) {
        super(props);

        this.state = {
            edit: {
                fields: {
                    username: '',
                    email: '',
                    firstname: '',
                    lastname: ''
                },
                validation: {
                    message: '',
                    successMsg: '',
                    usernameOk: true,
                    emailOk: true,
                    firstnameOk: true,
                    lastnameOk: true
                }
            }
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(): void {

        const user = AuthManager.currentUser;
        if (user) {
            const state = this.state.edit;
            state.fields.username = user.username;
            state.fields.email = user.userEmail;
            state.fields.firstname = user.firstName;
            state.fields.lastname = user.lastName;
            this.setState({ edit: state });
        }
    }

    handleChange(e: ChangeEvent) {

        const target: HTMLInputElement = e.target as HTMLInputElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = target.value;
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
            message: valid ? '' : 'Please fill all required values correctly',
            successMsg: edit.validation.successMsg,
            ...stateValidation
        };
        this.setState({ edit });

        if (valid) {
            this.editUserSettings()
                .then(() => {
                    edit.validation.successMsg = 'Success!';
                    this.setState({ edit })
                })
                .then(() => this.getUserDetails({ data: AuthManager.currentUser }));
        } else {
            edit.validation.successMsg = '';
            this.setState({ edit });
        }
    }

    private validateEditForm() {

        const { username, firstname, lastname, email } = this.state.edit.fields;

        const validation = {
            username: this.requiredFieldValid(username),
            firstname: this.requiredFieldValid(firstname),
            lastname: this.requiredFieldValid(lastname),
            email: this.emailFieldValid(email)
        };

        return {
            valid: !Object.values(validation).includes(false),
            ...validation
        }
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    private emailFieldValid(email: string): boolean {

        return ValidationManager.emailFieldValid(email);
    }

    private editUserSettings() {

        const { username, firstname: firstName, lastname: lastName, email: userEmail } = this.state.edit.fields;
        const { userId } = AuthManager.currentUser;
        return axios.put(`${env.apiUrl}/users/update/${userId}`, { username, userEmail, lastName, firstName });
    }

    private getUserDetails(response: any) {

        const { data } = response;
        return axios.get(`${env.apiUrl}/users/read/${data.userId}`)
            .then((response) => {

                const [ user ] = response.data;
                AuthManager.currentUser = user;
            })
            .then(() => this.authManager.populateUserTeam())
            .then((response: any) => this.authManager.setPopulatedData(response))
            .then(() => this.authManager.notify('displayName'));
    }

    navigateTo(link: string) {

        this.props.history.push(link);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="user-settings" className="d-flex px-3">
                <div className="row user-settings-header d-flex my-4">
                    <p className="title m-0">User settings</p>
                    <button onClick={() => this.navigateTo('/tasklists')}>Back to tasklists</button>
                </div>

                <div className="row user-settings-body d-flex my-4">
                    <form id="user-details-form" className="form pt-0" onSubmit={this.handleEdit}>
                        <p className="text-center invalid-form-message m-0 mt-1">{this.state.edit.validation.message}</p>
                        <p className="text-center valid-form-message m-0 mt-1">{this.state.edit.validation.successMsg}</p>
                        <input type="text" className={!this.state.edit.validation.usernameOk ? "invalid-user-input" : ""} name="edit-username" placeholder="Username" value={this.state.edit.fields.username} onChange={this.handleChange} />
                        <input type="text" className={!this.state.edit.validation.firstnameOk ? "invalid-user-input" : ""} name="edit-firstname" placeholder="First name" value={this.state.edit.fields.firstname} onChange={this.handleChange} />
                        <input type="text" className={!this.state.edit.validation.lastnameOk ? "invalid-user-input" : ""} name="edit-lastname" placeholder="Last name" value={this.state.edit.fields.lastname} onChange={this.handleChange} />
                        <input type="email" className={!this.state.edit.validation.emailOk ? "invalid-user-input" : ""} name="edit-email" placeholder="Email" value={this.state.edit.fields.email} onChange={this.handleChange} />
                        <p className="text-center invalid-form-message m-0 mt-1">{!this.state.edit.validation.emailOk ? "That doesn't look like an email" : ""}</p>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserSettings;

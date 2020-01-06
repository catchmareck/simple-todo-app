import React, {ChangeEvent, Component, FormEvent} from 'react';
import './team-settings.scss';
import ValidationManager from "../../services/validation-manager";
import AuthManager from "../../services/auth-manager";
import axios from "axios";
import env from "../../services/env";

class TeamSettings extends Component<any, any> {

    private authManager: AuthManager = new AuthManager();
    constructor(props: any) {
        super(props);

        this.state = {
            edit: {
                fields: {
                    name: '',
                    description: ''
                },
                validation: {
                    message: '',
                    nameOk: true,
                    descriptionOk: true
                }
            },
            members: [],
            users: []
        };

        this.authManager.observe(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
        this.handleAddMember = this.handleAddMember.bind(this);
    }

    update(action: string) {

        if (action === 'team') {

            this.setState({ members: AuthManager.currentUser.team.users });
        }
    }

    componentDidMount(): void {

        const { team } = AuthManager.currentUser;
        if (team) {
            const state = this.state.edit;
            state.fields.name = team.teamName;
            state.fields.description = team.teamDescription;
            this.setState({ edit: state });
            this.authManager.notify('team');
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

        const { valid, name } = this.validateCreateForm();

        const { edit } = this.state;
        edit.validation = {
            message: valid ? '' : 'Please fill all required fields correctly',
            nameOk: name,
            descriptionOk: true
        };
        this.setState({ edit });

        if (valid) {
            this.editTeamSettings()
                .then(() => this.getTeamDetails({ data: AuthManager.currentUser.team }));
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

    private editTeamSettings() {

        const { name: teamName, description: teamDescription } = this.state.edit.fields;
        const { team: { teamId } } = AuthManager.currentUser;
        return axios.put(`${env.apiUrl}/teams/update/${teamId}`, { teamName, teamDescription });
    }

    private getTeamDetails(response: any) {

        const { data } = response;
        return axios.get(`${env.apiUrl}/teams/read/${data.teamId}`)
            .then((response) => {

                AuthManager.currentUser.team = response.data;
                this.authManager.notify('team');
            });
    }

    private getAllUsers() {
        // TODO
        console.log('TODO getAllUsers()');
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    navigateTo(link: string) {

        this.props.history.push(link);
    }

    private handleDeleteMember() {
        // TODO
        console.log('TODO handleDeleteMember()');
    }

    private handleAddMember() {
        // TODO
        console.log('TODO handleAddMember()');
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="team-settings" className="d-flex px-3">
                <div className="row team-settings-header d-flex my-4">
                    <p className="title m-0">Team settings</p>
                    <button onClick={() => this.navigateTo('/tasklists')}>Back to tasklists</button>
                </div>

                <div className="row team-settings-body d-flex my-4">
                    <div className="team-details-col">
                        <form id="team-details-form" className="form pt-0" onSubmit={this.handleEdit}>
                            <p className="text-center invalid-form-message m-0 mt-1">{this.state.edit.validation.message}</p>
                            <input type="text"  className={!this.state.edit.validation.nameOk ? "invalid-user-input" : ""} name="edit-name" placeholder="Team name" value={this.state.edit.fields.name} onChange={this.handleChange} />
                            <textarea name="edit-description" placeholder="Team description" value={this.state.edit.fields.description} onChange={this.handleChange}></textarea>

                            <button type="submit">Save</button>
                        </form>
                    </div>
                    <div className="team-members-col">
                        <div className="row">
                            <table className="members">
                                <thead>
                                    <tr>
                                        <th>Member</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.members.map((member: any) => {
                                        const action = AuthManager.currentUser.roles.some((role: any) => role.roleName === 'administrator') ? <td><a href='#' onClick={this.handleDeleteMember}>Delete</a></td> : <td>(unavailable)</td>;
                                        return (<tr>
                                            <td>{member.displayName}</td>
                                            {action}
                                        </tr>);
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="row d-flex">
                            <select name="member" className="my-2" defaultValue="" onClick={() => this.getAllUsers()}>
                                <option value="" defaultChecked={true} disabled>Member</option>
                                {this.state.users.map((user: any) => {

                                    return (<option value={user.userId}>{user.displayName}</option>)
                                })}
                            </select>
                            <button className="ml-2" onClick={this.handleAddMember}>Add member</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamSettings;

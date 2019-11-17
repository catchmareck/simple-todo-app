import React, {ChangeEvent, Component, FormEvent} from 'react';
import './team-settings.scss';
import ValidationManager from "../../services/validation-manager";

class TeamSettings extends Component<any, any> {

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
            }
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    }

    private validateCreateForm(): { valid: boolean, name: boolean } {

        const { name } = this.state.edit.fields;

        const validName = this.requiredFieldValid(name);

        return {
            valid: validName,
            name: validName
        }
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    navigateTo(link: string) {

        this.props.history.push(link);
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
                            <textarea name="description" placeholder="Team description"></textarea>

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
                                    <tr>
                                        <td>John Doe</td>
                                        <td>Delete</td>
                                    </tr>
                                    <tr>
                                        <td>Rick Dalton</td>
                                        <td>Delete</td>
                                    </tr>
                                    <tr>
                                        <td>Vincent Vega</td>
                                        <td>Delete</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row d-flex">
                            <select name="member" className="my-2" defaultValue="">
                                <option value="" defaultChecked={true} disabled>Member</option>
                                <option value="1">Vanessa Brickstone</option>
                                <option value="2">Francesca Burrito</option>
                                <option value="3">Monica Velucci</option>
                            </select>
                            <button className="ml-2">Add member</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamSettings;

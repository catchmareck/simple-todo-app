import React, {ChangeEvent, Component, FormEvent} from 'react';
import './create-team.scss';
import {Link} from "react-router-dom";

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
            this.props.history.push('/tasklists');
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

    private requiredFieldValid(field: string): boolean {

        return Boolean(field) && field.length > 0;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-team" className="d-flex px-3">
                <h3>Create a team</h3>
                <form id="create-team-form" className="form" onSubmit={this.handleCreate}>
                    <input type="text" name="create-name" placeholder="Team name" value={this.state.create.fields.name} onChange={this.handleChange} />
                    <p className="text-center invalid-form-message m-0 mt-1">{!this.state.create.validation.nameOk ? "This field is required" : ""}</p>
                    <textarea name="create-description" placeholder="Team description" value={this.state.create.fields.description} onChange={this.handleChange}></textarea>

                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default CreateTeam;

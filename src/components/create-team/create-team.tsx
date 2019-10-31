import React, { Component } from 'react';
import './create-team.scss';

class CreateTeam extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-team" className="d-flex px-3">
                <h3>Create a team</h3>
                <form id="create-team-form" className="form">
                    <input type="text" name="name" placeholder="Team name" />
                    <textarea name="description" placeholder="Team description"></textarea>

                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default CreateTeam;

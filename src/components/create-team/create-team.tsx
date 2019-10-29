import React, { Component } from 'react';
import './create-team.scss';

class CreateTeam extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-team" className="d-flex px-3">
                Tutaj widok create team
            </div>
        );
    }
}

export default CreateTeam;

import React, { Component } from 'react';
import './team-settings.scss';

class TeamSettings extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="team-settings" className="d-flex px-3">
                Tutaj widok team settings
            </div>
        );
    }
}

export default TeamSettings;

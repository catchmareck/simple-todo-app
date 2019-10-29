import React, { Component } from 'react';
import './tasklists.scss';

class Taskslists extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="tasklists" className="d-flex px-3">
                Tutaj główny widok na task listy
            </div>
        );
    }
}

export default Taskslists;

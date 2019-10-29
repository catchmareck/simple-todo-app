import React, { Component } from 'react';
import './create-list.scss';

class CreateListModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-list-modal" className="d-flex px-3">
                To ma być modal create list
            </div>
        );
    }
}

export default CreateListModal;

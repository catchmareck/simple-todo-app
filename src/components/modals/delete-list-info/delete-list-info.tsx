import React, { Component } from 'react';
import './delete-list-info.scss';

class DeleteListInfoModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="delete-list-info" className="d-flex px-3">
                To ma być modal delete list info
            </div>
        );
    }
}

export default DeleteListInfoModal;

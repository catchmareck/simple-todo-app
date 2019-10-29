import React, { Component } from 'react';
import './edit-list.scss';

class EditListModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="edit-list-modal" className="d-flex px-3">
                To ma być modal edit list
            </div>
        );
    }
}

export default EditListModal;

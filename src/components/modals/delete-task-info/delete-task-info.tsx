import React, { Component } from 'react';
import './delete-task-info.scss';

class DeleteTaskInfoModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="delete-task-info" className="d-flex px-3">
                To ma być modal delete task info
            </div>
        );
    }
}

export default DeleteTaskInfoModal;

import React, { Component } from 'react';
import './edit-task.scss';

class EditTaskModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="edit-task-modal" className="d-flex px-3">
                To ma być modal edit task
            </div>
        );
    }
}

export default EditTaskModal;

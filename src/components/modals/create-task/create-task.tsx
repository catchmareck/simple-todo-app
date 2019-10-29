import React, { Component } from 'react';
import './create-task.scss';

class CreateTaskModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="create-task-modal" className="d-flex px-3">
                To ma być modal create task
            </div>
        );
    }
}

export default CreateTaskModal;

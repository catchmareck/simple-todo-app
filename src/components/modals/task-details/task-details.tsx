import React, { Component } from 'react';
import './task-details.scss';

class TaskDetailsModal extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="task-details-modal" className="d-flex px-3">
                To ma być modal task details
            </div>
        );
    }
}

export default TaskDetailsModal;

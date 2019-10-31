import React, { Component } from 'react';
import './tasklists.scss';

class Taskslists extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="tasklists" className="d-flex px-3">
                <div className="row tasklists-header">
                    <button>Edit team</button>
                </div>
                <div className="row tasklists-body d-flex">
                    <div className="tasklist">
                        <p className="tasklist-header"><a>Todo</a></p>
                        <div className="tasklist-body">
                            <div className="task">Task title</div>
                            <div className="task">Task title</div>
                            <div className="task">Task title</div>
                            <button>Add +</button>
                        </div>
                    </div>
                    <div className="tasklist">
                        <p className="tasklist-header"><a>Bugs</a></p>
                        <div className="tasklist-body">
                            <button>Add +</button>
                        </div>
                    </div>
                    <div className="tasklist">
                        <p className="tasklist-header"><a>Current sprint</a></p>
                        <div className="tasklist-body">
                            <div className="task">Task title</div>
                            <div className="task">Task title</div>
                            <button>Add +</button>
                        </div>
                    </div>
                    <div className="d-flex add-tasklist-column">
                        <button>Add +</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Taskslists;

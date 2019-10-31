import React, { Component } from 'react';
import './tasklists.scss';
import {CreateListModal, CreateTaskModal, DeleteListInfoModal, EditListModal} from "../index";

class Taskslists extends Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            showCreateListModal: false,
            showEditListModal: false,
            showDeleteListModal: false,
            showCreateTaskModal: false,
        };
        
        this.showCreateListModal = this.showCreateListModal.bind(this);
        this.showEditListModal = this.showEditListModal.bind(this);
        this.showDeleteListModal = this.showDeleteListModal.bind(this);
        this.showCreateTaskModal = this.showCreateTaskModal.bind(this);
    }
    
    showCreateListModal() {
        
        this.setState({ showCreateListModal: true });
    }
    
    showEditListModal() {
        
        this.setState({ showEditListModal: true });
        this.showDeleteListModal();
    }
    
    showDeleteListModal() {
        
        this.setState({ showDeleteListModal: true });
    }
    
    showCreateTaskModal() {
        
        this.setState({ showCreateTaskModal: true });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="tasklists" className="d-flex px-3">
                <div className="row tasklists-header">
                    <button>Edit team</button>
                </div>
                <div className="row tasklists-body d-flex">
                    <div className="tasklist">
                        <p className="tasklist-header"><a onClick={this.showEditListModal}>Todo</a></p>
                        <div className="tasklist-body">
                            <div className="task">Task title</div>
                            <div className="task">Task title</div>
                            <div className="task">Task title</div>
                            <button onClick={this.showCreateTaskModal}>Add +</button>
                        </div>
                    </div>
                    <div className="tasklist">
                        <p className="tasklist-header"><a onClick={this.showEditListModal}>Bugs</a></p>
                        <div className="tasklist-body">
                            <button onClick={this.showCreateTaskModal}>Add +</button>
                        </div>
                    </div>
                    <div className="tasklist">
                        <p className="tasklist-header"><a onClick={this.showEditListModal}>Current sprint</a></p>
                        <div className="tasklist-body">
                            <div className="task">Task title</div>
                            <div className="task">Task title</div>
                            <button onClick={this.showCreateTaskModal}>Add +</button>
                        </div>
                    </div>
                    <div className="d-flex add-tasklist-column">
                        <button onClick={this.showCreateListModal}>Add +</button>
                    </div>
                </div>
                <CreateListModal show={this.state.showCreateListModal} />
                <EditListModal show={this.state.showEditListModal} />
                <DeleteListInfoModal show={this.state.showDeleteListModal}/>
                <CreateTaskModal show={this.state.showCreateTaskModal} />
            </div>
        );
    }
}

export default Taskslists;

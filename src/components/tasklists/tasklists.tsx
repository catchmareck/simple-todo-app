import React, { Component } from 'react';
import './tasklists.scss';
import {
    CreateListModal,
    CreateTaskModal,
    DeleteListInfoModal,
    DeleteTaskInfoModal,
    EditListModal, EditTaskModal,
    TaskDetailsModal
} from "../index";

class Taskslists extends Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            showCreateListModal: false,
            showEditListModal: false,
            showEditTaskModal: false,
            showDeleteListModal: false,
            showDeleteTaskModal: false,
            showCreateTaskModal: false,
            showTaskDetailsModal: false,
            task: {}
        };
        
        this.showCreateListModal = this.showCreateListModal.bind(this);
        this.showEditListModal = this.showEditListModal.bind(this);
        this.showEditTaskModal = this.showEditTaskModal.bind(this);
        this.showDeleteListModal = this.showDeleteListModal.bind(this);
        this.showDeleteTaskModal = this.showDeleteTaskModal.bind(this);
        this.showCreateTaskModal = this.showCreateTaskModal.bind(this);
        this.showTaskDetailsModal = this.showTaskDetailsModal.bind(this);
    }
    
    showCreateListModal() {
        
        this.setState({ showCreateListModal: true });
    }
    
    showEditListModal() {
        
        this.setState({ showEditListModal: true });
        this.showDeleteListModal();
    }

    showEditTaskModal() {
        
        this.setState({ showEditTaskModal: true });
    }
    
    showDeleteListModal() {
        
        this.setState({ showDeleteListModal: true });
    }

    showDeleteTaskModal() {
        
        this.setState({ showDeleteTaskModal: true });
    }
    
    showCreateTaskModal() {
        
        this.setState({ showCreateTaskModal: true });
    }

    showTaskDetailsModal(task: any) {
        
        this.setState({ showTaskDetailsModal: true, task });
        this.showEditTaskModal();
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
                            <div className="task" onClick={() => this.showTaskDetailsModal({title: 'Task 1', desc: 'Lorem ipsum dolor sit amet', listName: 'Todo'})}>Task title</div>
                            <div className="task" onClick={() => this.showTaskDetailsModal({title: 'Task 2', desc: 'Lorem ipsum dolor sit amet', listName: 'Todo'})}>Task title</div>
                            <div className="task" onClick={() => this.showTaskDetailsModal({title: 'Task 3', desc: 'Lorem ipsum dolor sit amet', listName: 'Todo'})}>Task title</div>
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
                            <div className="task" onClick={() => this.showTaskDetailsModal({title: 'Task 4', desc: 'Lorem ipsum dolor sit amet', listName: 'Current sprint'})}>Task title</div>
                            <div className="task" onClick={() => this.showTaskDetailsModal({title: 'Task 5', desc: 'Lorem ipsum dolor sit amet', listName: 'Current sprint'})}>Task title</div>
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
                <TaskDetailsModal show={this.state.showTaskDetailsModal} task={this.state.task} />
                <DeleteTaskInfoModal show={this.state.showDeleteTaskModal} />
                <EditTaskModal show={this.state.showEditTaskModal} />
            </div>
        );
    }
}

export default Taskslists;

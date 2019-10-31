import React, { Component } from 'react';
import './edit-task.scss';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay";

class EditTaskModal extends Component<any, any> {

    private closing = false;
    private modal: any = null;

    constructor(props: { show: boolean, title: string }) {
        super(props);

        this.state = {
            show: props.show
        };

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

        if (!this.closing && this.state.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }

        if (this.modal === null && this.props.show === true) {

            this.modal = document.createElement('div');
            this.modal.style.position = 'absolute';
            this.modal.style.width = '100%';
            this.modal.style.height = '100%';
            document.body.prepend(this.modal);
            ReactDOM.render(<ModalOverlay />, this.modal);
        }
    }

    closeModal() {

        this.closing = true;
        this.setState({ show: false }, () => {

            ReactDOM.unmountComponentAtNode(this.modal);
            document.body.removeChild(this.modal);

            this.modal = null;
            this.closing = false
        });

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="edit-task-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">Edit task</p>
                    <button className="close delete" onClick={this.closeModal}>Delete</button>
                </div>
                <div className="modal-body">
                    <form className="form">
                        
                        <div className="row">
                            <input type="text" name="title" placeholder="Task title"/>
                            <textarea name="description" placeholder="Task description"></textarea>
                        </div>

                        <div className="row d-flex details-middle-row">
                            <input type="text" placeholder="Deadline"/>
                            <input type="checkbox" id="is-done" />
                            <label htmlFor="is-done">Done?</label>
                        </div>

                        <div className="row">
                            <select name="assignees">
                                <option value="" selected disabled>Assignees</option>
                                <option value="1">John Doe</option>
                                <option value="2">Alie Bartner</option>
                                <option value="3">Evan Hoggs</option>
                            </select>
                            <select name="list">
                                <option value="" selected disabled>List</option>
                                <option value="1">Todo</option>
                                <option value="2">Bugs</option>
                                <option value="3">Current sprint</option>
                            </select>
                        </div>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditTaskModal;

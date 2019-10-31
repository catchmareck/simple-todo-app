import React, { Component } from 'react';
import './task-details.scss';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay";

class TaskDetailsModal extends Component<any, any> {

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
            <div id="task-details-modal" className={`modal ${this.state.show ? 'show' : ''}`}>
                <div className="modal-header">
                    <p className="title">{this.props.task.title}</p>
                    <button className="close" onClick={this.closeModal}>Edit</button>
                </div>
                <div className="modal-body">
                    
                    <div className="row">
                        <p className="task-description">On list: {this.props.task.listName}</p>
                    </div>
                    
                    <div className="row d-flex details-middle-row">
                        <input type="text" placeholder="Deadline"/>
                        <input type="checkbox" id="is-done" />
                        <label htmlFor="is-done">Done?</label>
                    </div>
                    
                    <div className="row">
                        <select multiple>
                            <option value="1">John Doe</option>
                            <option value="2">Alie Bartner</option>
                            <option value="3">Evan Hoggs</option>
                        </select>
                    </div>
                    
                    <button onClick={this.closeModal}>Ok</button>
                </div>
            </div>
        );
    }
}

export default TaskDetailsModal;

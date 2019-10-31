import React, { Component } from 'react';

class ModalOverlay extends Component<any, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div className="modal-overlay"></div>
        );
    }
}

export default ModalOverlay;

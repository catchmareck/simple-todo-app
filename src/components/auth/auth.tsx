import React, { Component } from 'react';
import './auth.scss';

class Auth extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="auth" className="d-flex px-3">
                Tutaj tabsy Login/Register + Registration confirmation
            </div>
        );
    }
}

export default Auth;

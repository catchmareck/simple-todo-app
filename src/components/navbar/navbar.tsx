import React, { Component } from 'react';
import './navbar.scss';
import logo from '../../logo.svg';
import AuthManager from "../../services/auth-manager";

class Navbar extends Component<any, any> {

    private authManager = new AuthManager();

    constructor(props: any) {
        super(props);

        this.state = {
            isLoggedIn: this.authManager.isLoggedIn()
        };

        this.authManager.observe(this);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.authManager.logout();
    }

    update() {

        this.setState({ isLoggedIn: this.authManager.isLoggedIn() });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="navbar" className="d-flex px-3">
                <div className="logo-title-wrapper float-l d-flex">
                    <img src={logo} alt="Logo"/>
                    <p className="main-title ml-4 my-0">TODO App</p>
                </div>
                <span>
                    {
                        this.state.isLoggedIn ?
                        (
                            <span>
                                <a href="#" className="mx-2">Hello, John</a>
                                <a href="#" className="mx-2" onClick={this.logout}>Logout</a>
                            </span>
                        ) : ''
                    }
                    <a href="#" className="float-r mx-2">Help</a>
                </span>
            </div>
        );
    }
}

export default Navbar;

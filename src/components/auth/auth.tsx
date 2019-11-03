import React, { Component } from 'react';
import './auth.scss';
import {Link} from "react-router-dom";

class Auth extends Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(tabId: string, target: EventTarget) {
        
        document.querySelectorAll('.tab-pane.active').forEach((tab: Element) => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button a.active').forEach((btn: Element) => btn.classList.remove('active'));
        
        const tab: HTMLDivElement = document.getElementById(tabId) as HTMLDivElement;
        tab.classList.add('active');
        (target as Element).classList.add('active');
    }
    
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="auth" className="d-flex navbar-top">
                <div className="tabs d-flex">
                    <ul className="tabs-list d-flex m-0 p-0">
                        <li className="tab-button" onClick={(e) => this.activateTab('login-tab', e.target)}><a className="active">Login</a></li>
                        <li className="tab-button" onClick={(e) => this.activateTab('register-tab', e.target)}><a>Register</a></li>
                    </ul>
                    <div className="tab-panes px-1">
                        <div id="login-tab" className="tab-pane active">
                            <form id="login-form" className="form">
                                <input type="text" name="username" placeholder="Username" />
                                <input type="password" name="password" placeholder="Password" />
                                
                                <button type="submit"><Link to='/create-team'>Login</Link></button>
                            </form>
                        </div>
                        <div id="register-tab" className="tab-pane">
                            <form id="register-form" className="form">
                                <input type="text" name="username" placeholder="Username" />
                                <input type="text" name="firstname" placeholder="First name" />
                                <input type="text" name="lastname" placeholder="Last name" />
                                <input type="email" name="email" placeholder="Email" />
                                <input type="password" name="password" placeholder="Password" />
                                <input type="password" name="repeatpassword" placeholder="Repeat password" />
                                
                                <button type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;

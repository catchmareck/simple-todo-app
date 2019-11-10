import React, {ChangeEvent, Component, FormEvent} from 'react';
import './auth.scss';

class Auth extends Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            login: {
                fields: {
                    username: '',
                    password: ''
                },
                validation: {
                    message: '',
                    usernameOk: true,
                    passwordOk: true
                }
            }
        };
        
        this.activateTab = this.activateTab.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    activateTab(tabId: string, target: EventTarget) {
        
        document.querySelectorAll('.tab-pane.active').forEach((tab: Element) => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button a.active').forEach((btn: Element) => btn.classList.remove('active'));
        
        const tab: HTMLDivElement = document.getElementById(tabId) as HTMLDivElement;
        tab.classList.add('active');
        (target as Element).classList.add('active');
    }
    
    handleLogin(e: FormEvent) {
        
        e.preventDefault();
        
        const { valid, username, password } = this.validateLoginForm();

        const { login } = this.state;
        login.validation = {
            message: valid ? '' : 'Invalid username or password',
            usernameOk: username,
            passwordOk: password
        };
        this.setState({ login });
    }
    
    private validateLoginForm(): { valid: boolean, username: boolean, password: boolean } {

        const { username, password } = this.state.login.fields;

        const invalidUsername = !username || !username.length;
        const invalidPassword = !password || !password.length;

        return {
            valid: !(invalidUsername || invalidPassword),
            username: !invalidUsername,
            password: !invalidPassword
        }
    }
    
    handleChange(e: ChangeEvent) {
        
        const target: HTMLInputElement = e.target as HTMLInputElement;
        const fieldName = target.name;
        
        const { login } = this.state;
        login.fields[fieldName] = target.value;
        this.setState({ login });
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
                            <p className="text-center invalid-form-message m-0 mt-1">{this.state.login.validation.message}</p>
                            <form id="login-form" className="form" onSubmit={this.handleLogin}>
                                <input type="text" className={!this.state.login.validation.usernameOk ? "invalid-user-input" : ""} name="username" placeholder="Username" value={this.state.login.fields.username} onChange={this.handleChange} />
                                <input type="password" className={!this.state.login.validation.passwordOk ? "invalid-user-input" : ""} name="password" placeholder="Password" value={this.state.login.fields.password} onChange={this.handleChange} />
                                
                                <button type="submit">Login</button>
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

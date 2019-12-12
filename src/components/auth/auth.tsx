import React, {ChangeEvent, Component, FormEvent} from 'react';
import './auth.scss';
import AuthManager from "../../services/auth-manager";
import ValidationManager from "../../services/validation-manager";

class Auth extends Component<any, any> {

    private authManager = new AuthManager();

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
            },
            register: {
                fields: {
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    repeatpassword: ''
                },
                validation: {
                    message: '',
                    usernameOk: true,
                    firstnameOk: true,
                    lastnameOk: true,
                    emailOk: true,
                    passwordOk: true,
                    repeatpasswordOk: true
                }
            }
        };

        this.authManager.observe(this);

        this.login = this.login.bind(this);

        this.activateTab = this.activateTab.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    update(action: string) {

        if (action === 'logout') {

            this.props.history.push('/auth');
        }
    }

    login() {
        return this.authManager.login();
    }

    register() {
        const { username, email: userEmail, lastname: lastName, firstname: firstName, password } = this.state.register.fields;
        return this.authManager.register({ username, userEmail, lastName, firstName, password });
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

        if (valid) {
            this.login()
                .then(() => this.props.history.push('/create-team'));
        }
    }

    private validateLoginForm(): { valid: boolean, username: boolean, password: boolean } {

        const { username, password } = this.state.login.fields;

        const invalidUsername = !this.requiredFieldValid(username);
        const invalidPassword = !this.requiredFieldValid(password);

        return {
            valid: !(invalidUsername || invalidPassword),
            username: !invalidUsername,
            password: !invalidPassword
        }
    }

    handleChange(e: ChangeEvent) {

        const target: HTMLInputElement = e.target as HTMLInputElement;
        const [formType, fieldName] = target.name.split('-');

        const state = this.state[formType];
        state.fields[fieldName] = target.value;
        this.setState({ [formType]: state });
    }

    handleRegister(e: FormEvent) {

        e.preventDefault();

        const { valid, ...fields } = this.validateRegisterForm();

        const stateValidation = Object.keys(fields).reduce((res: any, curr: string) => {
            res[`${curr}Ok`] = (fields as any)[curr];
            return res;
        }, {});

        const { register } = this.state;
        register.validation = {
            message: valid ? '' : 'Please fill all required values correctly',
            ...stateValidation
        };
        this.setState({ register });

        if (valid) {
            this.register()
                .then(() => this.login())
                .then(() => this.props.history.push('/create-team'));
        }
    }

    private validateRegisterForm() {

        const { username, firstname, lastname, email, password, repeatpassword } = this.state.register.fields;

        const validation = {
            username: this.requiredFieldValid(username),
            firstname: this.requiredFieldValid(firstname),
            lastname: this.requiredFieldValid(lastname),
            email: this.emailFieldValid(email),
            password: this.passwordFieldValid(password),
            repeatpassword: this.repeatPasswordFieldValid(repeatpassword)
        };

        return {
            valid: !Object.values(validation).includes(false),
            ...validation
        }
    }

    private requiredFieldValid(field: string): boolean {

        return ValidationManager.requiredFieldValid(field);
    }

    private emailFieldValid(email: string): boolean {

        return ValidationManager.emailFieldValid(email);
    }

    private passwordFieldValid(password: string): boolean {

        return ValidationManager.passwordFieldValid(password);
    }

    private repeatPasswordFieldValid(repeatpassword: string): boolean {

        return repeatpassword === this.state.register.fields.password;
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
                            <form id="login-form" className="form" onSubmit={this.handleLogin} noValidate={true}>
                                <input type="text" className={!this.state.login.validation.usernameOk ? "invalid-user-input" : ""} name="login-username" placeholder="Username" value={this.state.login.fields.username} onChange={this.handleChange} />
                                <input type="password" className={!this.state.login.validation.passwordOk ? "invalid-user-input" : ""} name="login-password" placeholder="Password" value={this.state.login.fields.password} onChange={this.handleChange} />

                                <button type="submit">Login</button>
                            </form>
                        </div>
                        <div id="register-tab" className="tab-pane">
                            <p className="text-center invalid-form-message m-0 mt-1">{this.state.register.validation.message}</p>
                            <form id="register-form" className="form" onSubmit={this.handleRegister} noValidate={true}>
                                <input type="text" className={!this.state.register.validation.usernameOk ? "invalid-user-input" : ""} name="register-username" placeholder="Username" value={this.state.register.fields.username} onChange={this.handleChange} />
                                <input type="text" className={!this.state.register.validation.firstnameOk ? "invalid-user-input" : ""} name="register-firstname" placeholder="First name" value={this.state.register.fields.firstname} onChange={this.handleChange} />
                                <input type="text" className={!this.state.register.validation.lastnameOk ? "invalid-user-input" : ""} name="register-lastname" placeholder="Last name" value={this.state.register.fields.lastname} onChange={this.handleChange} />
                                <input type="email" className={!this.state.register.validation.emailOk ? "invalid-user-input" : ""} name="register-email" placeholder="Email" value={this.state.register.fields.email} onChange={this.handleChange} />
                                <p className="text-center invalid-form-message m-0 mt-1">{!this.state.register.validation.emailOk ? "That doesn't look like an email" : ""}</p>
                                <input type="password" className={!this.state.register.validation.passwordOk ? "invalid-user-input" : ""} name="register-password" placeholder="Password" value={this.state.register.fields.password} onChange={this.handleChange} />
                                <input type="password" className={!this.state.register.validation.repeatpasswordOk ? "invalid-user-input" : ""} name="register-repeatpassword" placeholder="Repeat password" value={this.state.register.fields.repeatpassword} onChange={this.handleChange} />
                                <p className="text-center invalid-form-message m-0 mt-1">{!this.state.register.validation.repeatpasswordOk ? "Passwords do not match" : ""}</p>
                                <p className="text-center invalid-form-message m-0 mt-1">{!this.state.register.validation.passwordOk ? "Password should contain big and small letters, numbers, special characters and has to be of min length 8" : ""}</p>

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

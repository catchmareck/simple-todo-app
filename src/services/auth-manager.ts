import axios from 'axios';
import env from "./env";

class AuthManager {

    public static currentUser: any = {};

    private static observers: any[] = [];

    observe(observer: any) {

        AuthManager.observers.push(observer);
    }

    notify(action: string) {

        AuthManager.observers.forEach((observer) => {

            observer.update(action);
        });
    }

    isLoggedIn(): boolean {

        return localStorage.getItem('loggedIn') !== null;
    }

    login() {

        return Promise.resolve()
            .then(() => {
                AuthManager.currentUser = {
                    userId: 1,
                    displayName: 'Ala Makota TOOD'
                };

                localStorage.setItem('loggedIn', 'true');
                this.notify('login');
            });
    }

    register(registerFields: any) {

        return axios.post(`${env.apiUrl}/users/create`, registerFields);
    }

    logout() {

        return Promise.resolve()
            .then(() => {
                localStorage.removeItem('loggedIn');
                this.notify('logout');
            });
    }
}

export default AuthManager;

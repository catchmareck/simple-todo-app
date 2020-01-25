import axios from 'axios';
import env from "./env";

class AuthManager {

    public static currentUser: any = {};
    public static allRoles: any[] = [];

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

    login(loginFields: any) {

        return axios.put(`${env.apiUrl}/users/login`, loginFields)
            .then((response) => {

                AuthManager.currentUser = response.data;
            })
            .then(() => this.populateUserTeam())
            .then((response: any) => {

                this.setPopulatedData(response);

                localStorage.setItem('loggedIn', 'true');
                this.notify('login');
            });
    }

    populateUserTeam() {

        if (AuthManager.currentUser.team_id !== null) {

            return axios.get(`${env.apiUrl}/teams/read/${AuthManager.currentUser.team.teamId}`);
        } else {

            return Promise.resolve({});
        }
    }

    setPopulatedData(response: any) {

        if (response.data) {

            AuthManager.currentUser.team = response.data;
        }
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

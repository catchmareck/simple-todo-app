class AuthManager {

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

        localStorage.setItem('loggedIn', 'true');
        this.notify('login');
    }

    logout() {

        localStorage.removeItem('loggedIn');
        this.notify('logout');
    }
}

export default AuthManager;

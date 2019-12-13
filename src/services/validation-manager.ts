class ValidationManager {

    private static minPassLength = 8;

    static requiredFieldValid(field: string): boolean {

        return Boolean(field) && field.toString().trim().length > 0;
    }

    static emailFieldValid(email: string): boolean {

        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    static passwordFieldValid(password: string): boolean {

        const strengthRequirements = [/[a-z]/, /[A-Z]/, /\d/, /\W/];
        const weak = strengthRequirements.map((regex) => regex.test(password)).includes(false);
        return password.length >= this.minPassLength && !weak;
    }

    static dateFieldValid(field: string): boolean {

        const selectedDate = new Date(field);
        const dayValid = selectedDate.getDate() <= 31;
        const monthValid = selectedDate.getMonth() <= 11;
        const yearValid = selectedDate.getFullYear() <= 9999;

        const now = Date.now();
        const selected = Date.parse(field);

        return Boolean(field) && selected >= now && dayValid && monthValid && yearValid;
    }
}

export default ValidationManager;

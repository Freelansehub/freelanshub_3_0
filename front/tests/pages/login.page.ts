import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get loadingLoginForm () {
        return $('#login-form');
    }

    public get inputUsername () {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get inputPhone () {
        return $('#phone');
    }

    public get inputEmail () {
        return $('#email');
    }

    public get inputRole () {
        return $('#role');
    }

    public get btnSubmit () {
        return $('#login-submit');
    }

    public get loginTogle () {
        return $('#login-togle');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async register (username: string, password: string, email: string, phone: string, role: string) {
        await this.open();
        await this.loginTogle.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputEmail.setValue(email);
        await this.inputPhone.setValue(phone);
        await this.inputRole.selectByVisibleText(role);
        await this.btnSubmit.click();
    }

    public async login (email: string, password: string) {
        await this.open();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('/login');
    }
}

export default new LoginPage();

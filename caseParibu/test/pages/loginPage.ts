import { Page } from 'playwright';
import { loginPageLocators } from '../locators/loginpageLoc';

let faker = require('faker');

export class LoginPage {
  constructor(private page: Page) { }

  async fillLoginForm() {
        const countryCode = faker.random.number({ min: 1, max: 999 });
        const phoneNumber = faker.phone.phoneNumber();
        const password = faker.internet.password();
        await this.page.fill(loginPageLocators.countryCode, countryCode.toString());
        await this.page.fill(loginPageLocators.phoneNumber, phoneNumber.toString());
        await this.page.fill(loginPageLocators.password, password.toString());
  }
  
  async submitLoginForm() {
    await this.page.click(loginPageLocators.loginButton);
  }

  async getErrorMessage() {
    return this.page.textContent(loginPageLocators.errorMessage);
  }

}


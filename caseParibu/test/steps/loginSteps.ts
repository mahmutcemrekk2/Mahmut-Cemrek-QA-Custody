import { Given, When, Then } from '@cucumber/cucumber';
import { getPage } from '../hooks/hooks';
import { LoginPage } from '../pages/loginPage';
import { expect } from "@playwright/test";
import { messages } from '../resources/messages';



let loginPage: LoginPage;

When('I fill in the login form with invalid credentials', async () => {
    loginPage = new LoginPage(getPage());
    await loginPage.fillLoginForm();
});
  
When('I submit the login form', async () => {
  await loginPage.submitLoginForm();
});

Then('I should see an error message indicating invalid credentials', async () => {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toBe(messages.loginError);
  console.log('On the screen: Erroneous information warning message was seen and the content of the warning message was verified.');
});
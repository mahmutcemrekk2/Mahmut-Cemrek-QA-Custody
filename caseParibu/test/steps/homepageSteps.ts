import { Given, When, Then } from '@cucumber/cucumber';
import { getPage } from '../hooks/hooks';
import { HomePage } from '../pages/homepage';

let homepage: HomePage;

         Given('I navigate to the Paribu homepage',  async () => {
            homepage = new HomePage(getPage());
            await homepage.navigate();
         });

         When('I close the cookie notification', async () => {
            await homepage.closeCookieNotification();
         });

         When('I navigate to the Markets page', async () => {
            await homepage.openMarketsPage()
         });

         When('I click on the login button', async () => {
            await homepage.clickLoginButton();
          });

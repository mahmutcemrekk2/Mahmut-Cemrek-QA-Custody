import { Given, When, Then } from '@cucumber/cucumber';
import { getPage } from '../hooks/hooks';
import { MarketPage } from '../pages/marketPage';

let marketpage: MarketPage;

When('I select the FAN filter', async () => {
    marketpage = new MarketPage(getPage());
    await marketpage.selectFanFilter();
});

When('I set the price change time range to {int} hours', async (time: number) => {
    await marketpage.setPriceChangeInterval(time);
});
 
When('I click on the {int}rd cryptocurrency in the list', async (which: number) => {
    await marketpage.clickCryptocurrency(which);
});
 
When('I enter the current price in the Unit Price field', async () => {
    await marketpage.enterUnitPrice();
});
 
When('I enter {int} in the Amount field', async (amount: number) => {
    await marketpage.enterAmount(amount)
});
 
Then('the total price should be correctly calculated', async () => {
    await marketpage.verifyTotalPrice();
});

 

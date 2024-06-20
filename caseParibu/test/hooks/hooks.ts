import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox } from 'playwright';
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

let logFilePath = path.join(__dirname, '../logs/test.log');


function writeToLog(message: string) {
    fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
}

setDefaultTimeout(1000 * 15);

let browser: Browser;
let bCtx: BrowserContext
let page: Page;

BeforeAll(async function () {
    dotenv.config({
        path:`${process.cwd()}/config/.env.${process.env.npm_config_env}`
    });
    let browserType = process.env.browser;
    switch (browserType) {
        case 'chrome':
        case 'gc':
            browser = await chromium.launch({ headless: false, channel: "chrome", args: ["--start-maximized"] });
            break;
        case 'firefox':
        case 'ff':
            browser = await firefox.launch({ headless: false, args: ["--start-maximized"] });
            break;
        case 'edge':
        case 'msedge':
            browser = await chromium.launch({ headless: false, channel: "msedge", args: ["--start-maximized"] });
            break;
        default:
            throw new Error(`invalid browser type ${browserType} is passed..! please correct it.`);
    }
    writeToLog(`Browser launched: ${browserType}`);
});

Before(async function (scenario) {
    bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
    page = await bCtx.newPage();
    writeToLog(`!!-------${scenario.pickle.name} is started-------!!`)
});

After(async function (scenario) {
    await page.close();
    await bCtx.close();
    writeToLog(`!!-------${scenario.pickle.name} is ended-------!!`)
});

BeforeStep(async function (scenario) {
    writeToLog(`!!-------${scenario.pickleStep.text} is started-------!!`)
});

AfterStep(async function (scenario) {
    writeToLog(`!!-------${scenario.pickleStep.text} is ended-------!!`)
});

fs.writeFileSync(logFilePath, '');

export function getPage(): Page {
    return page;
}
import { WebDriver, Builder } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import Logger from '@utils/logger/logger';
import { BROWSER } from './config.types';
import { COLOR, LEVEL } from '@utils/logger/logger.types';

export class DriverFactory {
    private static _instance: DriverFactory;

    /**
     * Singleton method get DriverFactory instance
     * @returns DriverFactory instance
     */
    public static getInstance(): DriverFactory {
        if (DriverFactory._instance == null) {
            DriverFactory._instance = new DriverFactory();
        }
        return DriverFactory._instance;
    }

    public async createWebDriver(): Promise<WebDriver | undefined> {
        let driver: WebDriver | undefined;
        const browserName = process.env.BROWSER?.toLowerCase() ?? BROWSER.CHROME;
        try {
            switch (browserName) {
                case BROWSER.CHROME:
                    const chromeOptions = new ChromeOptions();
                    chromeOptions.addArguments('disable-infobars');
                    if (process.env.HEADLESS) chromeOptions.headless();
                    driver = (await new Builder()
                        .forBrowser(browserName)
                        .setChromeOptions(chromeOptions)
                        .build()) as WebDriver;
                    break;
                case BROWSER.FIREFOX:
                    const firefoxOptions = new FirefoxOptions();
                    if (process.env.HEADLESS) firefoxOptions.headless();
                    driver = (await new Builder()
                        .forBrowser(browserName)
                        .setFirefoxOptions(firefoxOptions)
                        .build()) as WebDriver;
                    break;
            }
        } catch (err) {
            Logger.notify(
                LEVEL.ERROR,
                this.createWebDriver.name,
                `Failed to create a web driver with errors ========> ${err}`
            );
        }
        Logger.decorateMessage(`Create web driver for ${browserName} browser successfully !!`, COLOR.CYAN);
        return driver;
    }
}

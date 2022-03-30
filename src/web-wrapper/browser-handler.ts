import { Actions, Locator, until, WebDriver, WebElement } from 'selenium-webdriver';
import { DriverFactory } from '@config/driver-factory';
import Logger from '@utils/logger/logger';
import { TIME_OUT } from '@config/timeout.config';
import Timer from '@utils/timer';
import { LEVEL } from '@utils/logger/logger.types';

export default class BrowserHandler {
    private static _currentBrowserDriver: WebDriver;
    private static readonly _browserDrivers: Array<WebDriver>;

    private static async getDriverInstance(): Promise<WebDriver> {
        try {
            return (BrowserHandler._currentBrowserDriver =
                BrowserHandler._currentBrowserDriver ??
                ((await DriverFactory.getInstance().createWebDriver()) as WebDriver));
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Navigate to the URL
     * @param url The URL will be browser navigated to
     */
    public static async navigateTo(url: string): Promise<void> {
        try {
            Logger.notify(LEVEL.INFO, `${this.navigateTo.name}`, `WebDriver navigate to the url ${url}`);
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.get(url);
            webDriver.wait(
                async (webDriver) => (await webDriver.executeScript('return document.readyState')) == 'complete',
                TIME_OUT.LONG,
                `===> Failure navigate to ${url} <===`
            );
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public static async getElement(locator: Locator): Promise<WebElement> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return await webDriver.findElement(locator);
        } catch (err) {
            throw err;
        }
    }

    public static async getElements(locator: Locator): Promise<WebElement[]> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return await webDriver.findElements(locator);
        } catch (err) {
            throw err;
        }
    }

    public static async getActions(): Promise<Actions> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return webDriver.actions();
        } catch (err) {
            throw err;
        }
    }

    public static async closeBrowser(): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.close();
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public static async executeJavaScript(script: string, ...var_args: any[]): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return await webDriver.executeScript(script, var_args);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public static async sleepInSecond(second: number): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.sleep(second * 1000);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public static async scrollToTop(): Promise<void> {
        try {
            await this.executeJavaScript('window.scrollTo(0, 0);');
        } catch (err: any) {
            throw err;
        }
    }

    public static async wait(condition: any, opt_timeout: any, opt_message?: any): Promise<WebElement> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return webDriver.wait(condition, opt_timeout, opt_message);
        } catch (err) {
            throw err;
        }
    }

    public static async maximizeWindowBrowser(): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.manage().window().maximize();
        } catch (err) {
            throw err;
        }
    }

    public static async quitSession(): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.quit();
        } catch (err) {
            throw err;
        }
    }

    public static async isAlertDisplayed(): Promise<boolean> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return (await webDriver.wait(until.alertIsPresent(), TIME_OUT.SHORT)) ? true : false;
        } catch (err) {
            throw err;
        }
    }

    public static async acceptAlert(): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            const currentAlert = await webDriver.switchTo().alert();
            await currentAlert.accept();
        } catch (err) {
            throw err;
        }
    }

    public static async dismissAlert(): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            const currentAlert = await webDriver.switchTo().alert();
            await currentAlert.dismiss();
        } catch (err) {
            throw err;
        }
    }

    public static async refreshPage(): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.navigate().refresh();
        } catch (err) {
            throw err;
        }
    }

    public static async switchWindowByHandle(handle: string): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            await webDriver.switchTo().window(handle);
        } catch (err) {
            throw err;
        }
    }

    public static async getWindowHandle(): Promise<string> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            return await webDriver.getWindowHandle();
        } catch (err) {
            throw err;
        }
    }

    public static async switchWindowByTitle(title: string, timeout: number = TIME_OUT.SHORT): Promise<void> {
        try {
            const webDriver = await BrowserHandler.getDriverInstance();
            const allWindowHandles: string[] = await webDriver.getAllWindowHandles();
            let isMatchTitle = false;
            const timer: Timer = new Timer();
            timer.startClock();
            while (timer.getRemainingTimeInSecond(timeout) > 0) {
                for (let handle of allWindowHandles) {
                    await webDriver.switchTo().window(handle);
                    await webDriver.sleep(500);
                    const currentTitle: string = await webDriver.getTitle();
                    if (currentTitle === title) {
                        isMatchTitle = true;
                        break;
                    }
                }
            }
            if (timer.getRemainingTimeInSecond(timeout) <= 0 && !isMatchTitle) {
                throw new Error(`Not able to switch window title "${title}"`);
            }
        } catch (err) {
            throw err;
        }
    }
}

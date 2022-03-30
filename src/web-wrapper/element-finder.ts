import { Locator, until, WebElement } from 'selenium-webdriver';
import BrowserHandler from '@web-wrapper/browser-handler';
import { TIME_OUT } from '@config/timeout.config';

export default class ElementFinder {
    private _locator: Locator;
    private _element!: WebElement; // TS 2.7: definite assignment assertions

    constructor(locator: Locator) {
        this._locator = locator;
    }

    private async _mapElement(): Promise<WebElement> {
        try {
            this._element = await BrowserHandler.getElement(this._locator);
            return this._element;
        } catch (err) {
            throw err;
        }
    }

    public async click(): Promise<void> {
        try {
            const ele: WebElement = await this._mapElement();
            await this.waitForElementAppear();
            ele.click();
        } catch (err) {
            throw err;
        }
    }

    public async type(text: string): Promise<void> {
        try {
            const ele: WebElement = await this._mapElement();
            await this.waitForElementAppear();
            ele.sendKeys(text);
        } catch (err) {
            throw err;
        }
    }

    public async waitForElementAppear(timeoutInSecond: number = TIME_OUT.SHORT): Promise<void> {
        try {
            await BrowserHandler.wait(until.elementIsVisible(this._element), timeoutInSecond * 1000);
        } catch (err) {
            throw err;
        }
    }

    public async waitForElementDisappear(timeoutInSecond: number = TIME_OUT.SHORT): Promise<void> {
        try {
            await BrowserHandler.wait(until.elementIsNotVisible(this._element), timeoutInSecond * 1000);
        } catch (err) {
            throw err;
        }
    }

    public async waitForElementPresentInDOM(timeoutInSecond: number = TIME_OUT.SHORT): Promise<void> {
        try {
            await BrowserHandler.wait(until.elementLocated(this._locator), timeoutInSecond * 1000);
        } catch (err) {
            throw err;
        }
    }

    public async isElementDisplayed(): Promise<boolean> {
        try {
            const ele: WebElement = await this._mapElement();
            return await ele.isDisplayed();
        } catch (err) {
            throw err;
        }
    }

    public async isElementSelected(): Promise<boolean> {
        try {
            const ele: WebElement = await this._mapElement();
            return await ele.isSelected();
        } catch (err) {
            throw err;
        }
    }

    public async isElementEnabled(): Promise<boolean> {
        try {
            const ele: WebElement = await this._mapElement();
            return await ele.isEnabled();
        } catch (err) {
            throw err;
        }
    }
}

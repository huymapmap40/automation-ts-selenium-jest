import { By } from 'selenium-webdriver';
import Logger from '../../utils/logger/logger';
import { LEVEL } from '../../utils/logger/logger.types';
import ElementFinder from '../../web-wrapper/element-finder';

export class EnterEmailPage {
    // Locators
    private static _instance: EnterEmailPage;
    private readonly emailTxt = new ElementFinder(By.css('input[name="emailid"]'));
    private readonly submitBtn = new ElementFinder(By.css('input[name="btnLogin"]'));

    public static getInstance(): EnterEmailPage {
        if (EnterEmailPage._instance == null) {
            EnterEmailPage._instance = new EnterEmailPage();
        }
        return EnterEmailPage._instance;
    }

    public async inputEmailAddress(email: string): Promise<void> {
        Logger.notify(LEVEL.INFO, `${this.inputEmailAddress.name}`, `Input email address into textbox ${email}`);
        await this.emailTxt.type(email);
    }

    public async clickOnSubmitButton(): Promise<void> {
        Logger.notify(LEVEL.INFO, `${this.clickOnSubmitButton.name}`, `Click on submit button to process to next page`);
        await this.submitBtn.click();
    }
}

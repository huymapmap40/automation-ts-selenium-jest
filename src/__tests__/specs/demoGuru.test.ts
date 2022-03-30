import BrowserHandler from '../../web-wrapper/browser-handler';
import { EnterEmailPage } from '../pom/enterEmailPage';

describe('Test automation demo guru 99 website banking', () => {
    let emailPageInstance: EnterEmailPage;

    beforeAll(async () => {
        emailPageInstance = EnterEmailPage.getInstance();

        const urlGuruWebApp = 'https://demo.guru99.com/';
        await BrowserHandler.navigateTo(urlGuruWebApp);
        await BrowserHandler.maximizeWindowBrowser();
    });

    afterEach(async () => {
        await BrowserHandler.quitSession();
    });

    it('Test case 1', async () => {
        await emailPageInstance.inputEmailAddress('henry.nguyen@nab.com.au');
        await BrowserHandler.sleepInSecond(3);
        await emailPageInstance.clickOnSubmitButton();
    });
});

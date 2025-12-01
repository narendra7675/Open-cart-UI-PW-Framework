import {test as base, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

type MyFixture = {
    homePage: HomePage;
}


export const test = base.extend<MyFixture>({
    homePage :async ({page, baseURL}, use, testInfo) => { //this homePage is coming from MyFixture type (line no.6)
        //the target is that this fixture should do the login automatically before my test.

        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);

        const userName = testInfo.project.metadata.appUsername;
        const userPassword = testInfo.project.metadata.appPassword;

        const homePage = await loginPage.doLogin(userName, userPassword);
        expect(await homePage.isUserLoggedIn()).toBeTruthy();

        await use(homePage); //this homePage is coming from line no.20

        
    },

    // loginPage:async ({page, baseURL}, use) => {
        
    //     const loginPage = new LoginPage(page);
    //     await loginPage.goToLoginPage(baseURL);

    //     await use(loginPage);
    // }
});



export {expect};
//Notes:
//extend method is to define your own custom fixture.
//how to create your own custom fixture? which method that you've to use in the PW? Ans: base.extend()
// testInfo is an object//type of testInfo is TestInfo defined by PW. to get the runtime information from the configuration file about the metadata.
//use is that what exactly you want to supply from the fixture to the test cases? use is called 'giver'.
//whenever you've to use the base.extend, you've to store it in a variable also.
//what exactly we did here?
//We created test as base. It means we're creating duplicate of test, that is called base. from the base, we've used extend method and then we've created our own fixture. And it's returning one homePage reference. And this entire fixture is defined by the test. We've actually overridden the whole test which is coming from the playwright.


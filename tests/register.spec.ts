import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from 'pages/RegisterPage';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

//schema/type of reg data fields
type RegData = {
  firstName: string;
  lastName: string;
  telephone: string;
  password: string;
  subscribeNewsletter: string;
};

//read register.csv file content
let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
let registrationData: RegData[] = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

//generate random emailId
function getRadomEmailId(): string {
  let randomValue: string = Math.random().toString(36).substring(2, 9);
  return `auto${randomValue}@yopmail.com`;
}

for (let user of registrationData) {
  test(`verify user is able to register ${user.firstName} @p0 @regression`, async ({
    page,
    baseURL,
  }) => {
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    let registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
    let isUserRegistered = await registerPage.registerUser(
      user.firstName,
      user.lastName,
      getRadomEmailId(),
      user.telephone,
      user.password,
      user.subscribeNewsletter
    );
    expect(isUserRegistered).toBeTruthy();
  });
}

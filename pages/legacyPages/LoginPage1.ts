import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../../utils/ElementUtil';
import {HomePage} from './HomePage1';

export class LoginPage {
  //1. page locators/objects/object repositories (OR):
  //readonly keyword -> to make the variable final
  private readonly page: Page;
  private readonly eleUtil;
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly warningMsg: Locator;

  //2. page class constructor: [to initialize POV]
  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.emailId = page.getByRole('textbox', {name: 'E-Mail Address'});
    this.password = page.getByRole('textbox', {name: 'Password'});
    this.loginBtn = page.locator(`input[type="submit"][value="Login"]`);
    this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
    //a. In the constructor we'll never write a business logic. Constructor is used to, just to initialize the value once the object is created.
    //b. Once we create the object, we just need to supply the page from the test.
    //c. Who will give page to the test? Test runner. And test will create the object of this class and give the page to constructor page and locators are already defined.
  }

  //3. page actions/methods:or behavior of the methods or behavior of the page that we need to define.
  /**
   * Navigate to the login page
   */
  async goToLoginPage() {
    await this.page.goto(
      'https://naveenautomationlabs.com/opencart/index.php?route=account/login'
    );
  }

  /**
   * login to app using user email & password.
   * @param email
   * @param password
   * @returns
   */
  async doLogin(email: string, password: string): Promise<HomePage> {
    await this.eleUtil.fill(this.emailId, email);
    await this.eleUtil.fill(this.password, password);
    await this.eleUtil.click(this.loginBtn, 0, {timeout: 5000});
    return new HomePage(this.page); //every page class constructor is waiting for the page over here.
  }

  /**
   * get the warning message in case of invalid login
   * @returns
   */
  async getInvalidLoginMessage(): Promise<string | null> {
    const errorMessage = await this.eleUtil.getTextContent(this.warningMsg);
    console.log(`invalid login warning message: ${errorMessage}`);
    return errorMessage;
  }
}

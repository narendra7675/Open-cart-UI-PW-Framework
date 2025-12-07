import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../../utils/ElementUtil';
import {LoginPage} from './LoginPage1';
import {ResultsPage} from './ResultsPage1';

export class HomePage {
  //1. page locators/objects/object repositories (OR):
  //readonly keyword -> to make the variable final
  private readonly page: Page;
  private readonly eleUtil;
  private readonly loginLink: Locator;
  private readonly logoutLink: Locator;
  private readonly search: Locator;
  private readonly searchIcon: Locator;

  //2. page class constructor: [to initialize POV]
  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.loginLink = page.getByRole('link', {name: 'Login'});
    this.logoutLink = page.getByRole('link', {name: 'Logout'});
    this.search = page.getByRole('textbox', {name: 'Search'});
    this.searchIcon = page.locator(
      `#search > span.input-group-btn > button.btn`
    );
  }

  //3. Page actions:
  async isUserLoggedIn(): Promise<boolean> {
    return await this.eleUtil.isVisible(this.logoutLink, 0);
  }

  async logout(): Promise<LoginPage> {
    await this.eleUtil.click(this.logoutLink, 0, {timeout: 5000});
    await this.eleUtil.click(this.loginLink, 0, {timeout: 5000});
    return new LoginPage(this.page);
  }

  async doSearch(searchKey: string) {
    console.log(`search key${searchKey}`);
    await this.eleUtil.fill(this.search, searchKey);
    await this.eleUtil.click(this.searchIcon);
    return new ResultsPage(this.page); //for every page, constructor says, please give me the page.
  }
}

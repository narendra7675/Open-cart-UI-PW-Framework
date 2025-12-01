import {Locator, Page} from "@playwright/test";
import {ElementUtil} from "../../utils/ElementUtil";
import {ProductInfoPage} from "./ProductInfoPage1";

export class ResultsPage {
  //1. page locators/objects/object repositories (OR):
  //readonly keyword -> to make the variable final
  private readonly page: Page;
  private readonly eleUtil;
  private readonly results: Locator;

  //2. page class constructor: [to initialize POV]
  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.results = page.locator(".product-thumb"); //this is giving me count of products visible on the page.
  }

  //3. Page actions:
  async getSearchResultsCount(): Promise<number> {
    return await this.results.count();
    //Whenever the test method call the getSearchResultsCount method, this will give the exact count and then assert.
    //We should not write assertion here. This page class responsibility is not to write the assertion.
  }

  async selectProduct(productName: string) {
    console.log(`product name: ${productName}`);
    await this.eleUtil.click(
      this.page.getByRole("link", {name: `${productName}`})
    );
    return new ProductInfoPage(this.page);
  }
}

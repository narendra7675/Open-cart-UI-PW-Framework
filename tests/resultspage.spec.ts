// import {test, expect} from "@playwright/test";
// import {LoginPage} from "../pages/LoginPage";
// import {HomePage} from "pages/HomePage";
import {ResultsPage} from "pages/ResultsPage";
import {test, expect} from "../fixtures/baseFixture";

//data provider for the product seach key and results count
let searchData = [
  {searchKey: "macbook", resultsCount: 3},
  {searchKey: "samsung", resultsCount: 2},
  {searchKey: "imac", resultsCount: 1},
  {searchKey: "canon", resultsCount: 1},
  {searchKey: "dummy", resultsCount: 0},
];

//In the test class, I'll never use any page class methods.

for (let product of searchData) {
  test(`verify product search results ${product.searchKey} @regression`, async ({
    homePage,
  }) => {
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchKey);
    expect(await resultsPage.getSearchResultsCount()).toBe(
      product.resultsCount
    );
  });
}

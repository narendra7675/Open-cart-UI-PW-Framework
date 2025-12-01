//import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
//import {HomePage} from "pages/HomePage";
import {test, expect} from "../fixtures/baseFixture";

//In the test class, I'll never use any page class methods.
//page, browser, context, request --> these are the in-build playwright fixtures. can use these in destructuring form.
test(
  "verify valid login",

  {
    tag: ["@login"],
    annotation: [
      {
        type: "epic",
        description: "EPIC 100 - Design login page for Open card App",
      },
      {type: "feature", description: "Login Page Feature"},
      {type: "story", description: "US 50 - user can login to app"},
      {type: "severity", description: "blocker"},
      {type: "owner", description: "narendra"},
    ],
  },
  async ({homePage}) => {
    await expect(homePage.page).toHaveTitle("My Account");
  }
);

test.skip("verify invalid login", async ({page, baseURL}) => {
  //AAA = Arrange -> Action -> Assert
  let loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(baseURL);

  await loginPage.doLogin("pwtest1@nal.com", "test123");
  const errormsg = await loginPage.getInvalidLoginMessage();
  expect(errormsg).toContain(
    "  Warning: No match for E-Mail Address and/or Password."
  );
});

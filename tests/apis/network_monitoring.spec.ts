import {test, expect} from "@playwright/test";

test("Network monitoring test", async ({page}) => {
  page.on("request", async (req) => {
    console.log("Outgoing request: ", req.method(), req.url());
  });

  page.on("response", async (res) => {
    console.log("Incoming response: ", res.status(), res.url());
  });

  page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
  );
});

import {test, expect} from "@playwright/test";

test("basic auth test", async ({request}) => {
  const username = "admin";
  const password = "admin";

  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  const response = await request.get(
    "https://the-internet.herokuapp.com/basic_auth",
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  expect(response.status()).toBe(200);
  const body = await response.text();
  console.log(body);
  expect(body).toContain(
    "Congratulations! You must have the proper credentials."
  );
  expect(
    body.includes("Congratulations! You must have the proper credentials.")
  ).toBe(true);
  expect(body).toMatch(
    /Congratulations!\s*You must have the proper credentials\./
  );
});

test("basic auth test with credentials", async ({request}) => {
  const response = await request.get(
    "https://the-internet.herokuapp.com/basic_auth"
  );

  expect(response.status()).toBe(200);
  const body = await response.text();
  console.log(body);
});

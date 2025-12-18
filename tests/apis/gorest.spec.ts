import {test, expect, APIResponse} from "@playwright/test";

const TOKEN =
  "38cb91cd1d79e6f786e48767a2893bd9bc9ca8f818405f12169caaff9457eac6";

test("GET - fetch all users", async ({request}) => {
  const response: APIResponse = await request.get(
    "https://gorest.co.in/public/v2/users",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

test("GET - fetch a single user", async ({request}) => {
  const response: APIResponse = await request.get(
    "https://gorest.co.in/public/v2/users/7664177",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

test("POST - create a user", async ({request}) => {
  const requestBody = {
    name: "Kumar Rana",
    email: `kumar_rana${Date.now()}@yopmail.com`,
    gender: "male",
    status: "active",
  };

  const response: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users/",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: requestBody,
    }
  );

  expect(response.status()).toBe(201);
  const data = await response.json();
  console.log(data);
});

import {test, expect, APIResponse} from "@playwright/test";

const TOKEN =
  "38cb91cd1d79e6f786e48767a2893bd9bc9ca8f818405f12169caaff9457eac6";
const BASE_URL = "https://gorest.co.in/public/v2/users";

//common headers:
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "content-Type": "application/json",
  Accept: "application/json",
};

test("GET - fetch all users", async ({request}) => {
  const response: APIResponse = await request.get(BASE_URL, {
    headers,
  });

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

  const response: APIResponse = await request.post(BASE_URL, {
    headers,
    data: requestBody,
  });

  expect(response.status()).toBe(201);
  const data = await response.json();
  console.log(data);
});

test("PUT - update a user", async ({request}) => {
  const userId = 8300092;

  const requestBody = {
    status: "inactive",
  };

  const response: APIResponse = await request.put(BASE_URL + "/" + userId, {
    headers,
    data: requestBody,
  });

  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

test("DELETE - delete a user", async ({request}) => {
  const userId = 8300092;

  const response: APIResponse = await request.delete(`${BASE_URL}/${userId}`, {
    headers,
  });

  expect(response.status()).toBe(204);
});

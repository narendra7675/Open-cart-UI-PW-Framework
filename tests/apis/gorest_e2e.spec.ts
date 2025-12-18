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

test("e2e crud flow test", async ({request}) => {
  console.log("======== POST CALL ========");

  //step1: Create a user
  const requestBody = {
    name: "Kumar Rana",
    email: `kumar_rana${Date.now()}@yopmail.com`,
    gender: "male",
    status: "active",
  };
  const responsePOST: APIResponse = await request.post(BASE_URL, {
    headers,
    data: requestBody,
  });

  expect(responsePOST.status()).toBe(201);
  const createdUser = await responsePOST.json();
  console.log(createdUser);
  const userId = createdUser.id;
  console.log("Created user ID:" + userId);
  console.log("Created user successfully");

  console.log("======== GET CALL ========");
  //step2: Get the same user by using user id
  const responseGET: APIResponse = await request.get(BASE_URL + "/" + userId, {
    headers,
  });

  expect(responseGET.status()).toBe(200);
  const fetchedUser = await responseGET.json();
  const fetchedUserId = fetchedUser.id;
  expect(fetchedUserId).toBe(userId);
  console.log(fetchedUser);
  console.log("Successfully retrieved user details");

  console.log("======== UPDATE CALL ========");
  //step3: Update the same user by using user id = userId
  const updateBody = {
    name: "Playwright Use",
    status: "inactive",
  };

  const responsePUT: APIResponse = await request.put(BASE_URL + "/" + userId, {
    headers,
    data: updateBody,
  });

  expect(responsePUT.status()).toBe(200);
  const updatedData = await responsePUT.json();
  console.log(updatedData);
  console.log("User is updated successfully");

  console.log("======== DELETE CALL ========");

  //step4: Delete the user by using user id = userId
  const responseDELETE: APIResponse = await request.delete(
    `${BASE_URL}/${userId}`,
    {
      headers,
    }
  );
  expect(responseDELETE.status()).toBe(204);
  console.log("User is deleted successfully");

  //step5: Get the same user by using user id = userId after delete the user

  const responseGETAfterDelete: APIResponse = await request.get(
    BASE_URL + "/" + userId,
    {
      headers,
    }
  );

  expect(responseGETAfterDelete.status()).toBe(404);
  const responseBody = await responseGETAfterDelete.json();
  const message = responseBody.message;
  expect(message).toBe("Resource not found");
  console.log(responseBody);
});

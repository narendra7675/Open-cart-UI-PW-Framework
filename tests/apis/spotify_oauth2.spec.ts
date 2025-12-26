import {test, expect} from "@playwright/test";
import {request} from "http";

const CLIENT_ID = "0eed69e460e942c29396226b640be50c";
const CLIENT_SECRET = "5e37378e49b048a5b5b729f02d914911";

let accessToken: string;

test.beforeEach(async ({request}) => {
  const response = await request.post(
    "https://accounts.spotify.com/api/token",
    {
      headers: {
        "content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
    }
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  accessToken = responseBody.access_token;
  console.log("Token: " + accessToken);
});

test("get album", async ({request}) => {
  const response = await request.get(
    "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  expect(response.status()).toBe(200);
  const data = response.json();
  console.log(JSON.stringify(data, null, 2));
});

test("get tracks", async ({request}) => {
  const response = await request.get(
    "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  expect(response.status()).toBe(200);
  const data = response.json();
  console.log(JSON.stringify(data, null, 2));
});

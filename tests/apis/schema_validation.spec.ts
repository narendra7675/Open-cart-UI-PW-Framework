import {test, expect, APIResponse} from "@playwright/test";
import Ajv from "ajv";
import fs from "fs";
import path from "path";

const TOKEN =
  "38cb91cd1d79e6f786e48767a2893bd9bc9ca8f818405f12169caaff9457eac6";

//setup ajv:
//how to setup? We need to create the object of Ajv class
const ajv = new Ajv();

//load the schema files:
const getUsersSchema = JSON.parse(
  fs.readFileSync("./schemas/getusersschema.json", "utf-8")
);
//OR
//JSON.parse(fs.readFileSync(path.resolve('./schemas/getusersschema.json'), 'utf-8'));
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
  //console.log(data);

  //validate the json schema:
  const validate = ajv.compile(getUsersSchema);
  //use validate as a function and validate the data.
  const isValid = validate(data);
  //Notes:
  //1. We're compiling the getUserSchema taken from the getusersschema.json.
  //2. Store it in a validate variable as a function parameter
  //3. The same function parameter, we're validating the data
  if (!isValid) {
    console.log("schema errors:", validate.errors);
  }
  //if it is not valid, then print all schema errors by using the errors property

  expect(isValid).toBe(true);
  console.log("API response schema is validated -- Test is passed");
});

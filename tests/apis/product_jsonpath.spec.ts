import {test, expect} from "@playwright/test";
import {JSONPath} from "jsonpath-plus";

const BASE_URL = "https://fakestoreapi.com/products";
const headers = {
  Accept: "application/json",
  "content-Type": "application/json",
};

test("GET - all the product test", async ({request}) => {
  const response = await request.get(BASE_URL, {headers});
  const data = await response.json();
  console.log(data);

  console.log("===== get all titles =====");
  //get all titles:
  const title: string[] = JSONPath({path: "$[*].title", json: data});
  console.log(title);

  console.log("===== get all ids =====");
  //get all ids:
  const ids: number[] = JSONPath({path: "$[*].id", json: data});
  console.log(ids);

  console.log("===== get all rates =====");
  const rates = JSONPath({path: "$[*].rating.rate", json: data});
  console.log(rates);

  //get all the products title where category == 'jewelery'
  const jewTitles = JSONPath({
    path: `$[?(@.category=='jewelery')].title`,
    json: data,
  });
  console.log(jewTitles);
});

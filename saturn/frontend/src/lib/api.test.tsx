/**
These tests intentionally hit the API for now.
Later on, ee tests will have their on place
*/
import STNApiClient from "./api";

const api = new STNApiClient("http://localhost:8000/saturn/api/");

test("Can create an API interface", function () {
  expect(api).toBeTruthy();
});

test("Can access base url", function () {
  expect(api.baseUrl).toBeTruthy();
});

test("Can GET call the API", async function () {
  const response = await api.get("registered/");
  expect(response).toBeTruthy();
});

test("Can change registered API path", function () {
  expect(api.registeredUrl).toBeTruthy();
});

test("Retrieve registered from SDK", async function () {
  const response = await api.getRegistered();
  expect(response).toBeTruthy();
});

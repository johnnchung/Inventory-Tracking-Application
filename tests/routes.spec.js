// we will use supertest to test HTTP requests/responses
const { ObjectId } = require("mongodb");
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../server");

const mockInventory = {
  name: "John",
  items: "Chung",
  deleted: false,
  deleteComments: "",
  itemBool: false,
  isOpen: false
}

describe("GET / ", () => {
  test("It should return 200 status code for / API endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
  });
});

/**
 * Routes that redirect to / should expect to return 302 status code
 */

describe("POST requests", () => {
  test("It should return 302 status code for create API endpoint", async () => {
    const response = await request(app)
      .post("/inventoryCollection/create")
      .send(mockInventory);
      expect(response.statusCode).toEqual(302);
  });
  test("It should return 302 status code for submit update API endpoint", async () => {
    const response = await request(app)
      .post("/inventoryCollection/submitUpdate/" + ObjectId("6281f2727ef96ea22e1b20e0"))
      .send(mockInventory);
      expect(response.statusCode).toEqual(302);
  });
  test("It should return 302 status code for edit API endpoint", async () => {
    const response = await request(app)
      .post("/inventoryCollection/edit/" + ObjectId("6281f83281430a8db0359486"))
      .send(mockInventory);
      expect(response.statusCode).toEqual(302);
  });
  test("It should return 302 status code for cancel API endpoint", async () => {
    const response = await request(app)
      .post("/inventoryCollection/cancel/" + ObjectId("6281f89325fd0b3240e7418a"))
      .send(mockInventory);
      expect(response.statusCode).toEqual(302);
  });
  test("It should return 302 status code for delete API endpoint", async () => {
    const response = await request(app)
      .post("/inventoryCollection/deleteUpdate/" + ObjectId("6281f8cbdab387aecbc708f1"))
      .send(mockInventory);
      expect(response.statusCode).toEqual(302);
  });
});

describe("PATCH request", () => {
  test("It should return 302 status code for undo API endpoint", async () => {
    const response = await request(app)
      .patch("/inventoryCollection/undo/" + ObjectId("628202a2fd11cf112cbecfc3"))
      .send(mockInventory);
      expect(response.statusCode).toEqual(200);
  });
  test("It should return 302 status code for comment API endpoint", async () => {
    const response = await request(app)
      .patch("/inventoryCollection/comment/" + ObjectId("628203207c91747efce5fa5b"))
      .send(mockInventory);
      expect(response.statusCode).toEqual(302);
  });
})

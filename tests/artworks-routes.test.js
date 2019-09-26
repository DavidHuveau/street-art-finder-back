const request = require("supertest");
// const app = require("../server"); // our Node application

describe("Get Endpoints", () => {

  it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
  })

  // it("should get all", async () => {
  //   const httpRequest = await request(app).get("/api/v1/artworks/");
  //   httpRequest.set('Accept', 'application/json')
  //   httpRequest.set('Origin', 'http://localhost:8080')

  //   expect(httpRequest.statusCode).toEqual(200);
  //   // expect(res.body).toHaveProperty("post");
  // });

});

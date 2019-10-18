const supertest = require("supertest");
const routes = require("../routes/routes"); // our Node application
const request = supertest(routes);
const database = require("../models/Database");

describe("Artworks endpoints", () => {
  beforeAll(async done => {
    await database.connect();
    await database.mongoose.connection.collections['artworks'].drop();
    done();
  });

  afterAll(async done => {
    await database.disconnect(done);
  });

  it("should see if Jest works", async done => {
    expect(1).toBe(1);
    done();
  });

  it("should get 0 artworks", async done => {
    const response = await request.get("/api/v1/artworks/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("artworks");
    expect(response.body.artworks.length).toBe(0);
    done();
  });

  it("should post a proposal that will fail", async done => {
    const response = await request
      .post("/api/v1/artworks/")
      .field("userName", "userName")
      .field("adressStreet", "adressStreet")
      .field("zipCode", "zipCode")
      .field("city", "city")
      .field("description", "description")
      .field("country", "country")
      .field("countryCode", "countryCode");
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ message: "Please provide an image" });
    done();
  });

  it("should post a proposal", async done => {
    let response = await request
      .post("/api/v1/artworks/")
      .field("userName", "Lisa")
      .field("adressStreet", "26 bis boulevard Pasteur")
      .field("zipCode", "51100")
      .field("city", "Reims")
      .field("description", "description")
      .field("country", "5d891e1f6a7d8d996733f26c")
      .field("countryCode", "FR")
      .attach('myFile', 'tests/mock-data/20170813_181727.jpg');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("artworks");
    expect(response.body.artworks.length).toBe(1);
    expect(response.body.artworks[0]).toHaveProperty("_id");
    expect(response.body.artworks[0]).toHaveProperty("city");

    response = await request.get("/api/v1/artworks/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("artworks");
    expect(response.body.artworks.length).toBe(1);
    done();
  });

});

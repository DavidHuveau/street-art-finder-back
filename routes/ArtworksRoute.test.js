const supertest = require("supertest");
const app = require("../app"); // our Node application
const request = supertest(app);

describe("Artworks endpoints", () => {
  it("should see if Jest works", async done => {
    expect(1).toBe(1);
    done();
  });

  it("should get all artworks", async done => {
    const response = await request
      .get("/api/v1/artworks/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("artworks");
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
    expect(response.body).toMatchObject({message: 'Please provide an image'})
    done();
  });

  it("should post a proposal", async () => {
    const response = await request
      .post("/api/v1/artworks/")
      .field("userName", "Lisa")
      .field("adressStreet", "26 bis boulevard Pasteur")
      .field("zipCode", "51100")
      .field("city", "Reims")
      .field("description", "description")
      .field("country", "5d891e1f6a7d8d996733f26c")
      .field("countryCode", "FR")
      .attach('myFile', 'samples/artworks/6caf2a4566ae219333e95053069c0eb4.png');
    console.log(response);
    expect(response.status).toBe(201);
    // expect(response.body).toMatchObject({message: 'Please provide an image'})
  });
});

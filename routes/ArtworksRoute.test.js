const request = require("supertest");
const app = require("../app"); // our Node application
const FormData = require('form-data');

describe("Artworks endpoints", () => {
  it("should see if Jest works", async done => {
    expect(1).toBe(1);
    done();
  });

  xit("should get all artworks", async done => {
    const response = await request(app)
      .get("/api/v1/artworks/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("artworks");
    done();
  });

  xit("should post a proposal that will fail", async done => {
    const formData = new FormData();
    formData.append("userName", "userName");
    formData.append("adressStreet", "adressStreet");
    formData.append("zipCode", "zipCode");
    formData.append("city", "city");
    formData.append("description", "description");
    formData.append("country", "country");
    formData.append("countryCode", "countryCode");

    // form.append('my_logo', request('http://nodejs.org/images/logo.png'));

    const response = await request(app)
      .post("/api/v1/artworks/")
      .send({
        formData
      });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({message: 'Please provide an image'})
    done();
  });

  xit("should post a proposal", async () => {
    const formData = new FormData();
    formData.append("userName", "userName");
    formData.append("adressStreet", "adressStreet");
    formData.append("zipCode", "zipCode");
    formData.append("city", "city");
    formData.append("description", "description");
    formData.append("country", "country");
    formData.append("countryCode", "countryCode");
    // formData.append('my_logo', request('http://nodejs.org/images/logo.png'));

    const response = await request(app)
      .post("/api/v1/artworks/")
      .send({
        formData
      });
    console.log(response);
    expect(response.status).toBe(201);
    // expect(response.body).toMatchObject({message: 'Please provide an image'})
  });
});

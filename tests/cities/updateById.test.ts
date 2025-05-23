import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - updateById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "updatebyidcity@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Try a request without access token", async () => {
    const res = await testServer.put("/cities/1").send({ name: "Catalunia" });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res.body).toHaveProperty("errors.default")
  });

  it("Update a city", async () => {
    const createResponse = await testServer
      .post("/cities")
      .set({authorization: `Bearer ${accessToken}`})
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer
      .put(`/cities/${createResponse.body}`)
      .set({authorization: `Bearer ${accessToken}`})
      .send({ name: "Contagem" });

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Try to update a unexistent city", async () => {
    const res = await testServer
      .put("/cities/99999")
      .set({authorization: `Bearer ${accessToken}`})
      .send({ name: "Contagem" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

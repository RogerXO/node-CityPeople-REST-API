import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - getById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "getbyidcity@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Try a request without access token", async () => {
    const res = await testServer.get("/cities/1").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Search city by id", async () => {
    const createResponse = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer
      .get(`/cities/${createResponse.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body).toHaveProperty("id");
    expect(searchResponse.body).toHaveProperty("name");
  });

  it("Try to search a unexistent city", async () => {
    const res = await testServer
      .get("/cities/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

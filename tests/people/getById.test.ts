import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - getById", () => {
  let accessToken = "";
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    // Get access token
    const email = "getbyidperson@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;

    // Get City Id
    const cityRes = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "teste" });
    cityId = cityRes.body;
  });

  it("Try a request without access token", async () => {
    const res = await testServer.get("/people/1").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Search person by id", async () => {
    const createResponse = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "Tolentino Neves",
        email: "teste@email.com",
      });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer
      .get(`/people/${createResponse.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body).toHaveProperty("id");
    expect(searchResponse.body).toHaveProperty("fullName");
  });

  it("Try to search a unexistent person", async () => {
    const res = await testServer
      .get("/people/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

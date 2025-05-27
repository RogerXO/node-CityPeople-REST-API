import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - getAll", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "getallcity@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Try a request without access token", async () => {
    const res = await testServer.get("/cities").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Search all registers", async () => {
    const createResponse = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer
      .get("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(searchResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body.length).toBeGreaterThan(0);
  });
});

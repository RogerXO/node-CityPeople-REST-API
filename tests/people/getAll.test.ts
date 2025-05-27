import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - getAll", () => {
  let accessToken = "";
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    // Get access token
    const email = "getallpeople@gmail.com";
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
    const res = await testServer.get("/people").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Search all people", async () => {
    const createResponse = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "searchall@email.com",
        fullName: "Search all",
      });

    expect(typeof cityId).toEqual("number");
    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer
      .get("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(searchResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body.length).toBeGreaterThan(0);
  });
});

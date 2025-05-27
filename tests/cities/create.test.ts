import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "createcity@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Try a request without access token", async () => {
    const res = await testServer.post("/cities").send({ name: "Catalunia" });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Create a register", async () => {
    const res = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "Belo Horizonte" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Try create a city with too short name", async () => {
    const res = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "Be" });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
});

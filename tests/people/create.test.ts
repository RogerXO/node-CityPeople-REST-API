import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - create", () => {
  let accessToken = "";
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    // Get access token
    const email = "createperson@gmail.com";
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
    const res = await testServer.post("/people").send({
      fullName: "Senhor Bunda Cagada",
      email: "senhorbundacagada@gmail.com",
      cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Create a person", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "create@gmail.com",
        fullName: "Create da Silva",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Create the person 2", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "create2@gmail.com",
        fullName: "Create da Silva",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Try to create a person with duplicated email", async () => {
    const res0 = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "createduplicated@gmail.com",
        fullName: "Create da Silva",
      });

    expect(res0.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res0.body).toEqual("number");

    const res1 = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "createduplicated@gmail.com",
        fullName: "Duplicated",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Try to create a person with too short name", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "deleteAll@gmail.com",
        fullName: "A",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.fullName");
  });

  it("Try to create a person without email", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        fullName: "A",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Try to create a person with invalid email", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "deleteAll gmail.com",
        fullName: "Invalid Email da Silva",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Try to create a person without cityId", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        email: "nocityId@gmail.com",
        fullName: "No CityId da Fonseca",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
  });

  it("Try to create a person with invalid cityId", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId: "invalid",
        email: "deleteAll@gmail.com",
        fullName: "Delete All da Silva",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
  });

  it("Try to create a person without passing properties", async () => {
    const res = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
    expect(res.body).toHaveProperty("errors.body.fullName");
    expect(res.body).toHaveProperty("errors.body.email");
  });
});

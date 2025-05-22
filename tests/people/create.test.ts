import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - create", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const cityRes = await testServer.post("/cities").send({ name: "teste" });

    cityId = cityRes.body;
  });

  it("Create a person", async () => {
    const res = await testServer.post("/people").send({
      cityId,
      email: "create@gmail.com",
      fullName: "Create da Silva",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Create the person 2", async () => {
    const res = await testServer.post("/people").send({
      cityId,
      email: "create2@gmail.com",
      fullName: "Create da Silva",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Try to create a person with duplicated email", async () => {
    const res0 = await testServer.post("/people").send({
      cityId,
      email: "createduplicated@gmail.com",
      fullName: "Create da Silva"
    });

    expect(res0.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res0.body).toEqual("number");

    const res1 = await testServer.post("/people").send({
      cityId,
      email: "createduplicated@gmail.com",
      fullName: "Duplicated"
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Try to create a person with too short name", async () => {
    const res = await testServer.post("/people").send({
      cityId,
      email: "deleteAll@gmail.com",
      fullName: "A",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.fullName");
  });

  it("Try to create a person without email", async () => {
    const res = await testServer.post("/people").send({
      cityId,
      fullName: "A",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Try to create a person with invalid email", async () => {
    const res = await testServer.post("/people").send({
      cityId,
      email: "deleteAll gmail.com",
      fullName: "Invalid Email da Silva",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Try to create a person without cityId", async () => {
    const res = await testServer.post("/people").send({
      email: "nocityId@gmail.com",
      fullName: "No CityId da Fonseca",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
  });

  it("Try to create a person with invalid cityId", async () => {
    const res = await testServer.post("/people").send({
      cityId: "invalid",
      email: "deleteAll@gmail.com",
      fullName: "Delete All da Silva",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
  });

  it("Try to create a person without passing properties", async () => {
    const res = await testServer.post("/people").send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
    expect(res.body).toHaveProperty("errors.body.fullName");
    expect(res.body).toHaveProperty("errors.body.email");
  });
});

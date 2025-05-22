import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - SignUp", () => {
  it("Create a user", async () => {
    const res = await testServer.post("/signup").send({
      name: "Signup da Silva",
      email: "create@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Create the user 2", async () => {
    const res = await testServer.post("/signup").send({
      name: "Jose Aldo",
      email: "signup@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Try to create a user with duplicated email", async () => {
    const res0 = await testServer.post("/signup").send({
      name: "Signup da Silva",
      email: "duplicated@gmail.com",
      password: "123456",
    });

    expect(res0.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res0.body).toEqual("number");

    const res1 = await testServer.post("/signup").send({
      name: "Cadastrar da Silva Peres",
      email: "duplicated@gmail.com",
      password: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Try to create a user without email", async () => {
    const res = await testServer.post("/signup").send({
      name: "Signup da Silva",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Try to create a user without name", async () => {
    const res = await testServer.post("/signup").send({
      email: "create@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });

  it("Try to create a user without password", async () => {
    const res = await testServer.post("/signup").send({
      name: "Signup da Silva",
      email: "create@gmail.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Try to create a user with invalid email", async () => {
    const res = await testServer.post("/signup").send({
      name: "Signup da Silva",
      email: "create gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Try to create a user with too short password", async () => {
    const res = await testServer.post("/signup").send({
      name: "Signup da Silva",
      email: "cirilocarrossel@gmail.com",
      password: "123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Try to create a user with too short name", async () => {
    const res = await testServer.post("/signup").send({
      name: "S",
      email: "testando1@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });

  it("Try to create a user without passing properties", async () => {
    const res = await testServer.post("/signup").send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
    expect(res.body).toHaveProperty("errors.body.email");
    expect(res.body).toHaveProperty("errors.body.password");
  });
});

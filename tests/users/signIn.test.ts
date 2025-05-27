import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - SignIn", () => {
  beforeAll(async () => {
    await testServer.post("/signup").send({
      name: "Jorge da Silva",
      email: "jorgesilva@gmail.com",
      password: "123456",
    });
  });

  it("Try to sign in", async () => {
    const res = await testServer.post("/signin").send({
      email: "jorgesilva@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("Wrong password", async () => {
    const res = await testServer.post("/signin").send({
      email: "jorgesilva@gmail.com",
      password: "1234567",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Wrong email", async () => {
    const res = await testServer.post("/signin").send({
      email: "jorgesilva1@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Invalid email", async () => {
    const res = await testServer.post("/signin").send({
      email: "jorgesilva gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("Too short password", async () => {
    const res = await testServer.post("/signin").send({
      email: "jorgesilva@gmail.com",
      password: "123",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Password not passed", async () => {
    const res = await testServer.post("/signin").send({
      email: "jorgesilva@gmail.com",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });

  it("Email not passed", async () => {
    const res = await testServer.post("/signin").send({
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
});

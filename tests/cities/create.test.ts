import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - create", () => {
  it("Create a register", async () => {
    const res = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Try create a city with too short name", async () => {
    const res = await testServer.post("/cities").send({name: "Be"})

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res.body).toHaveProperty("errors.body.name")
  })
});

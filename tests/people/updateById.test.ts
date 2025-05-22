import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - updateById", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const cityRes = await testServer.post("/cities").send({ name: "teste" });

    cityId = cityRes.body;
  });

  it("Update a person", async () => {
    const createResponse = await testServer.post("/people").send({
      cityId,
      email: "updateAll@gmail.com",
      fullName: "Update All da Silva",
    });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer
      .put(`/people/${createResponse.body}`)
      .send({
        cityId,
        email: "update@gmail.com",
        fullName: "Update Silva",
      });

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Try to update a unexistent person", async () => {
    const res = await testServer.put("/people/99999").send({
      cityId,
      email: "updateAll@email.com",
      fullName: "Update All da Fonseca",
    });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

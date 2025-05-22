import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - DeleteById", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const cityRes = await testServer.post("/cities").send({ name: "teste" });

    cityId = cityRes.body;
  });

  it("Delete person", async () => {
    const createResponse = await testServer.post("/people").send({
      cityId,
      email: "deleteAll@gmail.com",
      fullName: "Delete All da Silva",
    });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deleteResponse = await testServer
      .delete(`/people/${createResponse.body}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Delete unexistent person", async () => {
    const res = await testServer.delete("/people/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

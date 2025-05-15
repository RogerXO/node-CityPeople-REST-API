import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - updateById", () => {
  it("Update a city", async () => {
    const createResponse = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer
      .put(`/cities/${createResponse.body}`)
      .send({ name: "Contagem" });

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Try to update a unexistent city", async () => {
    const res = await testServer
      .put("/cities/99999")
      .send({ name: "Contagem" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

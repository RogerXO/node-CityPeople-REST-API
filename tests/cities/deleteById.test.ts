import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - DeleteById", () => {
  it("Delete city", async () => {
    const createResponse = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deleteResponse = await testServer
      .delete(`/cities/${createResponse.body}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Delete unexistent city", async () => {
    const res = await testServer.delete("/cities/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

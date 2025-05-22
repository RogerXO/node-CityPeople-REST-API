import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - getById", () => {
  it("Search city by id", async () => {
    const createResponse = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer
      .get(`/cities/${createResponse.body}`)
      .send();

    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body).toHaveProperty("id");
    expect(searchResponse.body).toHaveProperty("name");
  });

  it("Try to search a unexistent city", async () => {
    const res = await testServer.get("/cities/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

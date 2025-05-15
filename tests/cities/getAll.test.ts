import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - getAll", () => {
  it("Search all registers", async () => {
    const createResponse = await testServer
      .post("/cities")
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);
    
    const searchResponse = await testServer.get("/cities").send()

    expect(Number(searchResponse.header['x-total-count'])).toBeGreaterThan(0)
    expect(searchResponse.statusCode).toEqual(StatusCodes.OK)
    expect(searchResponse.body.length).toBeGreaterThan(0)
  });
});

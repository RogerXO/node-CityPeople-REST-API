import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - getAll", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const resCity = await testServer.post("/cities").send({
      name: "teste",
    });

    cityId = resCity.body;
  });

  it("Search all people", async () => {
    const createResponse = await testServer.post("/people").send({
      cityId,
      email: "searchall@email.com",
      fullName: "Search all",
    });

    expect(typeof cityId).toEqual("number");
    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer.get("/people").send();

    expect(Number(searchResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body.length).toBeGreaterThan(0);
  });
});

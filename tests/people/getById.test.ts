import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - getById", () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const cityRes = await testServer.post("/cities").send({ name: "Teste" });

    cityId = cityRes.body;
  });

  it("Search person by id", async () => {
    const createResponse = await testServer.post("/people").send({
      cityId,
      fullName: "Tolentino Neves",
      email: "teste@email.com",
    });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const searchResponse = await testServer
      .get(`/people/${createResponse.body}`)
      .send();

    expect(searchResponse.statusCode).toEqual(StatusCodes.OK);
    expect(searchResponse.body).toHaveProperty("id");
    expect(searchResponse.body).toHaveProperty("fullName");
  });

  it("Try to search a unexistent person", async () => {
    const res = await testServer.get("/people/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

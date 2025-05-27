import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - DeleteById", () => {
  let accessToken = "";
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    // Get access token
    const email = "deleteperson@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;

    // Get City Id
    const cityRes = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "teste" });
    cityId = cityRes.body;
  });

  it("Try a request without access token", async () => {
    const res = await testServer.delete("/people/1").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Delete person", async () => {
    const createResponse = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "deleteAll@gmail.com",
        fullName: "Delete All da Silva",
      });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deleteResponse = await testServer
      .delete(`/people/${createResponse.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Delete unexistent person", async () => {
    const res = await testServer
      .delete("/people/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

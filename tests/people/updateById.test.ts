import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - updateById", () => {
  let accessToken = "";
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    // Get access token
    const email = "updateperson@gmail.com";
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
    const res = await testServer.put("/people/1").send({
      fullName: "Senhor Bunda Cagada",
      email: "senhorbundacagada1@gmail.com",
      cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Update a person", async () => {
    const createResponse = await testServer
      .post("/people")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "updateAll@gmail.com",
        fullName: "Update All da Silva",
      });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer
      .put(`/people/${createResponse.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "update@gmail.com",
        fullName: "Update Silva",
      });

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Try to update a unexistent person", async () => {
    const res = await testServer
      .put("/people/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "updateAll@email.com",
        fullName: "Update All da Fonseca",
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

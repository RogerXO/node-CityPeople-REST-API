import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - DeleteById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "deletecity@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Roger", email, password: "123456" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Try a request without access token", async () => {
    const res = await testServer
      .delete("/cities/1")
      .send({ name: "Catalunia" });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });

  it("Delete city", async () => {
    const createResponse = await testServer
      .post("/cities")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: "Belo Horizonte" });

    expect(createResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deleteResponse = await testServer
      .delete(`/cities/${createResponse.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Delete unexistent city", async () => {
    const res = await testServer
      .delete("/cities/99999")
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});

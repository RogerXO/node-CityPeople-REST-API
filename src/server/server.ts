import express from "express";

const server = express();

//teste branch

server.get("/", (_, res: any) => {
  return res.send("Hello world");
});

export { server };

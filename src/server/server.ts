import express from "express";

const server = express();

server.get("/", (_, res: any) => {
  return res.send("Hello world");
});

export { server };

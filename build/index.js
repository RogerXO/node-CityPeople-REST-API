"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./server/database/knex");
const server_1 = require("./server/server");
const port = process.env.PORT ?? 3333;
function startServer() {
    server_1.server.listen(port, () => console.log(`App running at http://localhost:${port}`));
}
if (process.env.IS_LOCALHOST !== "true") {
    knex_1.Knex.migrate
        .latest()
        .then(() => {
        knex_1.Knex.seed
            .run()
            .then(() => startServer())
            .catch(console.log);
    })
        .catch(console.log);
}
else {
    startServer();
}

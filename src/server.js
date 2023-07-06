require("dotenv").config();
const PORT = process.env.PORT;
const http = require("http");
const app = require("./app.js");
const server = http.createServer(app);

server.listen(PORT);

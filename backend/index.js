
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db/dbconnection");
const config = require("./src/config/config");
const cors = require("cors");
const routes = require("./src/routes/v1");
const path = require("path");
const errorHandler = require("./src/helpers/error");

const app = express();

const server = http.createServer(app);


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());
app.use(express.static(path.resolve(__dirname, `./src/public`)));
app.use("/v1", routes);
app.use(
  "/public/adminImg",
  express.static(path.join(__dirname, "./src/public/adminImg"))
);

app.use(errorHandler);
connectDB();

server.listen(config.port, () => {
  console.log("server listing the port " + config.port);
});

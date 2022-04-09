require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./schemas");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
connect();

const removeHeader = (req, res, next) => {
  //x-Powerd-By 제거
  res.removeHeader("X-Powered-By");
  next();
};

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(removeHeader);

const Router = require("./routes");
app.use("/api", Router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;

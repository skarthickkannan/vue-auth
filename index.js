const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./routes/auth");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(process.env.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongodb connected");
});

app.use("/auth/v1/user", auth);

const { notFound, errorHandler } = require("./error/error");

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on port", port);
});

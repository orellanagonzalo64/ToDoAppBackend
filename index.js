const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const listsRoute = require("./routes/lists");
var cors = require('cors')

const User = require("./models/User");
const Lists = require("./models/Lists");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Holaaa");
});

app.use("/auth", authRoute);

app.use("/lists", listsRoute);

/*

6115accd3199c732e01daeef
*/


app.listen(8800, () => {
  console.log("Server running");
});

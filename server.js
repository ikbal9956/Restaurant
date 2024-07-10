const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./indexRoutes.js");

app.use("/", userRoutes);

app.listen(1000, () => {
  
  console.log("Server is listening on port 1000");
});

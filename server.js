const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const connectDatabase = require("./config/db");
app.use(cors());
app.use(express.json());
dotenv.config();  

const port = process.env.PORT || "5000";

connectDatabase();

app.use("/api/", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

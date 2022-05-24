require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./db/connectDB");
const app = express();
app.use(express.json());
app.use(cors());
const authRoute = require("./routes/auth");
app.get("/hello", (req, res) => {
  res.send("okay done");
});

app.use("/Api", authRoute);


const port = process.env.PORT || 8004;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

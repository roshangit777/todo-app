const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/taskManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

app.get("/", (req, res) => {
  res.send("Task Manager Backend is running!");
});

app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

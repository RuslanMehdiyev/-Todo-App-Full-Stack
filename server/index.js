const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const TodoRouter = require("./routers/ToDoRouter");
const { default: mongoose } = require("mongoose");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URL)
  .then((res) => console.log("Connect"))
  .catch((err) => console.log(err));

app.use("/api/todo", TodoRouter);
app.listen(8080);

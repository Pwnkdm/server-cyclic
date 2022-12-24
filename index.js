import express from "express";
import cors from "cors";
import Connection from "./Config/db.js";
import userController from "./Routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userController);

app.listen(process.env.PORT || 8080, async () => {
  await Connection;
  console.log("connected to db");
  console.log("listening on http://localhost:8080");
});

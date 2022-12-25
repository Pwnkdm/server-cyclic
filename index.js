import express from "express";
import cors from "cors";
import Connection from "./Config/db.js";
import userController from "./Routes/userRoute.js";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use("/user", userController);

app.listen(process.env.PORT || 8080, async () => {
  await Connection;
  console.log("connected to db");
  console.log("listening on http://localhost:8080");
});

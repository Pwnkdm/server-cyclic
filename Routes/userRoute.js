import { Router } from "express";
import fetch from "node-fetch";
import userModel from "../Models/user.js";

const userController = Router();

// function for fetching and storing data

async function getData() {
  const profiles = await fetch("https://randomuser.me/api?results=50");
  const data = await profiles.json();
  const resultArr = await data.results;
  //   console.log(data);

  for (let i = 0; i < resultArr.length; i++) {
    const user = new userModel({
      first: resultArr[i].name.first,
      last: resultArr[i].name.last,
      picture: resultArr[i].picture.large,
      gender: resultArr[i].gender,
      age: resultArr[i].dob.age,
      email: resultArr[i].email,
      phone: resultArr[i].phone,
      location: resultArr[i].location.street.name,
      nat: resultArr[i].nat,
    });
    user.save();
  }
}

// All the Various Routes

// 1.data posting route
userController.post("/", (req, res) => {
  getData();
  res.send({ message: "Data Added SucessFull !" });
});

//   Delete Route
userController.delete("/", async (req, res) => {
  await userModel.deleteMany();
  res.send({ message: "Profiles are deleted." });
});

//pagination
userController.get("/", async (req, res) => {
  const Limit = 10;
  const Page = parseInt(req.query.page || 0);
  const Total = await userModel.countDocuments();
  const Profiles = await userModel
    .find()
    .limit(Limit)
    .skip(Limit * Page);

  res.send({ toatalPages: Math.ceil(Total / Limit), Profiles });
});

// Filter Routes
userController.get("/search/:gender", async (req, res) => {
  let data = await userModel.find({ gender: req.params.gender });
  res.send(data);
});

export default userController;

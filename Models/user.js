import { model, Schema } from "mongoose";

const userSchema = new Schema({
  first: String,
  last: String,
  picture: String,
  gender: String,
  age: String,
  email: String,
  phone: String,
  location: String,
  nat: String,
});

const userModel = model("user", userSchema);

export default userModel;

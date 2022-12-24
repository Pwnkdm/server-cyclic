import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import * as dotenv from "dotenv";

dotenv.config();

export default mongoose.connect(process.env.MONGOURL);

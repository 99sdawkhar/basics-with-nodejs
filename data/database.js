import mongoose from "mongoose";

export const connectDb = () => {
    mongoose
  .connect(
    process.env.MONGO_URI,
    {
      dbName: "backend-api",
    }
  )
  .then(() => console.log("Backend API - Database Connected..."))
  .catch((err) => console.log("Error: ", err));
}
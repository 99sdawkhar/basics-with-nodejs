import User from "../model/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Please login first', 404))
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return next(new ErrorHandler('Current user not found', 404))
  }

  req.user = user

  next();
};

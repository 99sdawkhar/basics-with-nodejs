import ErrorHandler from "../middleware/error.js";
import { sendCookie } from "../utils/features.js";
import User from "./../model/user.js";
import bcrypt from 'bcrypt'

export const allUsers = async (req, res, next) => {
  let users = await User.find({});

  if (!users) {
    return next(new ErrorHandler('No users found.', 404))
  }

  res.status(404).json({ success: true, users });
};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler('User already exists. Please try to login', 404))
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  sendCookie(user, res, 'Register successfully', 200) // optional as on some platforms after registration we directly go to authenticated routes
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  
  let user = await User.findOne({ email }).select('+password') // explicitly add password field to get password also

  if (!user) {
    return next(new ErrorHandler('User doesn\'t exists. Please register', 404))
  }

  const isMatched = user.password && await bcrypt.compare(password, user.password)

  if (!isMatched) {
    return next(new ErrorHandler('Invalid credentails', 404))
  }

  sendCookie(user, res, 'Login successfully', 200)
};

export const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === 'dev' ? "lax" :"none",
    secure: process.env.NODE_ENV === 'dev' ? false : true,
  })
  .json({ success: true, message: 'Logout successfully' })
};

export const getMyProfile = async (req, res) => {
  res.json({ success: true, user: req.user });
};

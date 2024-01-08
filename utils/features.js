import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      sameSite: process.env.NODE_ENV === 'dev' ? "lax" :"none",
      secure: process.env.NODE_ENV === 'dev' ? false : true,
    })
    .json({
      sucess: true,
      message,
    });
};

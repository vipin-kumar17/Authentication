
const jwt = require("jsonwebtoken");

const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, 
  };

  res.cookie("token", token, cookieOptions).status(200).json({
    success: true,
    token,
    user: user, 
  });
};

module.exports = sendToken;

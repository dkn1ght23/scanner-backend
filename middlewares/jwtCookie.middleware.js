import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: true });

export function setJwtCookie(req, res, next) {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: "production",
    sameSite: "strict",
  });
  next();
}

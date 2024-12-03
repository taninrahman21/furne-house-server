

import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("Token not found in cookies");
      res.status(401);
      throw new Error("Not authorized, Please Login");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Your Token is Expired" });
    }
    return res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};
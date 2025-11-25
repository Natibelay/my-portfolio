import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // get token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
      req.user = await User.findById(decoded.id).select("-password"); // get user info
      next(); // allow access to route
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

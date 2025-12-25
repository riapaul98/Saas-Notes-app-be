//logic behind the routes

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  //check if all fields' values are provided during sign up
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  //if all good, hash pw, create new user and save user to db
  const hashedPw = await bcrypt.hash(password, 12);
  const newUser = new User({ name, email, password: hashedPw });
  await newUser.save();
  return res.status(201).json({ message: "User created successfully" });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found! Please sign up" });
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (isMatch) {
    //payload -> secret -> options -- sequence matters
    const jwtToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "Signed in successfully",
      jwtToken,
      userInfo: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  }
  return res.status(401).json({ message: "invalid credentials" });
};

export const myInfo = async (req, res) => {
  const userId = req.userId;
  const existingUser = await User.findById(userId).select("name email -_id"); //only contains name, email inside existingUser, excluding _id
  if (!existingUser) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res.status(200).json(existingUser);
};

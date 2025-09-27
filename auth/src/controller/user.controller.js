import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

//Register
export async function registerUser(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Please provide all details",
        success: false,
        error: true,
      });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ phone }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken({ id: newUser._id, email: newUser.email });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      error: false,
      token, 
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: true,
    });
  }
}

//Login
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email/phone and password",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    const token = generateToken({ id: user._id, email: user.email });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      error: false,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: true,
    });
  }
}
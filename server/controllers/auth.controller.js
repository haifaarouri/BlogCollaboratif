import Role from "../models/Role.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role.name, permissions: user.role.permissions },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required !" });
  }

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "User already exists !" });

  let defaultRole = await Role.findOne({ name: "Lecteur" });
  if (!defaultRole) {
    defaultRole = await Role.create({ name: "Lecteur", permissions: [] });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: defaultRole._id,
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      role: {
        _id: user.role._id,
        name: user.role.name,
      },
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required !" });
  }

  const user = await User.findOne({ email }).populate("role");
  if (!user) return res.status(404).json({ message: "User not found !" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials !" });

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: {
          _id: user.role._id,
          name: user.role.name,
        },
      },
    });
};

export const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token !" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ token: newToken });
  });
};

export const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(200).json({ message: "Already logged out" });

  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

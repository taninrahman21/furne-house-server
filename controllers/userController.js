import bcrypt from "bcryptjs";
import User from "../models/user.js";


// register user
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fileds");
  }

  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("Email is already exit");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const token = generateToken(user._id);


  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    // TODO: remove localhost property
    // sameSite: "none", //for production
    // secure: true, //for production
    sameSite: "lax", //for localhost
    secure: false, //for localhost
  });

  if (user) {
    const { _id, fullName, email, photo, role } = user;
    res.status(201).json({ _id, fullName, email, photo, token, role });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add Email and Password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, Please signUp");
  }

  const passwordIsCorrrect = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    // TODO: remove localhost property
    // sameSite: "none", //for production
    // secure: true, //for production
    sameSite: "lax", //for localhost
    secure: false, //for localhost
  });


  if (user && passwordIsCorrrect) {
    const { _id, fullName, email, photo, role } = user;
    res.status(201).json({ _id, fullName, email, photo, role, token });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(201).json(users);
};
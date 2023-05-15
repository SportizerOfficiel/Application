// UserController.js

import dbConnect from "../Client";
var User = require("../Models/User");
import HandleRequest from "@/Utils/HandleRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const SALT_ROUNDS = 10;




/**
 * Création d'un nouvel utilisateur
 */
const postUser = HandleRequest(async ({ body }) => {
  await dbConnect();
  const { email, password } = body;

  if (!email || !password) throw new Error("Email or password is missing");

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({ email, password: hashedPassword });
  return await newUser.save();
});

/**
 * Récupération des utilisateurs
 */
const getUsers = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await User.find();
  return data;
});

/**
 * Récupération d'un utilisateur par ID
 */
const getUserById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await User.findById(id);
  if (!data) throw new Error("User not found");
  return data;
});

/**
 * Modification d'un utilisateur
 */
const putUserById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await User.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!data) throw new Error("User not found");
  return data;
});

/**
 * Suppression d'un utilisateur
 */
const deleteUserById = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const data = await User.findByIdAndDelete(id);
  if (!data) throw new Error("User not found");
  return data;
});




/**
 * Connexion d'un utilisateur
 */
const login = HandleRequest(async ({ body }) => {
  await dbConnect();
  const { email, password } = body;

  if (!email || !password) throw new Error("Email or password is missing");

  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user._id,email:user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return {
    token,
  };
});
export { getUsers, getUserById, putUserById, postUser, deleteUserById,login };

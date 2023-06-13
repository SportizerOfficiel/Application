// UserController.js

import dbConnect from "../Client";
var User = require("../Models/User");
import HandleRequest from "@/Utils/HandleRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
const SALT_ROUNDS = 10;




/**
 * Création d'un nouvel utilisateur
 */
const postUser = HandleRequest(async ({ body }) => {
  await dbConnect();
  const { Email, Password } = body;

  if (!Email || !Password) throw new Error("Email or Password is missing");

  const existingUser = await User.findOne({ Email });

  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(Password, SALT_ROUNDS);

  const newUser = new User({ Email, Password: hashedPassword });
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

const getPubsId = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  console
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  return user.PubsId;
});

const getAllPubsId = HandleRequest(async () => {
  await dbConnect();
  const users = await User.find({}, 'PubsId'); 
  return users;
});

const addPubsId = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  if (user.PubsId.includes(body.PubsId)) {
    throw new Error("ID already exists");
  }

  user.PubsId.push(body.PubsId);
  await user.save();

  return user;
});

const removePubsId = HandleRequest(async ({ body, id }) => {
  await dbConnect();
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  const index = user.PubsId.indexOf(body.PubsId);
  if (index === -1) {
    throw new Error("ID not found");
  }

  user.PubsId.splice(index, 1);
  await user.save();

  return user;
});

const updatePubsIds = HandleRequest(async ({ body, id }) => { // Renamed to updatePubsIds
  await dbConnect();
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  user.PubsId = body.PubsIds; // body.PubsIds should be an array of IDs
  await user.save();

  return user;
});

/**
 * Connexion d'un utilisateur
 */
const login = HandleRequest(async ({ body }) => {
  await dbConnect();
  const { Email, Password } = body;

  if (!Email || !Password) throw new Error("Email or Password is missing");

  const user = await User.findOne({ Email });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(Password, user.Password);

  if (!isPasswordValid) throw new Error("Invalid Password");

  const token = jwt.sign({ userId: user._id,Email:user.Email }, SECRET_KEY, {
    expiresIn: "3h",
  });

  return {
    token,
    id:user._id
  };
});
export { 
  getUsers, getUserById, putUserById, postUser, deleteUserById, login, 
  getPubsId, getAllPubsId, addPubsId, removePubsId, updatePubsIds 
};
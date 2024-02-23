import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "API is woking!" });
};

// update the user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "YOU ARE NOT ALLOWED TO UPDATE THIS USER"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "PASSWORD MUST BE AT LEAST 6 CHARACTERS"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(errorHandler(400, "USERNAME MUST BE B/W 7 - 20 CHARACTERS"));
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "USERNAME CANNOT CONSTAIN SPACES"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "USERNAME MUST BE LOWERCASE"));
    }
    if (req.body.username.match(/^[a-zA-Z0-9]=$/)) {
      return next(
        errorHandler(400, "USERNAME CAN ONLY CONTAIN LETTERS AND NUMBERS")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete the user

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "YOU ARE NOT ALLOWED TO DELETE THIS USER"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("USER HAS BEEN DELETED SUCCESSFULLY");
  } catch (error) {}
};

// signed out the user

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("USER HAS BEEN SIGNEDOUT");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "YOU ARE NOT ALLOWED TO SEE THE USERS"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassowrd = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassowrd,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

// here users are fetched for commentSection
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

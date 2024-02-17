import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "API is woking!" });
};

export const updateUser = async (req, res, next) => {

if (req.user.id !== req.params.userId) {
  return next(errorHandler(403, 'YOU ARE NOT ALLOWED TO UPDATE THIS USER'));
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

export const deleteUser = async (req, res, next) =>{

if (req.user.id !== req.params.userId) {
  return next(errorHandler(403, 'YOU ARE NOT ALLOWED TO DELETE THIS USER'));
}
try {
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json('USER HAS BEEN DELETED SUCCESSFULLY');
} catch (error) {
  
}
}
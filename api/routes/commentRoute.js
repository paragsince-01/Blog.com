import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getComment,
  getPostComment,
  likeComment,
} from "../controllers/commentControler.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.get("/getPostComment/:postId", getPostComment);

router.put("/likeComment/:commentId", verifyToken, likeComment);

router.put("/editComment/:commentId", verifyToken, editComment);

router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

router.get("/getComments", verifyToken, getComment);

export default router;

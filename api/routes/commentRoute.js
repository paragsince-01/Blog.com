import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getComment, likeComment } from "../controllers/commentControler.js";

const router = express.Router();

router.post('/create', verifyToken, createComment);

router.get('/getPostComment/:postId', getComment);

router.put('/likeComment/:commentId', verifyToken, likeComment);


export default router;



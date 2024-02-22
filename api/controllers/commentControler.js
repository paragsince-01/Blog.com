import Comment from "../models/commentModel.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next)=>{
 try {
    const {content, postId, userId} = req.body;
    if(userId !== req.user.id){
        return next(errorHandler(403, "You Are Not Allowed To Create A Comment"));
    }
    const newComment = new Comment({
        content, 
        postId, 
        userId,
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
 } catch (error) {
  next(error)  
 }
}
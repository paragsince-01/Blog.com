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

export const getComment = async(req, res, next)=>{
    try {
        const Comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1,
        });
        res.status(200).json(Comments)
    } catch (error) {
        next(error)
    }
}

export const likeComment = async(req, res, next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Comment Not Found'))
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        }else{
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);            
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}
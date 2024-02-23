import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentSection from "./CommentSection";

export default function Comment(postId) {
  const { currentUser } = useSelector((state) => state.user);
  const [commentChar, setCommentChar] = useState("");
  // console.log(commentChar._id);
  const [commentError, setCommentError] = useState(null);
  const [postComment, setPostComment] = useState([]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (commentChar.length === 0) {
      alert("You did not write any thing");
    }
    if (commentChar.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentChar,
          postId: String(postId),
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommentChar("");
        setCommentError(null);
        setPostComment([data, ...postComment])
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComment/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setPostComment(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  return (
    <>
      <div className="max-w-2xl mx-auto w-full">
        {currentUser ? (
          <div className="flex flex-row gap-1 items-center my-5 dark:text-gray-400 text-sm">
            <p className="">Signed In As_: </p>
            <img
              src={currentUser.profilePicture}
              className="h-8 w-8 rounded-full object-cover"
            />
            <Link to="/Dashboard?tab=profile" className="text-cyan-700 text-lg">
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className="gap-1 flex my-7 items-center">
            You must signed in to comment
            <Link to={"/signin"} className="text-cyan-700 text-lg">
              Sign In
            </Link>
          </div>
        )}
        {currentUser && (
          <form
            className="border border-teal-600 flex flex-col rounded-lg p-3"
            onSubmit={handleSubmitComment}
          >
            <Textarea
              placeholder="Add a comment..."
              maxLength="200"
              rows="7"
              onChange={(e) => setCommentChar(e.target.value)}
              value={commentChar}
            />
            <div className="flex justify-between items-center mt-5 text-sm ml-2">
              <p>{200 - commentChar.length} characters left</p>
              <Button
                outline
                type="submit"
                gradientDuoTone="purpleToPink"
                className="mr-2"
              >
                Submit
              </Button>
            </div>
            {commentError && (
              <Alert color="failure" className="mt-5">
                {commentError}
              </Alert>
            )}
          </form>
        )}
        {postComment.length === 0 ? (
          <p className="text-lg my-5">No Comments Yet!</p>
        ) : (
          <>
            <div className="my-5 gap-2 items-center flex text-sm tracking-wider">
              <p className="">
                {postComment.length === 1 ? "Comment" : "Comments"}
              </p>
              <div className=" border-2 border-amber-400 py-1 px-2 font-bold rounded-md">
                <p>{postComment.length}</p>
                {}
              </div>
            </div>
            {postComment.map((comment) => (
              <CommentSection key={comment._id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

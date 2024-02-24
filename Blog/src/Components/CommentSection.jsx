import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Textarea } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function CommentSection({ comment, onLike, onEdit }) {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [comment]);

  const handleEditComment = async () => {
    setIsEditing(true);
    setEditedComment(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editedComment,
        }),
      });
      if(res.ok){
        setIsEditing(false);
        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex gap-1 p-4 border-b dark:border-gray-600 text-sm">
        {/* ----------user's image---------- */}
        <div className="flex-shrink-0 mr-3">
          {user ? (
            <img
              src={user.profilePicture}
              alt="users DP"
              className="w-10 h-10 rounded-full border-2 border-amber-500 bg-gray-200 "
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          )}
        </div>

        {/* ----------user's username---------- */}
        <div className="flex-1">
          <div className="flex items-center mb-2 text-gray-900 dark:text-amber-500 tracking-wide">
            <span className="font-semibold mr-1 truncate">
              {user ? `@${user.username}` : "anonymous user"}
            </span>

            {/* ----------time of creation---------- */}
            <span className=" text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {/* ----------comment---------- */}
          {isEditing ? (
            <>
              <Textarea
                className="mb-2"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <div className="flex items-end justify-end gap-2 tracking-wide">
                <Button
                  type="button"
                  onClick={handleSave}
                  gradientDuoTone="purpleToPink"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  gradientDuoTone="cyanToBlue"
                  outline
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-900 dark:text-white pb-2">
                {comment.content}
              </p>
              <div className="flex items-center pt-2 text-xs border-t border-gray-900 dark:border-white max-w-fit gap-2">
                {/* ----------comment likes---------- */}
                <button
                  type="button"
                  onClick={() => onLike(comment._id)}
                  className={`text-gray-500 hover:text-blue-500 ${
                    currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    "!text-blue-500"
                  }`}
                >
                  <FaThumbsUp />
                </button>
                <p className="dark:text-gray-100 ">
                  {comment.numberOfLikes > 0 &&
                    comment.numberOfLikes +
                      " " +
                      (comment.numberOfLikes === 1 ? "like" : "likes")}
                </p>
                {currentUser &&
                  (currentUser._id === comment.userId ||
                    currentUser.isAdmin) && (
                    <button
                      type="button"
                      className="text-blue-500 font-bold tracking-wide"
                      onClick={handleEditComment}
                    >
                      Edit
                    </button>
                  )}
                {currentUser &&
                  (currentUser._id === comment.userId ||
                    currentUser.isAdmin) && (
                    <button
                      type="button"
                      className="text-red-500 font-bold tracking-wide"
                    >
                      Delete
                    </button>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

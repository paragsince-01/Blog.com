import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function CommentSection({ comment, onLike }) {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

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

  return (
    <>
      <div className="flex gap-1 p-2 border-b dark:border-gray-600 text-sm items-center">
        {/* ----------user's image---------- */}
        <div className="flex-shrink-0 mr-3 mb-6 tracking-wide">
          {user ? (
            <img
              src={user.profilePicture}
              alt="users DP"
              className="w-12 h-12 rounded-full border-2 border-amber-500 bg-gray-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          )}
        </div>

        {/* ----------user's username---------- */}
        <div className="flex-1">
          <div className="flex items-center mb-2 text-gray-900 dark:text-amber-500">
            <span className="font-semibold mr-1 truncate">
              {user ? `@${user.username}` : "anonymous user"}
            </span>

            {/* ----------time of creation---------- */}
            <span className=" text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {/* ----------comment---------- */}
          <p className="text-gray-900 dark:text-white mb-2">
            {comment.content}
          </p>

          {/* ----------comment likes---------- */}
          <div className="flex items-center pt-2 text-xs border-t border-gray-900 dark:border-white max-w-fit gap-2">
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
            <p className="dark:text-gray-100 ">{
              comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
            }</p>
          </div>
        </div>
      </div>
    </>
  );
}

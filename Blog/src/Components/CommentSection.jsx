import React, { useEffect, useState } from "react";
import moment from 'moment';

export default function CommentSection({ comment }) {
  const [user, setUser] = useState(null);

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
      <div className="flex gap-1 p-4 border-b dark:border-gray-600 text-base items-center">
        <div className="flex-shrink-0 mr-3">
        {user ? (
            <img src={user.profilePicture} alt="users DP" className="w-12 h-12 rounded-full border-2 border-orange-500 bg-gray-200"/>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          )}          
      </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-1 truncate">{user ? `@${user.username}`: "anonymous user" }</span>
            <span className="text-sm text-gray-500">{moment(comment.createdAt).fromNow()}</span>
          </div>
          <p className="text-gray-900">{comment.content}</p>
        </div>
        </div>
    </>
  );
}

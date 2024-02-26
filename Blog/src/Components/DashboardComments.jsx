import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableHead, TableRow, Modal, Button } from "flowbite-react";
// import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashboardComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [commentData, setCommentData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  // here comments are fetched from the backend

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments`);
        const data = await res.json();
        if (res.ok) {
          setCommentData(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  // here showmore button functionality is applied

  const handleShowMore = async () => {
    const startIndex = commentData.length;
    try {
      const res = await fetch(
        `/api/comment/getComments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setCommentData((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // here delete comment functionality is applied

  const handleDeletecomment = async () => {
    setShowPopup(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setCommentData((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && commentData.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head className="text-sm font-medium tracking-wider text-gray-700  dark:text-white">
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Commnet Likes</Table.HeadCell>
                <Table.HeadCell>PostId</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {commentData.map((comment) => (
                <Table.Body
                  key={comment._id}
                  className="text-sm font-medium tracking-wide text-gray-700  dark:text-white divide-y"
                >
                  <Table.Row>
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>{comment.content}</Table.Cell>

                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>

                    <Table.Cell>{comment.postId}</Table.Cell>

                    <Table.Cell>{comment.userId}</Table.Cell>

                    <Table.Cell>
                      <span
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowPopup(true);
                          setCommentIdToDelete(comment._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                className="text-blue-500 w-full self-center text-lg py-7"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </>
        ) : (
          <p>You Have No comments Yet!</p>
        )}
        <Modal
          show={showPopup}
          onClose={() => setShowPopup(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="w-12 h-12 text-red-700 dark:text-red-700 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-black dark:text-black">
                You Want To Delete This comment
              </h3>
              <div className="flex justify-evenly gap-4">
                <Button onClick={handleDeletecomment} color="failure">
                  Yes, I'm Sure
                </Button>
                <Button onClick={() => setShowPopup(false)} color="gray">
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

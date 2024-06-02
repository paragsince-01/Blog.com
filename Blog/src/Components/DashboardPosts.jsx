import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  Modal,
  Button,
  Navbar,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashboardPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [postData, setPostData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  // here posts are fetched from the backend

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setPostData(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  // here showmore button functionality is applied

  const handleShowMore = async () => {
    const startIndex = postData.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setPostData((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // here delete post functionality is applied

  const handleDeletePost = async () => {
    setShowPopup(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setPostData((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && postData.length > 0 ? (
          <>
            HI I am mohit
            <Table hoverable className="shadow-md">
              <Table.Head className="text-sm font-medium tracking-wider text-gray-700  dark:text-white">
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {postData.map((post) => (
                <Table.Body
                  key={post._id}
                  className="text-sm font-medium tracking-wide text-gray-700  dark:text-white divide-y"
                >
                  <Table.Row>
                    {/*------ table updated at */}
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    {/*------ post image -------*/}
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-contain bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>

                    {/*------ post title ------*/}
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>

                    {/*------ post category ------*/}
                    <Table.Cell>
                      <span>{post.category}</span>
                    </Table.Cell>

                    {/*------ post delete option ------*/}
                    <Table.Cell>
                      <span
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowPopup(true);
                          setPostIdToDelete(post._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>

                    {/*------ post edit option ------*/}
                    <Table.Cell className="text-blue-500 hover:underline">
                      <Link to={`/update_post/${post._id}`}>
                        <span>Edit</span>
                      </Link>
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
          <>
            <Navbar>
              <ul>
                <li >
                    <Link to="/" className="text-lg">
                      Home
                    </Link>
                  <li>
                      <Link to="Dashboard/helo" className="text-lg">
                        About
                      </Link>
                  </li>
                  {/* <li>
                    <Navbar.Link active={path === "/Projects"} as={"div"}>
                      <Link to="/Projects" className="text-lg">
                        Projects
                      </Link>
                    </Navbar.Link>
                  </li> */}
                </li>
              </ul>
            </Navbar>
            <p>You Have NO Posts Yet!</p>
          </>
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
                You Want To Delete This Post
              </h3>
              <div className="flex justify-evenly gap-4">
                <Button onClick={handleDeletePost} color="failure">
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

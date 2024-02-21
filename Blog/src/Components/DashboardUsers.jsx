import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableHead, TableRow, Modal, Button } from "flowbite-react";
// import { Link } from "react-router-dom";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
import {FaCheck, FaTimes} from 'react-icons/fa'

export default function DashboardUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // here users are fetched from the backend

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUserData(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  // here showmore button functionality is applied

  const handleShowMore = async () => {
    const startIndex = userData.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserData((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // here delete user functionality is applied

  //   const handleDeleteUser = async () => {
  //     setShowPopup(false);
  //     try {
  //       const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`,{
  //         method: 'DELETE',
  //       });
  //       const data = await res.json();
  //       if(!res.ok){
  //         console.log(data.message);
  //       }
  //       else{
  //         setUserData((prev)=>
  //         prev.filter((user)=>user._id !== userIdToDelete));
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && userData.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head className="text-sm font-medium tracking-wider text-gray-700  dark:text-white">
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {userData.map((user) => (
                <Table.Body
                  key={user._id}
                  className="text-sm font-medium tracking-wide text-gray-700  dark:text-white divide-y"
                >
                  <Table.Row>
                    {/*------ table updated at */}
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    {/*------ user image -------*/}
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-contain bg-gray-500 rounded-full"
                      />
                    </Table.Cell>

                    {/*------ user's username ------*/}
                    <Table.Cell>{user.username}</Table.Cell>

                    {/*------ user category ------*/}
                    <Table.Cell>
                      <span>{user.email}</span>
                    </Table.Cell>

                    {/*------ user category ------*/}
                    <Table.Cell>
                      <span>{user.isAdmin ? (<FaCheck className="text-green-500" />) : (<FaTimes className="text-red-500" />)}</span>
                    </Table.Cell>

                    {/*------ user delete option ------*/}
                    <Table.Cell>
                      <span
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowPopup(true);
                          setUserIdToDelete(user._id);
                        }}
                      >
                        Delete User
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
          <p>You Have No Users Yet!</p>
        )}
        {/* <Modal
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
                You Want To Delete This user
              </h3>
              <div className="flex justify-evenly gap-4">
                <Button onClick={handleDeleteUser} color="failure">
                  Yes, I'm Sure
                </Button>
                <Button onClick={() => setShowPopup(false)} color="gray">
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}
      </div>
    </>
  );
}

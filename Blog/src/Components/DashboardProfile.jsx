import { Alert, Button, Modal, ModalHeader, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutSuccess,
} from "../redux/User/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {Link} from 'react-router-dom'

export default function DashboardProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const [imageUploadingError, setImageUploadingError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Change the image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadingError("FILE SIZE HAS TO LESS THEN 2MB");
        setImageUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setUpdateFormData({ ...updateFormData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  // Update the user

  const handleUpdateChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(updateFormData).length === 0) {
      setUpdateUserError("No Changes Made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to be upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFormData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  // Delete the user

  const handleDelete = async () => {
    setShowPopup(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  // Signed out the user

  const handleSignout = async () => {
    try {
      const res = await fetch("api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-bold text-4xl tracking-widest">
        Profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="file"
          accept="/image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {imageUploadingProgress && (
            <CircularProgressbar
              value={imageUploadingProgress || 0}
              text={`${imageUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageUploadingProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt=""
            className="rounded-full w-full h-full border-4 border-orange-500"
          />
        </div>
        {imageUploadingError && (
          <Alert color="failure">{imageUploadingError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleUpdateChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleUpdateChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleUpdateChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
          {loading ? 'loading...' : 'Update'}          
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/Create_Post"}>
            <Button
              type="button"
              gradientDuoTone="pinkToOrange"
              className="w-full"
            >
              Create A Post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-amber-500 flex justify-between mt-2">
        <span className="cursor-pointer" onClick={() => setShowPopup(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
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
              You Want To Delete This Account
            </h3>
            <div className="flex justify-evenly gap-4">
              <Button onClick={handleDelete}>Yes, I'm Sure</Button>
              <Button onClick={() => setShowPopup(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useNavigate} from 'react-router-dom'

export default function Create_Post() {
  const [file, setFile] = useState(null);
  const [postImageProgress, setPostImageProgress] = useState(null);
  const [postImageError, setPostImageError] = useState(null);
  const [postFormData, setPostFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  // This is handling the uploading of image for the post

  const handlePostImage = async () => {
    try {
      if (!file) {
        setPostImageError("Please Select An Image");
        return;
      }
      setPostImageError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPostImageProgress(progress.toFixed(0));
        },
        (error) => {
          setPostImageError("Image Upload Failed");
          setPostImageProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPostImageProgress(null);
            setPostImageError(null);
            setPostFormData({ ...postFormData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setPostImageError("Image Upload Failed");
      setPostImageProgress(null);
      console.log(error);
    }
  };

  //This is handling the creating of whole post

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postFormData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something Went Wrong');
    }
  };

  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-bold tracking-wider">
          {" "}
          Create A Post
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setPostFormData({ ...postFormData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setPostFormData({ ...postFormData, category: e.target.value })
              }
            >
              <option value="UnCategorized">Select a category</option>
              <option value="html">HTML/HTML5</option>
              <option value="css">CSS</option>
              <option value="tailwindcss">TailwindCSS</option>
              <option value="javascript">JavaScript</option>
              <option value="mongodb">MongoDB</option>
              <option value="express.js">Express.js</option>
              <option value="react.js">React.js</option>
              <option value="node.js">Node.js</option>
              <option value="bootstrap">Bootstrap</option>
              <option value="materialui">MaterialUI</option>
              <option value="others">Other Topics</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between   border-4 border-amber-500 border-dotted p-3 ">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              outline
              onClick={handlePostImage}
              disabled={postImageProgress}
            >
              {postImageProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={postImageProgress}
                    text={`${postImageProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {postImageError && <Alert color="failure">{postImageError}</Alert>}
          {postFormData.image && (
            <img
              src={postFormData.image}
              alt="uploaded image"
              className="w-full h-72 object-contain bg-center"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="write something....."
            className="h-72 mb-12"
            required
            onChange={(value) =>
              setPostFormData({ ...postFormData, content: value })
            }
          />
          <Button
            type="button"
            gradientDuoTone="cyanToBlue"
            onClick={handlePost}
          >
            Publish
          </Button>
          {
            publishError && <Alert color='failure' className="mt-5">{publishError}</Alert> 
          }
        </form>
      </div>
    </>
  );
}

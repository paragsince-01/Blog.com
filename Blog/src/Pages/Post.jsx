import { Spinner, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import Comment from "../Components/Comment";
import PostCard from "../Components/PostCard";

export default function Post() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  // console.log(postd);
  const [recentPosts, setRecentsPosts] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPostData();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentsPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  });

  if (loading)
    return (
      <span className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </span>
    );

  return (
    <>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        {/* ----------post-title---------- */}
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-4xl mx-auto lg:text-4xl tracking-wide">
          {post && post.title}
        </h1>

        {/* ----------post-catrgory---------- */}
        <Link
          to={`/search?category=${post && post.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="lg">
            {post && post.category}
          </Button>
        </Link>

        {/* ----------post-image---------- */}
        <img
          src={post && post.image}
          alt="some kind of this post related image"
          className="mt-10 p-3 max-h-[600px] w-10/12 object-cover self-center"
        />

        {/* ----------post-createdat---------- */}
        <div className="flex justify-between p-3 border-b dark:border-white border-gray-900  mx-auto w-full max-w-4xl text-sm">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{post && (post.content.length / 1000).toFixed(0)} mins</span>
        </div>

        {/* ----------post-content---------- */}
        <div
          className="p-3 max-auto w-full postContent self-center max-w-3xl tracking-wide dark:text-gray-400 text-gray-700"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
        <div className="max-w-4xl mx-auto w-full">
          {" "}
          <CallToAction />
        </div>
        <div className="">
          <Comment postId={post._id} />
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-2xl my-5">Recent Articles</h1>
          <div className="flex flex-wrap md:flex-nowrap gap-5 justify-center mb-5">
            {recentPosts &&
              recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

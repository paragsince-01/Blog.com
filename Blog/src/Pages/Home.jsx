import React, {useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import CallToAction from '../Components/CallToAction.jsx';
import PostCrad from '../Components/PostCard.jsx'

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=9`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  },[1000000])

  return (
    <>
      <div className="capitalize flex flex-col gap-6 p-28 px-3 md:px-20 max-w-6xl mx-auto ">
        <h1 className='text-5xl font-bold tracking-wider'>Welcome To My Blog</h1>
        <p className='text-gray-700 dark:text-teal-400 font-semibold leading-loose hover:underline hover:underline-offset-8 '>Here you'll find a variety of articles and tutorials on topics such as web development, <br className='hidden md:block' /> software engineering, and programming languages.</p>
        <Link to='/search' className='text-lg text-gray-700 dark:text-teal-400 font-semibold hover:underline tracking-wide w-40'>View All Post</Link>
        <div className="bg-amber-400 dark:bg-slate-700 p-3 rounded-tl-3xl rounded-br-3xl">
          <CallToAction />
        </div>
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">Recents Posts</h2>
              <div className="flex flex-wrap gap-4 items-center justify-start sm:justify-between">
                {
                  posts.map((post)=>(
                    <PostCrad key={post._id} post={post} />
                  ))
                }
              </div>
              <Link to='/search' className='text-lg text-gray-700 dark:text-teal-400 font-semibold hover:underline tracking-wide w-full text-right'>View All Post</Link>
            </div>
          )
        }
      </div>
    </>
  )
}

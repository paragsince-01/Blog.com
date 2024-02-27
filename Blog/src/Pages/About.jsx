import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div className="grid grid-col-1 gap-y-0  min-h-[95vh] md:p-12 text-gray-300 ">
        <div className="flex flex-col w-full p-10">
          <h1 className="text-2xl tracking-wide flex gap-2 items-center">
            About <strong className="text-3xl">Parag's Blog</strong>
          </h1>
          <div className="flex-1 flex-col my-2 gap-y-2 w-[70vw] text-justify leading-relaxed">
            <p>
              Welcome to Parag's Blog! This blof was created Parag Aggarwal as a
              persnaol project to share his thoughts and ideas with world. Parag
              is passinate developer who loves to create web application, pages
              with his coding and everything in between
            </p>
            <br />
            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>
            <br />
            <p>
              I think this will be my biggest project of my fresher's days and i
              have lots of time , effort, resoucres and what not. It has been an
              incredible journey so far. If you have any questions or just want
              to say hi, feel free to reach out.
            </p>
            <br />
            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve
            </p>
          </div>
        </div>
        <div className="items-center p-10">
          <h1 className="text-2xl tracking-wide flex gap-2 items-center">
            Categories That I Write || Code In :
          </h1>
          <div className="grid grid-cols-3 items-center mt-6 gap-y-4 tracking-wider ">
            <Link>
              <strong className="hover:underline">HTML || HTML5</strong>
            </Link>
            <Link>
              <strong className="hover:underline">CSS</strong>
            </Link>
            <Link>
              <strong className="hover:underline">JavaScript</strong>
            </Link>
            <Link>
              <strong className="hover:underline">Bootstrap</strong>
            </Link>
            <Link>
              <strong className="hover:underline">MaterialUI</strong>
            </Link>
            <Link>
              <strong className="hover:underline">TailwindCSS</strong>
            </Link>
            <Link>
              <strong className="hover:underline">React.js</strong>
            </Link>
            <Link>
              <strong className="hover:underline">Node.js</strong>
            </Link>
            <Link>
              <strong className="hover:underline">Express.js</strong>
            </Link>
            <Link>
              <strong className="hover:underline">MongoDB</strong>
            </Link>
            <Link>
              <strong className="hover:underline">Redux</strong>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostCrad from '../Components/PostCard.jsx'

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the search parameter from
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sideBarData, category });
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('sort', sideBarData.sort);
    urlParams.set('category', sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  
  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="p-7 boder-b md:border-r md:min-h-screen border-gray-500">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

            {/*---------  Search bar ---------*/}
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap font-semibold">
                Search Term :{" "}
              </Label>
              <TextInput
                type="text"
                name="search"
                id="searchTerm"
                placeholder="Enter search term..."
                value={sideBarData.searchTerm}
                onChange={handleChange}
              />
            </div>

            {/* ---------sort--------- */}
            <div className="flex gap-2 items-center">
              <Label className="whitespace-nowrap font-semibold">Sort : </Label>
              <Select
                className="w-48"
                onChange={handleChange}
                id="sort"
                value={sideBarData.sort}
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>

            {/*---------  Category ---------*/}
            <div className="flex gap-2 items-center">
              <Label className="whitespace-nowrap font-semibold">
                Category :{" "}
              </Label>
              <Select
                className="w-48"
                onChange={handleChange}
                id="category"
                value={sideBarData.category}
              >
                <option value="uncategorized">Uncategorized</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="bootstrap">Bootstrap</option>
                <option value="materialui">Material UI</option>
                <option value="react">React.js</option>
                <option value="mongodb">MongoDB</option>
                <option value="node">Node.js</option>
                <option value="express">Express.js</option>
                <option value="tailwindcss">TailwindCSS</option>
              </Select>
            </div>
            <Button type="submit" gradientDuoTone='purpleToPink' className="text-xl font-semibold">Search</Button>
          </form>
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-wide border-b-2 border-gray-700 text-center py-2">Resultant Posts</h1>
          <div className="p-7 flex flex-wrap gap-4">
            {
              !loading && posts.length === 0 && <p className="text-xl font-bold tracking-wide border-x-8 dark:border-amber-400 border-red-600 text-left py-2 rounded-lg w-60 px-4 ">
                No Results Found !
              </p>
            }
            {
              loading && <p className="text-xl font-bold tracking-wide border-l-2 dark:border-amber-400 border-red-600 text-left py-2 w-60 px-4 ">
              Loading
            </p>
            }
            {
              !loading && posts && posts.map((post)=>
              <PostCrad key={post._id} post={post} />)
            }
            {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

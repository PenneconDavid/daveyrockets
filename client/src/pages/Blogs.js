import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/blogAPI";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getBlogs();
        if (Array.isArray(blogsData)) {
          setBlogs(blogsData);
          setFilteredBlogs(blogsData);
        } else if (blogsData && blogsData.length === 0) {
          setBlogs([]);
          setFilteredBlogs([]);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs.");
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container bg-[#282828] mx-auto p-4 pb-40 max-w-6xl">
      <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF] mb-8 py-10 bg-inherit">
        Blogs
      </h1>
      <div className="mb-6 bg-inherit">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 text-[#F3EACC] bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-blue-400"
        />
      </div>
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-lime-600 bg-gray-800">
                {blog.title}
              </h2>
              <p className="text-[#F3EACC] mt-2 text-[18px] bg-gray-800">
                {blog.content.substring(0, 100)}...
              </p>
              <Link
                to={`/blogs/${blog._id}`}
                className="text-blue-400 mt-4 block text-center hover:text-blue-500"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[#F3EACC] text-center text-[18px]">
          No blogs found.
        </div>
      )}
    </div>
  );
};

export default Blogs;
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Add this import
import { getBlogs } from "../api/blogAPI";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Importing spinner

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Adding loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getBlogs();
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
        setFilteredBlogs(Array.isArray(blogsData) ? blogsData : []);
        setError(null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Blogs - David Seibold's Insights on Development and Technology
        </title>
        <meta
          name="description"
          content="Read David Seibold's latest blogs and insights on software development, M&A, and the tech industry. Stay updated with valuable content."
        />
        <meta
          property="og:title"
          content="Blogs - David Seibold's Insights on Development and Technology"
        />
        <meta
          property="og:description"
          content="Explore blogs covering software development, M&A, and the tech industry, written by David Seibold."
        />
        {/* <meta property="og:image" content="https://daveyrockets.me/og-blogs-image.jpg" />  Replace with your actual image URL */}
        <meta property="og:url" content="https://daveyrockets.me/blogs" />
      </Helmet>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color={"#FFFFFF"} size={50} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="container bg-[#282828] mx-auto p-4 pb-40 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF] mb-6 md:mb-8 py-6 md:py-10">
            Words, Quotes, and Thoughts...
          </h1>
          <div className="mb-4 md:mb-6 bg-inherit">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
      )}
    </>
  );
};

export default Blogs;

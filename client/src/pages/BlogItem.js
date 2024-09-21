import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Add this import
import { useParams, Link } from "react-router-dom";
import { getBlog } from "../api/blogAPI";
import ClipLoader from "react-spinners/ClipLoader"; // Importing spinner

const BlogItem = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Adding loading state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlog(id);
        setBlog(blogData || null);
        setError(null);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog.");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>
          {blog
            ? `${blog.title} | David Seibold - Blog`
            : "Loading Blog | David Seibold - Blog"}
        </title>
        <meta
          name="description"
          content={
            blog ? `Read about ${blog.title}` : "Loading blog content..."
          }
        />
        <meta
          property="og:url"
          content={`https://daveyrockets.me/blogs/${blog.id}`}
        />
      </Helmet>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color={"#FFFFFF"} size={50} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : !blog ? (
        <div className="text-[#F3EACC] text-center text-[18px]">Loading...</div>
      ) : (
        <div className="container bg-[#282828] mx-auto p-6 max-w-[800px]">
          <h1 className="text-[36px] md:text-[55px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF] mb-6 md:mb-8">
            {blog.title}
          </h1>
          <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg min-h-[400px]">
            <p className="text-[#F3EACC] text-[18px] md:text-[20px] text-center leading-relaxed mb-6 md:mb-8">
              {blog.content}
            </p>
            <div className="text-center mt-8">
              <Link
                to="/blogs"
                className="text-lime-600 hover:text-[#F3EACC] text-[18px]"
              >
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogItem;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../api/blogAPI";
import { useAuthContext } from "../context/authContext";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the route params
  const { auth } = useAuthContext();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlog(id, auth.token);
        setBlog(blogData);
      } catch (error) {
        setError("Error fetching blog details");
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, auth.token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      {/* Add more blog details as needed */}
    </div>
  );
};

export default BlogDetails;

import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleContactClick = () => {
    navigate("/contact"); // Navigate to the Contact page
  };

  return (
    <div className="bg-[#282828] pb-80 min-h-screen flex flex-col justify-between">
      <div className="mx-auto max-w-4xl px-4 pt-20">
        <h2 className="text-6xl my-12 font-Poppins text-center bg-[#282828] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
          I do code and love learning about it!
        </h2>
        <p className="mb-12 bg-[#282828] py-16 text-lg">
          I am an entry-level full-stack software engineer with over [0] years
          of professional experience, specializing in [specialty x, y, and z].
          My expertise lies in [architectures, applications, and languages q, r,
          s]. Egestas eleifend, dapibus ac justo. Donec urna dolor, elementum in
          egestas eleifend, dapibus ac justo. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vestibulum dignissim fermentum diam, quis
          imperdiet magna ultricies faucibus. In sagittis, nunc sit amet feugiat
          auctor, tortor orci fermentum nibh. In placerat urna mauris eget
          tortor. Aenean ac dolor velit. Aenean velit nibh, condimentum id
          auctor quis, ultricies in turpis. Nunc euismod ultrices viverra.
          Pellentesque ut felis lectus, non sodales nibh. Quisque at augue quis
          tortor euismo.
        </p>
        <div className="flex justify-center space-x-12 mt-12">
          <button
            className="bg-lime-600 font-bold py-4 px-8 rounded-lg"
            onClick={handleContactClick}
          >
            Get in Touch
          </button>
          <button className="border-4 border-lime-600 text-lime-600 font-bold py-4 px-8 rounded-lg">
            Download CV
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import { Helmet } from "react-helmet";
import { CONTACT_BIO, CONTACT_NAME } from "../config";

function About() {
  return (
    <>
      <Helmet>
        <title>Contact David Seibold - Full-Stack Developer</title>
        <meta
          name="description"
          content="Get in touch with David Seibold, full-stack developer. Connect to discuss projects, collaborations, or opportunities."
        />
        <meta
          property="og:title"
          content="Contact David Seibold - Full-Stack Developer"
        />
        <meta
          property="og:description"
          content="Reach out to David Seibold to discuss opportunities or collaborations in software development."
        />
        <meta
          property="og:image"
          content="https://daveyrockets.me/og-contact-image.jpg"
        />
        <meta property="og:url" content="https://daveyrockets.me/contact" />
      </Helmet>

      <div className="bg-[#282828] flex flex-col items-center justify-center py-20 px-10">
        <div className="py-20">
          <h1 className="text-4xl md:text-6xl text-center text-[#F3EACC]">
            Hi, I'm {CONTACT_NAME}
          </h1>
        </div>
        <div className="my-4 md:my-8 max-w-4xl text-[#F3EACC]">
          <h2 className="text-2xl md:text-3xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
            About Myself
          </h2>
          <p className="text-base md:text-lg">{CONTACT_BIO}</p>
        </div>
        <div className="my-8 max-w-4xl pb-24 text-[#F3EACC]">
          <h2 className="text-3xl py-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000ff]">
            About This Site
          </h2>
          <p className="mb-6">
            This website is more than just a portfolio—it's a reflection of my
            journey from business leader to full-stack developer. After years of
            success in mergers & acquisitions, where I mastered financial
            analysis, business strategy, and stakeholder collaboration, I
            decided to pivot into tech to challenge myself and create. Here,
            you’ll find a collection of my projects, blogs, and ways to get in
            touch with me. Whether you're interested in seeing my coding work or
            discussing my career journey, this site is a place to connect and
            explore what’s next.
          </p>
        </div>
        <div className="my-8 max-w-4xl pb-24 text-[#F3EACC]">
          <h2 className="text-3xl py-6 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
            Skills
          </h2>
          <ul className="list-disc list-inside pl-5 space-y-2">
            <li className="mb-2">
              Full-Stack Web Development (React.js, Node.js, Express.js,
              MongoDB)
            </li>
            <li className="mb-2">
              API Development (RESTful API design, Postman testing)
            </li>
            <li className="mb-2">
              Front-End Design (HTML5, CSS3, JavaScript, TailwindCSS)
            </li>
            <li className="mb-2">Version Control (Git, GitHub)</li>
            <li className="mb-2">
              Database Management (MongoDB, SQL, PostgreSQL)
            </li>
            <li className="mb-2">
              Responsive Web Design (Mobile-first, Flexbox, Grid)
            </li>
            <li className="mb-2">
              Unit & Integration Testing (Jest, Supertest)
            </li>
            <li className="mb-2">Mergers & Acquisitions</li>
            <li className="mb-2">Financial Analysis & Valuation</li>
            <li className="mb-2">Stakeholder Collaboration</li>
            <li className="mb-2">Data Analytics & Automation</li>
            <li className="mb-2">Process Improvement</li>
            <li className="mb-2">Business Strategy</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;

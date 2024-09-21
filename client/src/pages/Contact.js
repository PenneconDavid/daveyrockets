import { useState } from "react";
import { CONTACT_EMAIL, TWITTER_X_URL, FACEBOOK_URL } from "../config";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [comments, setComments] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    const formVals = {
      email,
      firstName,
      lastName,
      comments,
    };
    console.log("=== form submitted: values:", JSON.stringify(formVals));

    // Send the form data to the server via POST request
    fetch(`${process.env.REACT_APP_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formVals),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSuccessMessage("Your message has been sent successfully!");
        // Reset form fields
        setEmail("");
        setFirstName("");
        setLastName("");
        setComments("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSuccessMessage("There was an error submitting your message.");
      });
  };

  return (
    <div className="contact-form bg-[#282828]" id="contact-form">
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20 bg-white shadow-lg rounded px-8 py-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-lime-700"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-lime-900 shadow-sm ring-1 ring-inset ring-lime-300 placeholder:text-lime-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-lime-700"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-lime-900 shadow-sm ring-1 ring-inset ring-lime-300 placeholder:text-lime-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-lime-700"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-lime-900 shadow-sm ring-1 ring-inset ring-lime-300 placeholder:text-lime-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="comments"
              className="block text-sm font-semibold leading-6 text-lime-700"
            >
              Comments
            </label>
            <div className="mt-2.5">
              <textarea
                name="comments"
                id="comments"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-lime-900 shadow-sm ring-1 ring-inset ring-lime-300 placeholder:text-lime-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                value={comments}
                placeholder="Leave a comment"
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-gradient-to-r from-[#EFBD19] to-[#8000FF] px-3.5 py-2.5 text-center text-sm font-semibold text-[#f3eacc] shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
            Leave me a message
          </button>
        </div>
      </form>
    </div>
  );
}

// Contact page with form
function Contact() {
  return (
    <div>
      <h2 className="text-4xl p-12 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
        Contact
      </h2>

      <div>
        <p className="bg-[#282828]">
          Please feel free to reach out by whatever means you prefer. All my
          links are below, otherwise fill out the form and I'll reach out to
          you!
        </p>
      </div>
      <div className="pt-20 bg-[#282828]">
        <h3 className="text-4xl my-12 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
          Get in touch
        </h3>
        <p>If you'd like to get in touch, I'd love to hear from you.</p>

        {/* Contact form */}
        <ContactForm />

        {/* Social media */}
        <div className="contact-methods py-40">
          <h2 className="text-4xl my-12 font-semibold">Social Media Links</h2>
          <p>
            <span className="contact-method-item">
              <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            </span>
          </p>
          <p>
            <span className="contact-method-item">
              <a href={FACEBOOK_URL}>Facebook</a>
            </span>
          </p>
          <p>
            <span className="contact-method-item">
              <a href={TWITTER_X_URL}>Twitter / X</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;

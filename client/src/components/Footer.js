import { CONTACT_EMAIL, CONTACT_PHONE, COPYRIGHT_INFO } from "../config.js";

function Footer() {
  return (
    <footer className="bg-[#282828] text-gray-400 w-full py-6">
      <div className="container mx-auto flex justify-around">
        <div className="text-center">
          <p className="font-semibold">{"{ David Seibold }"}</p>
        </div>
        <div className="text-center">
          <h3 className="font-bold">Information</h3>
          <p>Phone: {CONTACT_PHONE}</p>
          <p>
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-lime-600">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>San Diego, CA</p>
        </div>
        <div className="text-center">
          <h3 className="font-bold">Social Media</h3>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            Twitter/X
          </a>
        </div>
      </div>
      <div className="bg-[#282828] text-gray-500 text-sm py-4 mt-4">
        <div className="container mx-auto flex justify-start px-6">
          <p>{COPYRIGHT_INFO}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

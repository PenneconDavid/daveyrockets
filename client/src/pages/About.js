import { CONTACT_BIO, CONTACT_NAME } from "../config";

function About() {
  return (
    <div className="bg-[#282828] flex flex-col items-center justify-center py-24 px-10">
      <div className="py-20">
        <h1 className="text-6xl text-center text-[#F3EACC]">
          Hi, I'm {CONTACT_NAME}
        </h1>
      </div>
      <div className="my-16 max-w-4xl text-[#F3EACC]">
        <h2 className="text-3xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
          About Myself
        </h2>
        <p className="mb-8">{CONTACT_BIO}</p>
      </div>
      <div className="my-16 max-w-4xl pb-24 text-[#F3EACC]">
        <h2 className="text-3xl py-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000ff]">
          About This Site
        </h2>
        <p className="mb-6">
          [Placeholder from LinkedIn] I'm an accomplished M&A leader well-versed
          in business valuation modeling and forecasting, ROI, and IRR
          calculations. Skilled at finding targets and solutions to match a
          company’s market strategy through stakeholder collaboration and
          process improvement through leveraging data analytics and automation.
          Experienced in assisting in integrating new assets to ensure the
          long-term success of new acquisitions.
        </p>
        <p className="mb-6">
          Egestas eleifend, dapibus ac justo. Donec urna dolor, elementum in
          egestas eleifend, dapibus ac justo. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vestibulum dignissim fermentum diam, quis
          imperdiet magna ultricies faucibus. In sagittis, nunc sit amet feugiat
          auctor, tortor orci fermentum nibh.
        </p>
        <p>
          In placerat urna mauris eget tortor. Aenean ac dolor velit. Aenean
          velit nibh, condimentum id auctor quis, ultricies in turpis. Nunc
          euismod ultrices viverra. Pellentesque ut felis lectus, non sodales
          nibh. Quisque at augue quis tortor euismo.
        </p>
      </div>
      <div className="my-16 max-w-4xl pb-24 text-[#F3EACC]">
        <h2 className="text-3xl py-6 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF]">
          Skills
        </h2>
        <ul className="list-disc list-inside pl-5 space-y-2">
          <li className="mb-2">Mergers & Acquisitions</li>
          <li className="mb-2">Financial Analysis & Valuation</li>
          <li className="mb-2">Stakeholder Collaboration</li>
          <li className="mb-2">Data Analytics & Automation</li>
          <li className="mb-2">Process Improvement</li>
          <li className="mb-2">Business Strategy</li>
        </ul>
      </div>
    </div>
  );
}

export default About;

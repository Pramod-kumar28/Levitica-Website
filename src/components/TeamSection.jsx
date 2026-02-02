import { FaLinkedinIn } from "react-icons/fa";

const teamData = [
  {
    name: "Medipudi Durgaprasad",
    role: "Founder",
    image: "/img/cofounder.jpg",
    link: "https://in.linkedin.com/in/medipudi-durgaprasad-398552274",
    quote:
      "Empowering teams to deliver end-to-end solutions through visionary leadership and operational excellence.",
  },
];

const TeamSection = () => {
  return (
    <section className="tw-bg-slate-50 tw-py-24">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-4">

        {/* Header */}
        <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-8">
          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
            Meet Our Lovely Founder
          </h2>
          <p className="tw-mt-4 tw-text-slate-600">
            Building impactful solutions through leadership, innovation,
            and people-first thinking.
          </p>
        </div>

        {/* Team Cards */}
        <div className="tw-flex tw-justify-center">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="tw-group tw-relative tw-w-full sm:tw-w-[340px]"
            >
              {/* Card */}
              <div className="tw-bg-white tw-rounded-2xl tw-shadow-md tw-overflow-hidden tw-transition hover:tw-shadow-xl">

                {/* Image */}
                <div className="tw-relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="tw-w-full tw-h-[380px] tw-object-cover"
                  />

                  {/* Overlay (hover on desktop, visible on mobile) */}
                  <div
                    className="
                      tw-absolute tw-inset-0 tw-bg-slate-900/80
                      tw-flex tw-flex-col tw-items-center tw-justify-center
                      tw-text-center tw-p-6
                      tw-opacity-100 sm:tw-opacity-0
                      sm:group-hover:tw-opacity-100
                      tw-transition
                    "
                  >
                    <p className="tw-text-sm tw-text-white/90 tw-mb-6">
                      “{member.quote}”
                    </p>

                    <h5 className="tw-text-white tw-font-semibold">
                      {member.name}
                    </h5>
                    <span className="tw-text-white/80 tw-text-sm">
                      {member.role}
                    </span>

                    <a
                      href={member.link}
                      target="_blank"
                      rel="noreferrer"
                      className="tw-mt-4 tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-transition"
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>

                {/* Footer (hidden on desktop hover, visible on mobile) */}
                <div className="tw-p-5 tw-text-center sm:group-hover:tw-opacity-0 tw-transition">
                  <h5 className="tw-font-semibold tw-text-slate-900">
                    {member.name}
                  </h5>
                  <span className="tw-text-sm tw-text-slate-500">
                    {member.role}
                  </span>

                  <div className="tw-mt-3 tw-flex tw-justify-center">
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noreferrer"
                      className="tw-inline-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-full tw-border tw-border-slate-200 tw-text-blue-600 hover:tw-bg-blue-600 hover:tw-text-white tw-transition"
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;

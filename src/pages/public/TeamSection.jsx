import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

  /* ✅ AOS INIT */
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  return (
    <section className="bg-slate-50 dark:bg-darkmode py-24 flex justify-center items-center border-b border-lightgray dark:border-dark_border/20">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto container px-4">

        {/* HEADER */}
        <div
          className="text-center max-w-2xl mx-auto mb-8"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Meet Our Lovely Founder
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Building impactful solutions through leadership, innovation,
            and people-first thinking.
          </p>
        </div>

        {/* TEAM CARD */}
        <div className="flex justify-center">
          {teamData.map((member, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className="group relative w-full sm:w-[340px]"
            >
              {/* CARD */}
              <div className="bg-white dark:bg-semidark rounded-2xl shadow-md overflow-hidden border border-slate-100 dark:border-dark_border/20 transition hover:shadow-xl">

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[380px] object-cover"
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute inset-0 bg-slate-900/80
                      flex flex-col items-center justify-center
                      text-center p-6
                      opacity-100 sm:opacity-0
                      sm:group-hover:opacity-100
                      transition
                    "
                  >
                    <p className="text-sm text-white/90 mb-6">
                      “{member.quote}”
                    </p>

                    <h5 className="text-white font-semibold">
                      {member.name}
                    </h5>
                    <span className="text-white/80 text-sm">
                      {member.role}
                    </span>

                    <a
                      href={member.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="p-5 text-center sm:group-hover:opacity-0 transition">
                  <h5 className="font-semibold text-slate-900 dark:text-white">
                    {member.name}
                  </h5>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {member.role}
                  </span>

                  <div className="mt-3 flex justify-center">
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:text-white transition"
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
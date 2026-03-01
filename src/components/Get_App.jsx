const AppDownloadButtons = () => {
  return (
    <section className="tw-bg-gradient-to-br tw-from-slate-800 tw-to-black tw-py-20">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-4 tw-text-center">

        <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-semibold tw-mb-12">
          Download Our App Now
        </h2>

        <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-6">

          {/* Google Play */}
          <a
            href="#"
            className="tw-flex tw-items-center tw-gap-4 tw-bg-black tw-rounded-xl tw-px-6 tw-py-4 tw-w-[280px]
                       tw-shadow-lg hover:tw-shadow-2xl hover:-tw-translate-y-1
                       tw-transition-all"
          >
            <img
              src="/img/playstore-svgrepo-com.svg"
              alt="Google Play"
              className="tw-h-9"
            />
            <div className="tw-text-left">
              <p className="tw-text-xs tw-text-white/70">GET IT ON</p>
              <p className="tw-text-lg tw-font-bold tw-text-white">
                Google Play
              </p>
            </div>
          </a>

          {/* App Store */}
          <a
            href="#"
            className="tw-flex tw-items-center tw-gap-4 tw-bg-black tw-rounded-xl tw-px-6 tw-py-4 tw-w-[280px]
                       tw-shadow-lg hover:tw-shadow-2xl hover:-tw-translate-y-1
                       tw-transition-all"
          >
            <svg viewBox="0 0 24 24" className="tw-h-9 tw-fill-white">
              <path d="M17.05 12.04C17.03 9.53 19.18 8.05 19.25 8C17.95 6.06 15.87 5.85 15.1 5.83C13.55 5.66 12.06 6.9 11.24 6.9C10.41 6.9 9.17 5.84 7.82 5.86C6.08 5.89 4.53 6.88 3.74 8.47C1.98 11.75 3.34 16.64 5.06 19.14C5.87 20.37 6.83 21.75 8.04 21.7C9.23 21.66 9.69 20.95 11.16 20.95C12.62 20.95 13.05 21.7 14.3 21.68C15.55 21.66 16.4 20.43 17.2 19.19C18.13 17.82 18.54 16.48 18.56 16.41C18.52 16.39 17.07 15.71 17.05 12.04Z"/>
              <path d="M14.82 4.16C15.44 3.36 15.87 2.25 15.72 1.14C14.76 1.18 13.61 1.75 12.95 2.55C12.38 3.24 11.85 4.38 12.02 5.45C13.08 5.53 14.14 4.93 14.82 4.16Z"/>
            </svg>

            <div className="tw-text-left">
              <p className="tw-text-xs tw-text-white/70">DOWNLOAD ON THE</p>
              <p className="tw-text-lg tw-font-bold tw-text-white">
                App Store
              </p>
            </div>
          </a>
        </div>

        <p className="tw-mt-12 tw-text-white/60 tw-max-w-xl tw-mx-auto">
          Get access to exclusive content, personalized learning paths, and career
          advancement tools with our mobile application.
        </p>

      </div>
    </section>
  );
};




const GetApp = () => {
  return (
    <div className="">
      {/* HERO */}
      <section
        className="hero-section ptb-100 gradient-overlay"
        style={{ background: "url('img/header-bg-5.jpg') no-repeat center center / cover" }}
      >
        <div
          className="hero-bottom-shape-two"
          style={{ background: "url('img/hero-bottom-shape.svg') no-repeat bottom center" }}
        />
        <div className="tw-backdrop-blur-sm tw-max-w-5xl tw-mx-auto tw-text-center tw-mt-20">
          <h1 className="tw-text-white tw-text-4xl tw-font-bold">
            Download the DCM Learning App
          </h1>
          <p className="tw-text-white tw-mt-4 tw-text-lg tw-opacity-90">
            Learn smarter, track progress faster, and stay connected anywhere.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="tw-py-24">
        <div className="tw-max-w-6xl tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-12 tw-px-4">

          {/* Text Content */}
          <div>
            <h2 className="tw-text-3xl tw-font-bold tw-mb-6">
              Everything You Need to Learn — In Your Pocket
            </h2>

            <p className="tw-text-slate-600 tw-mb-5">
              The DCM mobile app is designed to give students a seamless learning experience
              anytime, anywhere. Whether you’re commuting, taking a break, or studying at home,
              the app ensures uninterrupted access to your courses, live sessions, assignments,
              and performance tracking tools. No more waiting to open a laptop — your entire
              learning journey is now just one tap away.
            </p>

            <p className="tw-text-slate-600 tw-mb-5">
              With real-time notifications, you’ll never miss important announcements,
              class updates, or assignment deadlines. The app keeps you connected with
              instructors and classmates, allowing you to participate in discussions,
              clarify doubts instantly, and stay engaged with your learning community.
            </p>

            <p className="tw-text-slate-600 tw-mb-5">
              Our intuitive interface is built for speed and simplicity. You can easily
              track your progress, revisit recorded sessions, download study materials,
              and monitor your course completion milestones — all in a smooth,
              distraction-free environment optimized for mobile devices.
            </p>

            <p className="tw-text-slate-600">
              Whether you are preparing for your career, upgrading your skills,
              or mastering a new technology, the DCM App empowers you to learn
              consistently and efficiently. Take control of your education and
              experience learning without limits.
            </p>
          </div>

          {/* Image */}
          <div className="tw-flex tw-justify-center tw-items-center">
            <img
              src="/img/downloaddesign.png"
              alt="DCM App Preview"
              className="tw-max-w-sm tw-w-full"
            />
          </div>
        </div>
      </section>

      <AppDownloadButtons />
    </div>
  );
};

export default GetApp;

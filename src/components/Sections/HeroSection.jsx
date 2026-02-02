const HeroSection = () => {
  return (
    <section className="hero-equal-height tw-relative tw-overflow-hidden tw-pt-24 tw-pb-20 lg:tw-pt-32 lg:tw-pb-24">
      <div className="hero-shape"></div>

      <div className=" tw-mx-auto tw-px-4">
        <div className="
  tw-grid 
  tw-grid-cols-1 
  lg:tw-grid-cols-2 
  tw-items-center
  tw-gap-y-16
  lg:tw-gap-y-0
  lg:tw-gap-x-16
">

          {/* Text */}
          <div className="tw-w-full">
            <div className="hero-slider-content tw-my-12 lg:tw-max-w-xl">
              <span className="tw-uppercase tw-ml-1">
                People First. Solutions Always
              </span>

              <h1 className="tw-mt-3">
                Expert Training. Reliable Manpower. Proven Consulting
              </h1>

              <p className="tw-mt-4 tw-text-lg">
                Holistically procrastinate mission-critical convergence with reliable customer service.
                Assertively underwhelm idea-sharing for impactful solutions.
              </p>

              <div className="action-btns tw-mt-4">
                <a href="contact-us" className="btn accent-solid-btn">
                  Get Start Now
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="tw-w-full lg:tw-max-w-[520px] lg:tw-justify-self-end">
            <div className="hero-animation-img tw-relative tw-flex tw-justify-center lg:tw-justify-end tw-overflow-hidden">

              <img
                src={`${process.env.PUBLIC_URL}/img/hero-animation-01.svg`}
                alt="hero"
                className="tw-hidden lg:tw-block animation-two"
                width="150"
              />

              <img
                src={`${process.env.PUBLIC_URL}/img/hero-single-img-1.svg`}
                alt="hero"
                className="animation-one tw-max-w-full tw-w-[90%] lg:tw-w-auto"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

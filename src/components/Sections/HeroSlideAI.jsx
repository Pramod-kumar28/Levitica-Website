import AILottie from "../lottie/AILottie"

const HeroSlideAI = () => {
  return (
    <section className="tw-relative tw-overflow-hidden tw-py-20 lg:tw-py-28 tw-bg-gradient-to-br tw-from-blue-900 tw-via-indigo-900 tw-to-purple-900">
      {/* Animated background elements */}
      <div className="tw-absolute tw-inset-0 tw-bg-grid-white/5 tw-bg-[size:20px_20px]" />
      <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-white/30 tw-to-transparent" />
      
      <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-px-4">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5 tw-gap-8 tw-items-center">
          
          {/* Text Content - Takes 3 columns */}
          <div className="lg:tw-col-span-3 tw-text-white">
            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-sm tw-text-sm tw-font-medium tw-mb-6">
              <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full tw-animate-pulse"></span>
              AI • Data • Automation
            </span>

            <h1 className="tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-font-bold tw-leading-tight tw-text-white">
              Build <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-cyan-400 tw-to-emerald-400">Intelligent</span> Systems
            </h1>

            <p className="tw-mt-6 tw-text-lg tw-text-blue-100 tw-max-w-2xl">
              Transform your business with machine learning, analytics, and automation. 
              We build AI solutions that drive smarter decisions and accelerate growth.
            </p>

            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-mt-8">
              <a 
                href="/training" 
                className="
                  tw-inline-flex
                  tw-items-center
                  tw-gap-2
                  tw-bg-gradient-to-r
                  tw-from-cyan-500
                  tw-to-emerald-500
                  hover:tw-from-cyan-600
                  hover:tw-to-emerald-600
                  tw-text-white
                  tw-px-8
                  tw-py-3
                  tw-rounded-xl
                  tw-font-semibold
                  tw-shadow-lg
                  hover:tw-shadow-xl
                  tw-transition-all
                  tw-duration-300
                "
              >
                Start Learning AI
              </a>
              <a 
                href="/contact" 
                className="
                  tw-inline-flex
                  tw-items-center
                  tw-gap-2
                  tw-bg-white/10
                  hover:tw-bg-white/20
                  tw-backdrop-blur-sm
                  tw-text-white
                  tw-border
                  tw-border-white/30
                  tw-px-8
                  tw-py-3
                  tw-rounded-xl
                  tw-font-semibold
                  tw-transition-all
                  tw-duration-300
                "
              >
                Book Consultation
              </a>
            </div>

            {/* Stats */}
            <div className="tw-flex tw-flex-wrap tw-gap-8 tw-mt-12">
              <div>
                <div className="tw-text-3xl tw-font-bold tw-text-cyan-300">98%</div>
                <div className="tw-text-sm tw-text-blue-200">Accuracy Rate</div>
              </div>
              <div>
                <div className="tw-text-3xl tw-font-bold tw-text-emerald-300">50+</div>
                <div className="tw-text-sm tw-text-blue-200">AI Projects</div>
              </div>
              <div>
                <div className="tw-text-3xl tw-font-bold tw-text-purple-300">24/7</div>
                <div className="tw-text-sm tw-text-blue-200">Model Monitoring</div>
              </div>
            </div>
          </div>

          {/* Lottie Animation - Takes 2 columns and overlaps */}
          <div className="lg:tw-col-span-2 tw-relative tw-mt-8 lg:tw-mt-0">
            <div className="tw-relative tw-z-10 tw--ml-4 lg:tw--ml-8">
              <AILottie />
            </div>
            {/* Floating elements */}
            <div className="tw-absolute tw-top-4 tw-right-4 tw-w-20 tw-h-20 tw-bg-cyan-500/20 tw-rounded-full tw-blur-xl"></div>
            <div className="tw-absolute tw-bottom-4 tw-left-4 tw-w-16 tw-h-16 twbg-purple-500/20 tw-rounded-full tw-blur-xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSlideAI;
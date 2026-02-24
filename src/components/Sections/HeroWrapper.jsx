const HeroWrapper = ({ children, bg }) => {
  return (
    <section
      className={`
        tw-relative 
        tw-w-full 
        tw-min-h-[100svh] 
        lg:tw-h-[90vh]
        tw-flex 
        tw-items-center 
        tw-overflow-hidden 

        ${bg}
      `}
    >
      <div className="
         
        tw-mx-auto 
        tw-w-full 
        tw-px-5 
        sm:tw-px-6 
        lg:tw-px-10
        tw-pt-28
        lg:tw-pt-0
      ">
        {children}
      </div>
    </section>
  );
};

export default HeroWrapper;
const HeroWrapper = ({ children, bg }) => {
  return (
    <section
      className={`
        relative 
        w-full 
        min-h-[100svh] 
        lg:h-[90vh]
        flex 
        items-center 
        overflow-hidden 

        ${bg}
      `}
    >
      <div className="
         
        mx-auto 
        w-full 
        px-5 
        sm:px-6 
        lg:px-10
        pt-28
        lg:pt-0
      ">
        {children}
      </div>
    </section>
  );
};

export default HeroWrapper;
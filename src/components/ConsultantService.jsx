import Footer from "./Footer";
import AboutUsSection from "./Sections/AboutSection";   


const Consultancy=()=>{
    return <>
      <div className="main">
        {/* Header section */}
        <section
          className="hero-section ptb-100 gradient-overlay"
          style={{
            background: "url('img/header-bg-5.jpg') no-repeat center center / cover",
          }}
        >
          <div
            className="hero-bottom-shape-two"
            style={{
              background: "url('img/hero-bottom-shape.svg') no-repeat bottom center",
            }}
          ></div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-7">
                <div className="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                  <h1 className="text-white mb-0">Consultancy</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

      <AboutUsSection />
      
      </div>

      
    </>
}

export default Consultancy;
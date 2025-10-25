import { Link } from "react-router-dom";



const ConsultingCTA = () => {
  return (
    <section className="call-to-action py-5">
      <div className="container">
        <div className="row justify-content-around align-items-center">
          <div className="col-md-7">
            <div className="subscribe-content">
              <h3 className="mb-1">Consulting Services To Empower  Your Business</h3>
              <p>
                Rapidiously engage fully tested e-commerce with progressive architectures.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="action-btn text-lg-right text-sm-left">
              <Link to="/contact-us" className="btn secondary-solid-btn">
                Contact With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingCTA;
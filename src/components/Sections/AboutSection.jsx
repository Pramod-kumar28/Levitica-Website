
import { FaLightbulb, FaBezierCurve, FaLifeRing, FaBrain } from "react-icons/fa";


const features = [
  "Cost Accounting Fundamentals",
  "Corporate Cash Management",
  "SEO Optimization Services",
  "Company Brand Solutions",
];

const promoBlocks = [
  {
    icon: <FaLightbulb className="icon-lg accent-color  " /> ,
    title: "Business Consulting",
    description: "Enthusiastically scale mission-critical imperatives rather than array.",
  },
  {
    icon: <FaBezierCurve className="icon-lg accent-color" />,
    title: "Creative Design",
    description: "Compellingly promote collaborative products without synergistic schemas.",
  },
  {
    icon: <FaLifeRing className="icon-lg accent-color" />,
    title: "Market Strategy",
    description: "Rapidiously create cooperative resources rather than client-based leadership.",
  },
  {
    icon: <FaBrain className="icon-lg accent-color" />,
    title: "Valuable Idea",
    description: "Enthusiastically scale mission-critical imperatives rather than array.",
  },
];

const AboutUsSection = () => (
  <section className="about-us-section  mb-5">
    <div className="container">
      <div className="row justify-content-around align-items-center">
        <div className="col-md-12 col-lg-5">
          <div className="about-content-right mb-md-4 mb-lg-0">
            <h2>From Learning to Leading — We’re With You.</h2>
            <p>
              Objectively productivate installed base technology whereas user friendly ROI.
              Phosfluorescently innovate functionalized potentialities through.
            </p>
            <p>
              Proactively synergize prospective resources after interoperable e-commerce.
              Interactively strategize multimedia based vis-a-vis customer directed scenarios proactively enable value.
            </p>
            <ul className="list-unstyled tech-feature-list">
              {features.map((feature, idx) => (
                <li key={idx} className="py-1">
                  <span className="ti-check-box mr-2 color-secondary"></span>
                  <strong>{feature}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-12 col-lg-6">
          <div className="row">
            {promoBlocks.map((block, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-6">
                <div className="single-promo-block p-4 text-center rounded border my-md-3 my-lg-3 my-sm-0">
                  <div className="promo-block-icon mb-3 ">{block.icon}</div>
                  <div className="promo-block-content">
                    <h5>{block.title}</h5>
                    <p>{block.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutUsSection;
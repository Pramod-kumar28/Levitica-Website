import { motion } from "framer-motion";
import './AboutUs.css'
import {
  FaRocket,
  FaUsers,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
  FaGlobe,
  FaHandshake,
  FaLightbulb,
  FaAward,
  FaCode,
  FaCloud,
  FaUserTie,
  FaGraduationCap
} from "react-icons/fa";



import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";


const stats = [
  { value: "200+", label: "Happy Clients", icon: <FaHandshake /> },
  { value: "500+", label: "Projects Delivered", icon: <FaAward /> },
  { value: "50+", label: "Experts Team", icon: <FaUsers /> },
  { value: "98%", label: "Client Satisfaction", icon: <FaChartLine /> },
];

const values = [
  { icon: <FaShieldAlt />, title: "Integrity", desc: "Transparent and ethical business practices" },
  { icon: <FaBrain />, title: "Innovation", desc: "Driving digital and AI-powered solutions" },
  { icon: <FaUsers />, title: "People First", desc: "Empowering teams and individuals" },
  { icon: <FaGlobe />, title: "Global Vision", desc: "Delivering scalable worldwide solutions" },
  { icon: <FaLightbulb />, title: "Creativity", desc: "Building smart and impactful ideas" },
  { icon: <FaHandshake />, title: "Partnership", desc: "Long-term trusted collaboration" },
];

const AboutUs = () => {
  return (
    <div className="about-modern">


      <section
        className="hero-section ptb-100 gradient-overlay"
        style={{ background: "url('img/header-bg-5.jpg') center center / cover no-repeat" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mt-5"
        >
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 text-center pt-sm-5 pt-md-5 pt-lg-0">
              <h1 className="text-white mb-3 display-4 fw-bold">
                Shaping Success Stories
              </h1>
              <p className="lead text-white mb-4">
                For over a decade, we've been transforming businesses through innovative
                solutions and exceptional talent development.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-cta"
              >
                <a href="#mission" className="btn accent-solid-btn">
                  Discover Our Journey <FaRocket className="ms-2" size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div
          className="hero-bottom-shape-two"
          style={{ background: `url('img/hero-bottom-shape.svg') bottom center no-repeat` }}
        ></div>
      </section>

      {/* ================= ABOUT COMPANY ================= */}
      <section className="about-company">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT CONTENT */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Building Digital Success Stories</h2>

              <p>
                We are a technology-driven consulting and solutions company delivering
                enterprise-grade IT services, manpower solutions, corporate training,
                and AI-powered digital platforms worldwide.
              </p>

              <p>
                Our mission is to bridge the gap between innovation and execution,
                helping organizations scale faster with technology, automation, and skilled talent.
              </p>

              <p>
                From startups to enterprises, we provide end-to-end digital solutions,
                professional training programs, and industry-ready courses to empower businesses
                and individuals in the digital era.
              </p>

              {/* Service List */}
              <ul className="about-list">
                <li>✔ IT Services & Software Development</li>
                <li>✔ AI, Data Science & Cloud Solutions</li>
                <li>✔ Corporate Training & Skill Development</li>
                <li>✔ Professional Courses & EdTech Platforms</li>
                <li>✔ Manpower & Consulting Services</li>
              </ul>

              <Link to="/contact-us" className="btn-primary-modern mt-3">
                Partner With Us <FaRocket />
              </Link>
            </motion.div>





            {/* RIGHT FEATURE CAROUSEL */}
            <motion.div
              className="col-lg-6 about-graphic"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={1}   // ✅ ONE BY ONE
                spaceBetween={20}
                className="about-feature-slider"
              >

                <SwiperSlide>
                  <div className="glass-box">
                    <FaCode />
                    <h4>Custom Software Development</h4>
                    <p>Enterprise web apps, SaaS platforms, mobile apps, and scalable backend systems.</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="glass-box">
                    <FaCloud />
                    <h4>Cloud & DevOps Solutions</h4>
                    <p>Cloud migration, CI/CD pipelines, scalable cloud infrastructure & automation.</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="glass-box">
                    <FaUserTie />
                    <h4>IT Consulting & Manpower</h4>
                    <p>Expert consultants, technical hiring, and workforce solutions for enterprises.</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="glass-box">
                    <FaGraduationCap />
                    <h4>EdTech Platform & Courses</h4>
                    <p>Skill-based online learning platforms, certifications, and corporate upskilling.</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="glass-box">
                    <FaChartLine />
                    <h4>Data Science & Analytics</h4>
                    <p>Business intelligence, predictive analytics, dashboards, and AI insights.</p>
                  </div>
                </SwiperSlide>


              </Swiper>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="about-stats">
        <div className="container">
          <div className="row g-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="col-md-3 col-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="stat-box">
                  <div className="stat-icon">{s.icon}</div>
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>

          <div className="row g-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="col-lg-4 col-md-6 mt-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="value-card-modern">
                  <div className="value-icon">{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <div className="container text-center">

          <motion.span
            className="cta-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Let’s Build Something Great
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Business?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="cta-text"
          >
            Partner with us to accelerate digital transformation, build scalable solutions,
            and unlock new growth opportunities with technology and talent.
          </motion.p>

          <div className="cta-buttons">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="btn-primary-modern"
            >
              Contact Us Today
            </motion.a>

            <motion.a
              href="/services"
              whileHover={{ scale: 1.05 }}
              className="btn-outline-modern"
            >
              View Services
            </motion.a>
          </div>

        </div>
      </section>


    </div>
  );
};

export default AboutUs;

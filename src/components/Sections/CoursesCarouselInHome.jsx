import React, { useState, useEffect } from 'react';
import './CoursesCarouselInHome.css';
import { Link } from 'react-router-dom';

const CoursesCarouselInHome = () => {
  // Sample dynamic blog data
 const [CoursesData, setBlogData] = useState([
  {
    id: 1,
    category: "Web Development",
    categoryClass: "primary",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    title: "MERN Stack Development",
    excerpt: "Master the complete MERN stack (MongoDB, Express.js, React, Node.js) with modern JavaScript technologies.",
    link: "/trainings/web-development/mern-stack-development"
  },
  {
    id: 2,
    category: "AI & ML",
    categoryClass: "danger",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Machine Learning Fundamentals",
    excerpt: "Learn the core concepts of machine learning including supervised, unsupervised learning, neural networks",
    link: "/trainings/data-science/machine-learning"
  },
  {
    id: 3,
    category: "AI",
    categoryClass: "info",
    image: "/img/ai-cloud-with-robot-head.jpg",
    title: "Advanced AI & Deep Learning",
    excerpt: "Dive deep into artificial intelligence, neural networks, natural language processing, and computer vision techniques.",
    link: "/trainings/data-science/artificial-intelligence"
  },
  {
    id: 4,
    category: "Web Development",
    categoryClass: "primary",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Java Full Stack Mastery",
    excerpt: "Comprehensive Java full-stack development covering Spring Boot, Hibernate, REST APIs, and modern frontend integration.",
    link: "/trainings/web-development/java-full-stack"
  },
  {
    id: 5,
    category: "Testing",
    categoryClass: "warning",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Selenium WebDriver Automation",
    excerpt: "Master automated testing with Selenium WebDriver, TestNG, build robust test automation frameworks.",
    link: "/trainings/testing/selenium-automation"
  },
  {
    id: 6,
    category: "Generative AI",
    categoryClass: "success",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Data Science with Python",
    excerpt: "Learn data analysis, visualization, and statistical modeling using Python, Pandas, NumPy, and Scikit-learn libraries.",
    link: "/trainings/data-science/generative-ai"
  }
]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === CoursesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? CoursesData.length - 1 : prevIndex - 1
    );
  };

  // Auto-play carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, currentIndex]);

  // Function to handle manual slide selection
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="blog-carousel-section  ">
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading mb-5">
              <h2>Our Courses</h2>
              <p className="lead">
                Enthusiastically drive revolutionary opportunities before emerging leadership. 
                Phosfluorescently cultivate emerging alignments time methods of empowerment.
              </p>
            </div>
          </div>
        </div>
        
        <div className="carousel-container w-100">
          <div className="carousel-wrapper">
            <button className="carousel-control prev" onClick={prevSlide}>
              <span className="ti-angle-left"></span>
            </button>
            
            <div className="carousel">
              {CoursesData.map((blog, index) => {
                // Calculate position class for each card
                let position = 'right';
                if (index === currentIndex) {
                  position = 'center';
                } else if (
                  index === currentIndex - 1 || 
                  (currentIndex === 0 && index === CoursesData.length - 1)
                ) {
                  position = 'left';
                }
                
                return (
                  <div 
                    key={blog.id} 
                    className={`carousel-card ${position}`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="single-blog-card card border-0 shadow-sm">
                      <span className={`category position-absolute badge badge-pill badge-${blog.categoryClass}`}>
                        {blog.category}
                      </span>
                      <img src={blog.image} className="card-img-top position-relative" alt={blog.title} />
                      <div className="card-body">
                        <h3 className="h5 mb-2 card-title">
                          <a href={blog.link}>{blog.title}</a>
                        </h3>
                       
                        <p className="card-text">{blog.excerpt}</p>
                        <a href={blog.link} className="detail-link">
                          Read more <span className="ti-arrow-right"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button className="carousel-control next" onClick={nextSlide}>
              <span className="ti-angle-right"></span>
            </button>
          </div>
          
          <div className="carousel-indicators ">
            {CoursesData.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
        <div className="text-center pt-5">
          <Link to={'/trainings'}>
          
            <button className="btn accent-solid-btn">View All  Our Courses</button>
          </Link>
          </div>
    </section>
  );
};

export default CoursesCarouselInHome;
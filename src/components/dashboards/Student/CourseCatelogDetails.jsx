import { Check, Clock, Download, Play } from 'lucide-react';
import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const course = {
    _id: courseId,
    name: "Advanced JavaScript Live Course",
    thumbnail: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'><rect fill='%238e44ad' width='800' height='400'/><text fill='%23ffffff' font-family='Arial' font-size='36' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>JavaScript Mastery</text></svg>",
    description: "Master modern JavaScript with advanced patterns, async programming, and complex concepts in live sessions. This comprehensive course will take you from intermediate to advanced JavaScript developer through hands-on projects and real-world applications.",
    instructor: "Naveen",
    instructorBio: "Senior JavaScript developer with 10+ years of experience. Former lead developer at TechCorp and author of 'Modern JavaScript Patterns'.",
    instructorAvatar: "N",
    category: "Development",
    duration: "12 weeks",
    price: 15000,
    totalLessons: 24,
    level: "Intermediate",
    rating: 4.8,
    students: 145,
    language: "English",
    lastUpdated: "2023-09-15",
    objectives: [
      "Master advanced JavaScript concepts and patterns",
      "Build complex applications with async programming",
      "Understand and implement modern ES6+ features",
      "Debug and optimize JavaScript performance",
      "Prepare for senior JavaScript developer roles"
    ],
    requirements: [
      "Basic knowledge of JavaScript fundamentals",
      "Understanding of HTML and CSS",
      "No prior advanced JavaScript experience required"
    ]
  };

  
  const curriculum = [
    {
      week: 1,
      title: "JavaScript Fundamentals Review",
      sessions: [
        { id: 1, title: "Modern JavaScript Syntax", },
        { id: 2, title: "Functions and Scope",  },
        { id: 3, title: "Arrays and Objects",  }
      ]
    },
    {
      week: 2,
      title: "Advanced Functions and Closures",
      sessions: [
        { id: 4, title: "Closures and Lexical Scope",  },
        { id: 5, title: "Higher-Order Functions",}
      ]
    },
    {
      week: 3,
      title: "Asynchronous JavaScript",
      sessions: [
        { id: 6, title: "Callbacks and Promises"},
        { id: 7, title: "Async/Await Patterns"  }
      ]
    }
  ];


  const reviews = [
    {
      id: 1,
      user: "Anand",
      avatar: "A",
      rating: 5,
      date: "2025-09-10",
      comment: "This course completely transformed my JavaScript skills. The live sessions were incredibly engaging and Sarah is an amazing instructor!"
    },
    {
      id: 2,
      user: "Shiva Kumar",
      avatar: "SK",
      rating: 4.5,
      date: "2025-08-28",
      comment: "Great content and well-structured. The hands-on projects really helped solidify the concepts. Would recommend to any developer looking to level up their JS skills."
    },
    {
      id: 3,
      user: "Premson",
      avatar: "P",
      rating: 4.8,
      date: "2025-08-15",
      comment: "The live Q&A sessions were invaluable. Being able to ask questions in real-time made complex topics much easier to understand."
    }
  ];

  const handleEnroll = () => {
    setIsEnrolled(true);
    // In a real app, you would call an API to enroll the user
  };

  const handleAddToCart = () => {
    // In a real app, you would add the course to cart
    alert(`Contact DCM Platform`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
   <>
   <div >
     <div className="course-details ">
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Courses
        </button>
      </div>

      <div className="course-header">
        <div className="header-content">
          <div className="category-badge">{course.category}</div>
          <h1>{course.name}</h1>
          <p className="course-description">{course.description}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <div className="instructor-info">
                <div className="instructor-avatar">{course.instructorAvatar}</div>
                <span>Taught by <strong>{course.instructor}</strong></span>
              </div>
            </div>
            <div className="meta-item">
              <span className="rating">
                {renderRatingStars(course.rating)}
                <span className="rating-text">{course.rating} ({course.students.toLocaleString()} students)</span>
              </span>
            </div>
           
          </div>
        </div>
        
        <div className="header-image">
          <img src={course.thumbnail} alt={course.name} />
          <div className="live-badge">Online Class</div>
        </div>
      </div>

      <div className="course-content">
        <div className="content-main">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button 
              className={`tab ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
            <button 
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h3>What you'll learn</h3>
                <div className="objectives-grid">
                  {course.objectives.map((objective, index) => (
                    <div key={index} className="objective-item">
                      <Check />
                      <span>{objective}</span>
                    </div>
                  ))}
                </div>

                <h3>Requirements</h3>
                <ul className="requirements-list">
                  {course.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>

                <h3>Course Description</h3>
                <p>{course.description} This live course is designed to take you from intermediate to advanced JavaScript developer through comprehensive live sessions, hands-on projects, and real-world applications. You'll learn directly from an industry expert with over 10 years of experience in JavaScript development.</p>
                
                <p>Each week features multiple live sessions where you can interact with the instructor, ask questions, and get immediate feedback. All sessions are recorded and available for review if you can't attend live.</p>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="curriculum-content">
                <div className="curriculum-header">
                  <span>{course.totalLessons} live sessions • {course.duration}</span>
               
                </div>

                <div className="weeks-list">
                  {curriculum.map(week => (
                    <div key={week.week} className="week-item">
                      <div className="week-header">
                        <h4>Week {week.week}: {week.title}</h4>
                        <span>{week.sessions.length} sessions</span>
                      </div>
                      
                      <div className="sessions-list">
                        {week.sessions.map(session => (
                          <div 
                            key={session.id} 
                            className={`session-item ${session.completed ? 'completed' : ''}`}
                            onClick={() => setSelectedSession(selectedSession?.id === session.id ? null : session)}
                          >
                            <div className="session-info">
                              <div className="session-type">Session Type : Online</div>
                              <h5>{session.title}</h5>
                              
                            </div>
                            
                         
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="instructor-content">
                <div className="instructor-profile">
                  <div className="instructor-avatar large">{course.instructorAvatar}</div>
                  <div className="instructor-details">
                    <h3>{course.instructor}</h3>
                    <p className="instructor-bio">{course.instructorBio}</p>
                    <div className="instructor-stats">
                      <div className="stat">
                        <span className="stat-value">{course.rating}</span>
                        <span className="stat-label">Instructor Rating</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{course.students.toLocaleString()}</span>
                        <span className="stat-label">Students</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">4</span>
                        <span className="stat-label">Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating-number">{course.rating}</span>
                    <div className="rating-stars">{renderRatingStars(course.rating)}</div>
                    <span className="rating-count">Course Rating • {reviews.length} reviews</span>
                  </div>
                  
                  <div className="rating-distribution">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <div key={stars} className="distribution-row">
                        <span className="stars-label">{stars} star{stars !== 1 ? 's' : ''}</span>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill" 
                            style={{ width: `${(reviews.filter(r => Math.floor(r.rating) === stars).length / reviews.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="distribution-percent">
                          {Math.round((reviews.filter(r => Math.floor(r.rating) === stars).length / reviews.length) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="reviewer">
                        <div className="reviewer-avatar">{review.avatar}</div>
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.user}</span>
                          <span className="review-date">{formatDate(review.date)}</span>
                        </div>
                      </div>
                      
                      <div className="review-rating">
                        {renderRatingStars(review.rating)}
                      </div>
                      
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="content-sidebar">
          <div className="pricing-card">
<div className="course-price">₹{course.price.toFixed(2)}</div>
            
            {isEnrolled ? (
              <button className="btn-primary enrolled">
                <Check /> Enrolled
              </button>
            ) : (
              <>
                <button className="btn-primary" onClick={handleEnroll}>
                  Enroll Now
                </button>
                <button className="btn-outline" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </>
            )}
            
           
            
            <div className="course-includes">
              <h4>This course includes:</h4>
              <ul>
                <li><Play /> {course.totalLessons} live sessions</li>
                <li><Clock /> {course.duration} of content</li>
                <li><Download /> Downloadable resources</li>
                <li><CertificateIcon /> Certificate of completion</li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
       
        
        .breadcrumb {
          margin-bottom: 1.5rem;
        }
        
        .back-btn {
          background: none;
          border: none;
          color: #6E8AFA;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .back-btn:hover {
          text-decoration: underline;
        }
        
        .course-header {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .header-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .category-badge {
          background: rgba(110, 138, 250, 0.1);
          color: #6E8AFA;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          align-self: flex-start;
        }
        
        .course-header h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0;
          color: #1a1a1a;
          line-height: 1.2;
        }
        
        .course-description {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
        
        .course-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
        }
        
        .instructor-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .instructor-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6E8AFA 0%, #8A6EFA 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.8rem;
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .star {
          color: #FFD700;
          font-size: 1.1rem;
        }
        
        .star.empty {
          color: #ddd;
        }
        
        .rating-text {
          font-weight: 500;
        }
        
        .header-image {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .header-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .live-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #FF6B6B;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .course-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        
        .content-main {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid #eee;
        }
        
        .tab {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          color: #666;
          position: relative;
        }
        
        .tab.active {
          color: #6E8AFA;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #6E8AFA;
        }
        
        .tab-content {
          padding: 2rem;
        }
        
        .overview-content h3,
        .curriculum-content h3,
        .instructor-content h3,
        .reviews-content h3 {
          margin: 0 0 1rem;
          color: #1a1a1a;
        }
        
        .objectives-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .objective-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .objective-item svg {
          color: #47B881;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }
        
        .requirements-list {
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .requirements-list li {
          margin-bottom: 0.5rem;
          color: #666;
        }
        
        .curriculum-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }
        
        .collapse-all {
          color: #6E8AFA;
          cursor: pointer;
          font-weight: 500;
        }
        
        .weeks-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .week-item {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .week-header {
          padding: 1.25rem;
          background: #f9f9f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .week-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }
        
        .sessions-list {
          display: flex;
          flex-direction: column;
        }
        
        .session-item {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .session-item:last-child {
          border-bottom: none;
        }
        
        .session-item:hover {
          background: #f9f9f9;
        }
        
        .session-item.completed {
          background: rgba(71, 184, 129, 0.05);
        }
        
        .session-info {
          flex: 1;
        }
        
        .session-type {
          font-size: 0.8rem;
          color: #6E8AFA;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .session-info h5 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
        }
        
        .session-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }
        
        .completed-badge {
          background: rgba(71, 184, 129, 0.1);
          color: #47B881;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .upcoming-badge {
          background: rgba(110, 138, 250, 0.1);
          color: #6E8AFA;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .instructor-profile {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }
        
        .instructor-avatar.large {
          width: 80px;
          height: 80px;
          font-size: 1.5rem;
        }
        
        .instructor-details {
          flex: 1;
        }
        
        .instructor-details h3 {
          margin: 0 0 0.75rem;
        }
        
        .instructor-bio {
          color: #666;
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        
        .instructor-stats {
          display: flex;
          gap: 2rem;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #666;
        }
        
        .reviews-summary {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }
        
        .average-rating {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .rating-number {
          font-size: 3rem;
          font-weight: 700;
          color: #1a1a1a;
        }
        
        .rating-count {
          color: #666;
          margin-top: 0.5rem;
        }
        
        .rating-distribution {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .distribution-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .stars-label {
          width: 60px;
          font-size: 0.9rem;
          color: #666;
        }
        
        .distribution-bar {
          flex: 1;
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .distribution-fill {
          height: 100%;
          background: #FFD700;
          border-radius: 4px;
        }
        
        .distribution-percent {
          width: 40px;
          text-align: right;
          font-size: 0.9rem;
          color: #666;
        }
        
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .review-item {
          padding: 1.5rem;
          border: 1px solid #eee;
          border-radius: 8px;
        }
        
        .reviewer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        
        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6E8AFA 0%, #8A6EFA 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }
        
        .reviewer-info {
          display: flex;
          flex-direction: column;
        }
        
        .reviewer-name {
          font-weight: 500;
          color: #1a1a1a;
        }
        
        .review-date {
          font-size: 0.9rem;
          color: #666;
        }
        
        .review-rating {
          margin-bottom: 0.75rem;
        }
        
        .review-comment {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
        
        .content-sidebar {
          position: sticky;
          top: 2rem;
          align-self: start;
        }
        
        .pricing-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .course-price {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
        }
        
        .btn-primary, .btn-outline {
          padding: 1rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6E8AFA 0%, #8A6EFA 100%);
          color: white;
          border: none;
        }
        
        .btn-primary:hover {
          box-shadow: 0 4px 12px rgba(110, 138, 250, 0.4);
        }
        
        .btn-primary.enrolled {
          background: #47B881;
        }
        
        .btn-outline {
          background: transparent;
          color: #6E8AFA;
          border: 1px solid #6E8AFA;
        }
        
        .btn-outline:hover {
          background: rgba(110, 138, 250, 0.1);
        }
        
        .money-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          color: #666;
          font-size: 0.9rem;
          padding: 0.5rem;
        }
        
        .course-includes {
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
        
        .course-includes h4 {
          margin: 0 0 1rem;
          font-size: 1rem;
        }
        
        .course-includes ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .course-includes li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }
        
        @media (max-width: 968px) {
          .course-header {
            grid-template-columns: 1fr;
          }
          
          .course-content {
            grid-template-columns: 1fr;
          }
          
          .content-sidebar {
            position: static;
          }
        }
        
        @media (max-width: 768px) {
          .course-details {
            padding: 1rem;
          }
          
          .objectives-grid {
            grid-template-columns: 1fr;
          }
          
          .tabs {
            overflow-x: auto;
          }
          
          .tab {
            white-space: nowrap;
          }
          
          .reviews-summary {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .instructor-profile {
            flex-direction: column;
            text-align: center;
          }
          
          .instructor-stats {
            justify-content: center;
          }
        }
      `}</style>
    </div>
   </div>
   </>
  );
};


const CertificateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);



export default CourseDetails;
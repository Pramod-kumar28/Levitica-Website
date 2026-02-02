import React, { useState } from 'react';
import { useCourses } from '../../../../hooks/useCourses';
import CourseCard from './CourseCard';

const DynamicCourses = () => {
  const { courses, error, isLoading, isError, refetch } = useCourses();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleEditCourse = (course) => {
    console.log('Editing course:', course);
    // You can open a modal or navigate to an edit page here
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      course.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(courses.map(course => course.category).filter(Boolean))];

  if (isLoading) {
    return (
      <section className="services-section ptb-100 gray-light-bg">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading courses...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="services-section ptb-100 gray-light-bg">
        <div className="container text-center">
          <div className="alert alert-danger">
            <h4>Error Loading Courses</h4>
            <p>{error?.data?.message || 'Failed to load courses. Please try again later.'}</p>
            <button className="btn btn-primary mt-3" onClick={refetch}>
              🔄 Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section ptb-100 gray-light-bg">
      
      <div className="container">
        <div className="text-center mb-5">
          <h2>Our Available Courses</h2>
          <p className="lead">
            Discover our comprehensive range of courses designed to enhance your skills and advance your career.
          </p>
        </div>

        {courses.length > 0 && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-10">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredCourses.length > 0 ? (
          <>
            <p className="text-muted text-center mb-3">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <div className="row">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id || course._id || index}
                  course={course}
                  onEdit={handleEditCourse}
                />
              ))}
            </div>
          </>
        ) : courses.length > 0 ? (
          <div className="text-center">
            <div className="alert alert-warning">
              <h4>No Courses Found</h4>
              <p>Try adjusting your filters.</p>
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="alert alert-info">
              <h4>No Courses Available</h4>
              <p>Please check back later.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicCourses;
import { useParams, Link } from "react-router-dom";
import data from '@/data/data.json';
import { FaArrowRight } from "react-icons/fa";
import CourseDetails from "./DeepCourseDetails";

const CourseDetail = () => {
  const { category, courseId } = useParams();

  const normalizedCategory = category?.toLowerCase().replace(/-/g, "");

  const categoryMap = {
    webdevelopment: data.webDevelopment,
    datascience: data.dataScience,
    uiuxdevelopment: data.uiuxDevelopment,
    testing: data.testing,
    cybersecurity: data.cyberSecurity,
    softskills: data.softSkills,
    appdevelopment: data.appDevelopment,
    digitalmarketing:data.digitalMarketing
  };

  const selectedCourses = categoryMap[normalizedCategory];

  const formatCategory = (str) =>
    str
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const selectedCourse = courseId
    ? selectedCourses?.find((course) => {
      const slug = course.path.split("/").pop().toLowerCase();
      return slug === courseId;
    })
    : null;

  return (
    <>
      <div className="pt-12">

        {/* CATEGORY / LIST VIEW */}
        {!selectedCourse && (
          <>
            {/* HERO */}
            <section
              className="hero-section py-14 gradient-overlay relative"
              style={{
                background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
              }}
            >
              {/* bottom shape */}
              <div
                className="hero-bottom-shape-two"
                style={{
                  background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
                }}
              />

              {/* content */}
              <div className="relative max-w-4xl mx-auto px-4 text-center py-20">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {courseId
                    ? formatCategory(selectedCourse?.title)
                    : formatCategory(category)}
                </h1>
              </div>
            </section>


            {/* COURSES LIST */}
            <section className="services-section bg-slate-50 py-24">
              <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="flex justify-center">
                  <div className="max-w-2xl text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      We Provide Best Trainings
                    </h2>
                    <p className="mt-4 text-slate-600">
                      Efficiently aggregate end-to-end core competencies without
                      maintainable ideas. Dynamically foster tactical solutions
                      without enabled value.
                    </p>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedCourses?.map((course, index) => (
                    <div key={index} className="flex">
                      <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition w-full">
                        <img
                          src={course.img}
                          alt={course.title}
                          className="w-20 mx-auto mb-6"
                        />
                        <h5 className="font-semibold text-lg">
                          {course.title}
                        </h5>
                        <p className="mt-3 text-slate-600">
                          {course.description}
                        </p>
                        <Link
                          to={course.path}
                          className="inline-flex items-center gap-2 mt-6 text-indigo-600 font-medium hover:text-indigo-700"
                        >
                          Get More Info
                          <FaArrowRight className="text-sm" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>
          </>
        )}

        {/* COURSE DETAIL VIEW */}
        {selectedCourse && <CourseDetails />}
      </div>
    </>
  );
};

export default CourseDetail;

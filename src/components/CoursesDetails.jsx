import { useParams, Link } from "react-router-dom";
import data from "../data/data.json";
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
      <div className="main tw-pt-24">

        {/* CATEGORY / LIST VIEW */}
        {!selectedCourse && (
          <>
            {/* HERO */}
          <section
  className="hero-section  tw-py-12 gradient-overlay tw-relative"
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
  <div className="tw-relative tw-max-w-4xl tw-mx-auto tw-px-4 tw-text-center tw-py-20">
    <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white">
      {courseId
        ? formatCategory(selectedCourse?.title)
        : formatCategory(category)}
    </h1>
  </div>
</section>


            {/* COURSES LIST */}
            <section className="services-section tw-bg-slate-50 tw-py-24">
              <div className="tw-max-w-7xl tw-mx-auto tw-px-4">

                {/* Section Header */}
                <div className="tw-flex tw-justify-center">
                  <div className="tw-max-w-2xl tw-text-center tw-mb-16">
                    <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold">
                      We Provide Best Trainings
                    </h2>
                    <p className="tw-mt-4 tw-text-slate-600">
                      Efficiently aggregate end-to-end core competencies without
                      maintainable ideas. Dynamically foster tactical solutions
                      without enabled value.
                    </p>
                  </div>
                </div>

                {/* Grid */}
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
                  {selectedCourses?.map((course, index) => (
                    <div key={index} className="tw-flex">
                      <div className="tw-bg-white tw-text-center tw-p-8 tw-rounded-2xl tw-shadow-sm hover:tw-shadow-xl tw-transition tw-w-full">
                        <img
                          src={course.img}
                          alt={course.title}
                          className="tw-w-20 tw-mx-auto tw-mb-6"
                        />
                        <h5 className="tw-font-semibold tw-text-lg">
                          {course.title}
                        </h5>
                        <p className="tw-mt-3 tw-text-slate-600">
                          {course.description}
                        </p>
                        <Link
                          to={course.path}
                          className="tw-inline-flex tw-items-center tw-gap-2 tw-mt-6 tw-text-indigo-600 tw-font-medium hover:tw-text-indigo-700"
                        >
                          Get More Info
                          <FaArrowRight className="tw-text-sm" />
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

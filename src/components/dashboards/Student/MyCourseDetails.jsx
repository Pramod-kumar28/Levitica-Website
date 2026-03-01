import {
  FaBook,
  FaClock,
  FaLayerGroup,
  FaCheckCircle,
  FaPlayCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaGift,
  FaMedal,
  FaChartLine,
  FaCertificate,
  FaRocket,
  FaListUl,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStudentEnrolledCoursedetailsQuery } from "../../../Services/student/enrollFormServices";

const StudentEnrolledCourseDetails = () => {
  const { courseId } = useParams();
  const { data, isLoading } =
    useGetStudentEnrolledCoursedetailsQuery(courseId);
  
  const [expandedModules, setExpandedModules] = useState([]);

  if (isLoading)
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-text-center">
          <div className="tw-w-12 tw-h-12 tw-border-4 tw-border-blue-200 tw-border-t-blue-600 tw-rounded-full tw-animate-spin tw-mx-auto tw-mb-4"></div>
          <p className="tw-text-gray-600">Loading your course...</p>
        </div>
      </div>
    );

  const enrollment = data?.data;
  if (!enrollment) return null;

  const {
    course,
    batch,
    payment,
    enrolledAt,
    liveClasses,
  } = enrollment;

  const isFreeBonus = !payment || payment?.status === "free";

  // Toggle module expansion
  const toggleModule = (index) => {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Sample soft skills content (in real app, this would come from API)
  const softSkillsContent = [
    {
      title: "Communication Skills",
      description: "Master effective communication in technical environments",
      icon: <FaUsers className="tw-text-purple-500" />,
    },
    {
      title: "Team Collaboration",
      description: "Learn agile practices and team coordination",
      icon: <FaUsers className="tw-text-blue-500" />,
    },
    {
      title: "Problem Solving",
      description: "Develop analytical thinking and solution-oriented approach",
      icon: <FaChartLine className="tw-text-green-500" />,
    },
    {
      title: "Interview Preparation",
      description: "Mock interviews and resume building workshops",
      icon: <FaMedal className="tw-text-orange-500" />,
    },
  ];

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-px-1 tw-py-3 sm:tw-px-4 sm:tw-py-6 lg:tw-px-6 tw-space-y-4 sm:tw-space-y-6">

      {/* ================= COURSE HEADER ================= */}
      <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-md tw-overflow-hidden">
        <div className="md:tw-grid md:tw-grid-cols-3">
          {/* Image - smaller height on mobile */}
          <div className="md:tw-col-span-1">
            <img
              src={course?.thumbnail}
              alt={course?.name}
              className="tw-w-full tw-h-48 sm:tw-h-56 md:tw-h-full tw-object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:tw-col-span-2 tw-p-4 sm:tw-p-6">
            <div className="tw-space-y-3 sm:tw-space-y-4">
              {/* Title */}
              <h1 className="tw-text-base sm:tw-text-lg md:tw-text-2xl tw-font-bold tw-flex tw-items-center tw-gap-2">
                <FaBook className="tw-text-blue-600 tw-text-sm sm:tw-text-base" />
                <span className="tw-line-clamp-2">{course?.name}</span>
              </h1>

              {/* Description - hidden on smallest mobile if needed */}
              <p className="tw-text-xs sm:tw-text-sm tw-text-gray-600 tw-line-clamp-2 sm:tw-line-clamp-3">
                {course?.shortdescription}
              </p>

              {/* Meta chips - stacked on mobile, row on larger */}
              <div className="tw-flex tw-flex-wrap tw-gap-2 sm:tw-gap-4">
                <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-xs sm:tw-text-sm tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded-full">
                  <FaLayerGroup className="tw-text-gray-600" />
                  {course?.category}
                </span>

                <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-xs sm:tw-text-sm tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded-full">
                  <FaClock className="tw-text-gray-600" />
                  {course?.duration}
                </span>

                <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-xs sm:tw-text-sm tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded-full">
                  <FaMoneyBillWave className="tw-text-gray-600" />
                  {isFreeBonus ? "Free Bonus" : `₹${payment?.amountInRupees}`}
                </span>
              </div>

              {/* Status + Enrollment - stacked on mobile */}
              <div className="tw-flex tw-flex-col xs:tw-flex-row xs:tw-items-center tw-gap-2 xs:tw-gap-4">
                <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-xs sm:tw-text-sm tw-text-blue-600">
                  <FaPlayCircle />
                  In Progress
                </span>
                <span className="tw-text-xs tw-text-gray-500">
                  Enrolled on {new Date(enrolledAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COURSE OBJECTIVES ================= */}
      {course?.details?.objectives && course.details.objectives.length > 0 && (
        <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
          <h2 className="tw-text-base sm:tw-text-xl tw-font-semibold tw-mb-3 tw-flex tw-items-center tw-gap-2">
            <FaRocket className="tw-text-purple-600" />
            What You'll Learn
          </h2>
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-2">
            {course.details.objectives.map((objective, index) => (
              <div key={index} className="tw-flex tw-items-start tw-gap-2 tw-text-sm sm:tw-text-base">
                <FaCheck className="tw-text-green-500 tw-mt-0.5 tw-flex-shrink-0" />
                <span className="tw-text-gray-700">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= COURSE REQUIREMENTS ================= */}
      {course?.details?.requirements && course.details.requirements.length > 0 && (
        <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
          <h2 className="tw-text-base sm:tw-text-xl tw-font-semibold tw-mb-3 tw-flex tw-items-center tw-gap-2">
            <FaListUl className="tw-text-orange-600" />
            Prerequisites
          </h2>
          <ul className="tw-space-y-1.5">
            {course.details.requirements.map((requirement, index) => (
              <li key={index} className="tw-flex tw-items-start tw-gap-2 tw-text-sm sm:tw-text-base">
                <span className="tw-text-orange-500 tw-mt-0.5">•</span>
                <span className="tw-text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= COURSE DESCRIPTION ================= */}
      <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
        <h2 className="tw-text-base sm:tw-text-xl tw-font-semibold tw-mb-3 tw-flex tw-items-center tw-gap-2">
          <FaBook className="tw-text-blue-600" />
          Course Overview
        </h2>
        <p className="tw-text-sm sm:tw-text-base tw-text-gray-700 tw-leading-relaxed whitespace-pre-line">
          {course?.details?.description}
        </p>
      </div>

      {/* ================= CURRICULUM ================= */}
      {course?.details?.curriculum && course.details.curriculum.length > 0 && (
        <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
          <h2 className="tw-text-base sm:tw-text-xl tw-font-semibold tw-mb-3 tw-flex tw-items-center tw-gap-2">
            <FaBook className="tw-text-indigo-600" />
            Course Curriculum
          </h2>
          <div className="tw-space-y-2">
            {course.details.curriculum.map((module, moduleIndex) => (
              <div key={module._id} className="tw-border tw-rounded-lg tw-overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="tw-w-full tw-px-3 tw-py-2.5 sm:tw-px-4 sm:tw-py-3 tw-flex tw-items-center tw-justify-between tw-bg-gray-50 hover:tw-bg-gray-100 tw-transition-colors"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span className="tw-text-xs sm:tw-text-sm tw-font-medium tw-text-gray-700">
                      Module {moduleIndex + 1}
                    </span>
                    <span className="tw-text-xs sm:tw-text-sm tw-font-semibold tw-text-gray-800">
                      {module.title}
                    </span>
                  </div>
                  <span className="tw-text-gray-500">
                    {expandedModules.includes(moduleIndex) ? (
                      <FaChevronUp className="tw-text-xs" />
                    ) : (
                      <FaChevronDown className="tw-text-xs" />
                    )}
                  </span>
                </button>

                {/* Module Sessions */}
                {expandedModules.includes(moduleIndex) && (
                  <div className="tw-px-3 tw-py-2 sm:tw-px-4 sm:tw-py-3 tw-space-y-1.5">
                    {module.sessions.map((session, sessionIndex) => (
                      <div
                        key={session._id}
                        className="tw-flex tw-items-center tw-gap-2 tw-text-xs sm:tw-text-sm tw-text-gray-600"
                      >
                        <div className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-400"></div>
                        <span>{session.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BATCH INFO ================= */}
      <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
        <h2 className="tw-text-base sm:tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2 tw-mb-3">
          <FaUsers className="tw-text-indigo-600" />
          Batch Information
        </h2>

        {batch ? (
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-4 tw-gap-3 sm:tw-gap-4">
            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Batch Name</p>
              <p className="tw-text-base sm:tw-text-md tw-font-medium tw-truncate">{batch.batchName}</p>
            </div>

            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Status</p>
              <p className="tw-text-base sm:tw-text-md tw-font-medium tw-capitalize">{batch.status}</p>
            </div>

            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Start Date</p>
              <p className="tw-text-base sm:tw-text-md">{batch.startDate ? new Date(batch.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA"}</p>
            </div>

            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">End Date</p>
              <p className="tw-text-base sm:tw-text-md">{batch.endDate ? new Date(batch.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA"}</p>
            </div>
          </div>
        ) : (
          <div className="tw-bg-amber-50 tw-text-amber-700 tw-text-xs sm:tw-text-sm tw-p-3 tw-rounded-lg">
            Batch not assigned yet. You will receive notification once assigned.
          </div>
        )}
      </div>

      {/* ================= LIVE CLASSES ================= */}
      <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
        <h2 className="tw-text-base sm:tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2 tw-mb-3">
          <FaCalendarAlt className="tw-text-green-600" />
          Live Classes
        </h2>

        {liveClasses?.length > 0 ? (
          <div className="tw-space-y-2">
            {liveClasses.map((cls) => (
              <div
                key={cls._id}
                className="tw-border tw-rounded-lg tw-p-2 tw-flex tw-flex-col xs:tw-flex-row tw-justify-between tw-items-start xs:tw-items-center tw-gap-3.5"
              >
                <div className="tw-flex-1 tw-min-w-0 tw-space-y-1">
                  <p className="tw-text-base sm:tw-text-lg tw-font-medium ">{cls.title}</p>
                  <p className="tw-text-sm tw-text-gray-700">
                    {new Date(cls.startTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="tw-text-xs  tw-text-gray-700 tw-capitalize">
                    Status: {cls.status}
                  </p>
                </div>

                {cls.status !== "completed" && (
                  <a
                    href={cls.zoomJoinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-bg-blue-600 hover:tw-text-white  tw-text-white tw-text-xs tw-px-4 tw-py-3 tw-rounded-lg hover:tw-bg-blue-700 tw-transition-colors tw-w-full xs:tw-w-auto tw-text-center"
                  >
                    Join
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="tw-bg-gray-50 tw-text-gray-600 tw-text-xs sm:tw-text-sm tw-p-3 tw-rounded-lg">
            No live classes scheduled yet.
          </div>
        )}
      </div>

      {/* ================= SOFT SKILLS BONUS SECTION ================= */}
      <div className="tw-bg-gradient-to-br tw-from-purple-50 tw-to-pink-50 tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6 tw-border tw-border-purple-100">
        {/* Header */}
        <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-p-2 tw-bg-gradient-to-br tw-from-purple-500 tw-to-pink-500 tw-rounded-lg">
              <FaGift className="tw-text-white tw-text-sm" />
            </div>
            <div>
              <div className="tw-text-sm sm:tw-text-lg tw-font-semibold tw-text-gray-800">
                Exclusive Soft Skills Training
              </div>
              <p className="tw-text-xs tw-text-gray-600">
                Free bonus with your technical course
              </p>
            </div>
          </div>
          <span className="tw-bg-green-100 tw-text-green-700 tw-text-xs tw-font-medium tw-px-2 tw-py-1 tw-rounded-full">
            Complimentary
          </span>
        </div>

        {/* Content Grid */}
        <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-3 tw-mb-4">
          {softSkillsContent.map((skill, index) => (
            <div
              key={index}
              className="tw-bg-white tw-p-3 tw-rounded-xl tw-border tw-border-gray-100 hover:tw-border-purple-200 tw-transition-colors"
            >
              <div className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-2">
                <div className="tw-p-2 tw-bg-gray-50 tw-rounded-full">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="tw-text-sm tw-font-medium tw-text-gray-800 tw-line-clamp-1">
                    {skill.title}
                  </h3>
                  <p className="tw-text-xs tw-text-gray-500 tw-mt-1 tw-line-clamp-2">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-mt-3 tw-pt-3 tw-border-t tw-border-gray-200">
          <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-text-gray-600">
            <FaCertificate className="tw-text-purple-500" />
            <span>Certificate included</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-text-gray-600">
            <FaRocket className="tw-text-purple-500" />
            <span>Career booster</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-text-gray-600">
            <FaUsers className="tw-text-purple-500" />
            <span>Group workshops</span>
          </div>
        </div>

      </div>

      {/* ================= PAYMENT INFO ================= */}
      {payment && (
        <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6">
          <h2 className="tw-text-base sm:tw-text-lg tw-font-semibold tw-mb-3">
            Payment Details
          </h2>

          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-4 tw-gap-3">
            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Status</p>
              <p className="tw-text-sm sm:tw-text-base tw-font-medium tw-capitalize">{payment.status}</p>
            </div>

            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Amount</p>
              <p className="tw-text-sm sm:tw-text-base tw-font-medium">₹{payment.amountInRupees}</p>
            </div>

            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Mode</p>
              <p className="tw-text-sm sm:tw-text-base tw-font-medium tw-capitalize">{payment.paymentMode || 'N/A'}</p>
            </div>

            <div className="tw-bg-gray-50 tw-p-2 tw-rounded-lg">
              <p className="tw-text-sm tw-text-gray-500">Paid On</p>
              <p className="tw-text-sm sm:tw-text-base">
                {new Date(payment.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= BONUS BANNER ================= */}
      {isFreeBonus && (
        <div className="tw-bg-gradient-to-r tw-from-emerald-500 tw-to-green-600 tw-text-white tw-rounded-xl sm:tw-rounded-2xl tw-p-4 tw-shadow-md">
          <div className="tw-flex tw-items-center tw-gap-2">
            <FaGift className="tw-text-xl" />
            <div>
              <p className="tw-font-semibold tw-text-xs sm:tw-text-sm">
                🎁 This course was provided as a complimentary bonus.
              </p>
              <p className="tw-text-xs tw-text-emerald-100 tw-mt-1">
                Enjoy learning at no cost!
              </p>
            </div>
          </div>
        </div>
      )}  
    </div>
  );
};

export default StudentEnrolledCourseDetails;
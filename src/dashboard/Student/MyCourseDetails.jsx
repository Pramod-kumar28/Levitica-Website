import {
  FaBook,
  FaClock,
  FaLayerGroup,
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
import { useGetStudentEnrolledCoursedetailsQuery } from '@/Services/student/enrollFormServices';

const StudentEnrolledCourseDetails = () => {
  const { courseId } = useParams();
  const { data, isLoading } =
    useGetStudentEnrolledCoursedetailsQuery(courseId);
    
  
  const [expandedModules, setExpandedModules] = useState([]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your course...</p>
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
      icon: <FaUsers className="text-purple-500" />,
    },
    {
      title: "Team Collaboration",
      description: "Learn agile practices and team coordination",
      icon: <FaUsers className="text-blue-500" />,
    },
    {
      title: "Problem Solving",
      description: "Develop analytical thinking and solution-oriented approach",
      icon: <FaChartLine className="text-green-500" />,
    },
    {
      title: "Interview Preparation",
      description: "Mock interviews and resume building workshops",
      icon: <FaMedal className="text-orange-500" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-1 py-3 sm:px-4 sm:py-6 lg:px-6 space-y-4 sm:space-y-6">

      {/* ================= COURSE HEADER ================= */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
        <div className="md:grid md:grid-cols-3">
          {/* Image - smaller height on mobile */}
          <div className="md:col-span-1">
            <img
              src={course?.thumbnail}
              alt={course?.name}
              className="w-full h-48 sm:h-56 md:h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2 p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Title */}
              <h1 className="text-base sm:text-lg md:text-2xl font-bold flex items-center gap-2">
                <FaBook className="text-blue-600 text-sm sm:text-base" />
                <span className="line-clamp-2">{course?.name}</span>
              </h1>

              {/* Description - hidden on smallest mobile if needed */}
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
                {course?.shortdescription}
              </p>

              {/* Meta chips - stacked on mobile, row on larger */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded-full">
                  <FaLayerGroup className="text-gray-600" />
                  {course?.category}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded-full">
                  <FaClock className="text-gray-600" />
                  {course?.duration}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded-full">
                  <FaMoneyBillWave className="text-gray-600" />
                  {isFreeBonus ? "Free Bonus" : `₹${payment?.amountInRupees}`}
                </span>
              </div>

              {/* Status + Enrollment - stacked on mobile */}
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600">
                  <FaPlayCircle />
                  In Progress
                </span>
                <span className="text-xs text-gray-500">
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
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-xl font-semibold mb-3 flex items-center gap-2">
            <FaRocket className="text-purple-600" />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {course.details.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-2 text-sm sm:text-base">
                <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= COURSE REQUIREMENTS ================= */}
      {course?.details?.requirements && course.details.requirements.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-xl font-semibold mb-3 flex items-center gap-2">
            <FaListUl className="text-orange-600" />
            Prerequisites
          </h2>
          <ul className="space-y-1.5">
            {course.details.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                <span className="text-orange-500 mt-0.5">•</span>
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= COURSE DESCRIPTION ================= */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 flex items-center gap-2">
          <FaBook className="text-blue-600" />
          Course Overview
        </h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
          {course?.details?.description}
        </p>
      </div>

      {/* ================= CURRICULUM ================= */}
      {course?.details?.curriculum && course.details.curriculum.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-xl font-semibold mb-3 flex items-center gap-2">
            <FaBook className="text-indigo-600" />
            Course Curriculum
          </h2>
          <div className="space-y-2">
            {course.details.curriculum.map((module, moduleIndex) => (
              <div key={module._id} className="border rounded-lg overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      Module {moduleIndex + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      {module.title}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {expandedModules.includes(moduleIndex) ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </span>
                </button>

                {/* Module Sessions */}
                {expandedModules.includes(moduleIndex) && (
                  <div className="px-3 py-2 sm:px-4 sm:py-3 space-y-1.5">
                    {module.sessions.map((session, sessionIndex) => (
                      <div
                        key={session._id}
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
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
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold flex items-center gap-2 mb-3">
          <FaUsers className="text-indigo-600" />
          Batch Information
        </h2>

        {batch ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Batch Name</p>
              <p className="text-base sm:text-md font-medium truncate">{batch.batchName}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-base sm:text-md font-medium capitalize">{batch.status}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="text-base sm:text-md">{batch.startDate ? new Date(batch.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA"}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">End Date</p>
              <p className="text-base sm:text-md">{batch.endDate ? new Date(batch.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBA"}</p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 text-amber-700 text-xs sm:text-sm p-3 rounded-lg">
            Batch not assigned yet. You will receive notification once assigned.
          </div>
        )}
      </div>

      {/* ================= LIVE CLASSES ================= */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold flex items-center gap-2 mb-3">
          <FaCalendarAlt className="text-green-600" />
          Live Classes
        </h2>

        {liveClasses?.length > 0 ? (
          <div className="space-y-2">
            {liveClasses.map((cls) => (
              <div
                key={cls._id}
                className="border rounded-lg p-2 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3.5"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-base sm:text-lg font-medium ">{cls.title}</p>
                  <p className="text-sm text-gray-700">
                    {new Date(cls.startTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-xs  text-gray-700 capitalize">
                    Status: {cls.status}
                  </p>
                </div>

                {cls.status !== "completed" && (
                  <a
                    href={cls.zoomJoinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:text-white  text-white text-xs px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full xs:w-auto text-center"
                  >
                    Join
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 text-gray-600 text-xs sm:text-sm p-3 rounded-lg">
            No live classes scheduled yet.
          </div>
        )}
      </div>

      {/* ================= SOFT SKILLS BONUS SECTION ================= */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-purple-100">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <FaGift className="text-white text-sm" />
            </div>
            <div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800">
                Exclusive Soft Skills Training
              </div>
              <p className="text-xs text-gray-600">
                Free bonus with your technical course
              </p>
            </div>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
            Complimentary
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {softSkillsContent.map((skill, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-2 bg-gray-50 rounded-full">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FaCertificate className="text-purple-500" />
            <span>Certificate included</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FaRocket className="text-purple-500" />
            <span>Career booster</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FaUsers className="text-purple-500" />
            <span>Group workshops</span>
          </div>
        </div>

      </div>

      {/* ================= PAYMENT INFO ================= */}
      {payment && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Payment Details
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-sm sm:text-base font-medium capitalize">{payment.status}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-sm sm:text-base font-medium">₹{payment.amountInRupees}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Mode</p>
              <p className="text-sm sm:text-base font-medium capitalize">{payment.paymentMode || 'N/A'}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Paid On</p>
              <p className="text-sm sm:text-base">
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
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2">
            <FaGift className="text-xl" />
            <div>
              <p className="font-semibold text-xs sm:text-sm">
                🎁 This course was provided as a complimentary bonus.
              </p>
              <p className="text-xs text-emerald-100 mt-1">
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

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
  FaMicrophone,
  FaComments,
  FaUserTie,
  FaBrain,
} from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useGetStudentEnrolledCoursedetailsQuery } from "../../../Services/student/enrollFormServices";

const StudentEnrolledCourseDetails = () => {
  const { courseId } = useParams();
  const { data, isLoading } =
    useGetStudentEnrolledCoursedetailsQuery(courseId);

  if (isLoading)
    return (
      <div className="tw-text-center tw-mt-10 tw-text-gray-500">
        Loading course...
      </div>
    );

  const enrollment = data?.data;
  if (!enrollment) return null;

  const {
    course,
    batch,
    paymentId,
    completed,
  
    liveClasses,
  } = enrollment;

  const nextClass = liveClasses?.[0];

  const isFreeBonus =
    paymentId?.status === "free" || !paymentId;

  return (
    <div className="tw-max-w-6xl tw-mx-auto tw-p-6 tw-space-y-6">

    
      {/* ===== COURSE HEADER ===== */}
      <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-overflow-hidden tw-flex tw-flex-col md:tw-flex-row">
        <img
          src={course?.thumbnail}
          alt={course?.name}
          className="tw-w-full md:tw-w-1/3 tw-h-64 tw-object-cover"
        />

        <div className="tw-p-6 tw-flex-1 tw-space-y-4">
          <h1 className="tw-text-2xl tw-font-bold tw-flex tw-items-center tw-gap-2">
            <FaBook /> {course?.name}
          </h1>

          <p className="tw-text-gray-600">
            {course?.shortdescription}
          </p>

          <div className="tw-flex tw-flex-wrap tw-gap-4 tw-text-sm tw-text-gray-600">
            <span className="tw-flex tw-items-center tw-gap-2">
              <FaLayerGroup /> {course?.category}
            </span>

            <span className="tw-flex tw-items-center tw-gap-2">
              <FaClock /> {course?.duration}
            </span>

            <span className="tw-flex tw-items-center tw-gap-2">
              <MdOutlineWorkspacePremium />
              {isFreeBonus
                ? "Free Bonus Course"
                : `₹${paymentId?.amountInRupees}`}
            </span>
          </div>

        

          {/* Status */}
          <div>
            {completed ? (
              <span className="tw-text-green-600 tw-flex tw-items-center tw-gap-2">
                <FaCheckCircle /> Completed
              </span>
            ) : (
              <span className="tw-text-blue-600 tw-flex tw-items-center tw-gap-2">
                <FaPlayCircle /> In Progress
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 🧠 SOFT SKILLS EXPLANATION */}
      {isFreeBonus && (
        <div className="tw-bg-white tw-rounded-2xl tw-shadow tw-p-6 tw-space-y-4">
          <h2 className="tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
            <FaBrain /> What You Will Learn in Soft Skills
          </h2>

          <div className="tw-grid md:tw-grid-cols-2 tw-gap-4">

            <div className="tw-flex tw-gap-3">
              <FaComments className="tw-text-blue-600 tw-text-xl" />
              <div>
                <h4 className="tw-font-semibold">Communication Skills</h4>
                <p className="tw-text-sm tw-text-gray-600">
                  Learn professional communication, clarity in speaking, and corporate etiquette.
                </p>
              </div>
            </div>

            <div className="tw-flex tw-gap-3">
              <FaUserTie className="tw-text-green-600 tw-text-xl" />
              <div>
                <h4 className="tw-font-semibold">Mock Interviews</h4>
                <p className="tw-text-sm tw-text-gray-600">
                  Real-time interview simulations to boost confidence and crack HR & technical rounds.
                </p>
              </div>
            </div>

            <div className="tw-flex tw-gap-3">
              <FaMicrophone className="tw-text-purple-600 tw-text-xl" />
              <div>
                <h4 className="tw-font-semibold">Public Speaking</h4>
                <p className="tw-text-sm tw-text-gray-600">
                  Overcome stage fear and improve articulation & presentation skills.
                </p>
              </div>
            </div>

            <div className="tw-flex tw-gap-3">
              <FaBrain className="tw-text-orange-600 tw-text-xl" />
              <div>
                <h4 className="tw-font-semibold">Vocabulary & Confidence</h4>
                <p className="tw-text-sm tw-text-gray-600">
                  Build strong vocabulary, structured thinking, and professional confidence.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
        {/* 🎁 FREE BONUS BANNER */}
      {isFreeBonus && (
        <div className="tw-bg-gradient-to-r tw-from-green-500 tw-to-emerald-600 tw-text-white tw-rounded-2xl tw-p-4 tw-flex tw-items-center tw-gap-3 tw-shadow-lg">
          <FaGift className="tw-text-2xl" />
          <div>
            <h3 className="tw-font-bold tw-text-white">
              FREE Soft Skill Course
            </h3>
            <p className="tw-text-sm">
              You received this Soft Skills course as a complimentary bonus with your purchase.
            </p>
          </div>
        </div>
      )}


      {/* ===== NEXT LIVE CLASS ===== */}
      {nextClass && (
        <div className="tw-bg-white tw-rounded-2xl tw-shadow tw-p-6">
          <h2 className="tw-text-lg tw-font-semibold tw-flex tw-items-center tw-gap-2 tw-mb-3">
            <FaCalendarAlt /> Upcoming Live Class
          </h2>

          <div className="tw-flex tw-justify-between tw-items-center">
            <div>
              <p className="tw-font-semibold">
                {nextClass.title}
              </p>
              <p className="tw-text-sm tw-text-gray-600">
                {new Date(nextClass.startTime).toLocaleString()}
              </p>
            </div>

            <a
              href={nextClass.zoomJoinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm hover:tw-bg-blue-700"
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEnrolledCourseDetails;

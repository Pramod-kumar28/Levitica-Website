import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  FiEdit,
  FiShoppingCart,
  FiClock,
  FiTag,
  FiCheckCircle,
  FiVideo,
  FiAward,
  FiImage,
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiTarget,
  FiUsers,
  FiStar,
  FiCalendar,
  FiDownload,
  FiShare2,
  FiBookmark,
  FiPlayCircle,
  FiFileText,
  FiMessageCircle,
  FiBarChart2,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAddItemMutation } from '../../../Services/student/cartServices';
import {
  useGetCourseByIdQuery,
} from "../../../Services/sharedServices/courses.Services";
import { MODAL_TYPES, useModal } from "../Admin/Modals/ModalContext";
import { addItemToCart } from "../../../features/cartSlice";
import RelatedCourses from "./RelatedCourses";

const CommonCourseDetails = () => {
  const { id } = useParams();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data, isLoading } = useGetCourseByIdQuery(id);
  const course = data?.data;

  const role = useSelector((state) => state.auth.user?.role);
  const userId = useSelector((state) => state.auth.user?.id);

  const [addItem] = useAddItemMutation();

  const handleAdd = async () => {
    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await addItem({ userId, courseId: course._id }).unwrap();
      dispatch(addItemToCart(course));
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleEdit = () => {
    openModal(MODAL_TYPES.EDIT_COURSE_DETAILS, {
      courseId: course._id,
      initialData: details,
    });
  };

  const toggleWeek = (weekIndex) => {
    setExpandedWeeks(prev =>
      prev.includes(weekIndex)
        ? prev.filter(i => i !== weekIndex)
        : [...prev, weekIndex]
    );
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-relative">
          <div className="tw-w-16 tw-h-16 tw-border-4 tw-border-blue-200 tw-border-t-blue-600 tw-rounded-full tw-animate-spin"></div>
          <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
            <div className="tw-w-8 tw-h-8 tw-bg-blue-600 tw-rounded-full tw-animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-text-center tw-space-y-4">
          <div className="tw-text-6xl">😕</div>
          <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900">Course Not Found</h2>
          <p className="tw-text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const details = course.details || {};
  const totalSessions = details.curriculum?.reduce((acc, week) => acc + (week.sessions?.length || 0), 0) || 0;
  const totalHours = details.curriculum?.reduce((acc, week) => acc + (parseInt(week.duration) || 2), 0) || 0;

  return (
    <div >


      <div className="tw-relative tw-max-w-7xl tw-mx-auto">
        <div className="tw-grid lg:tw-grid-cols-3 tw-gap-8 tw-items-start">
          {/* Left Content */}
          <div className="lg:tw-col-span-2 md:tw-space-y-6 tw-space-y-3">


            {/* Title */}
            <h1 className="tw-text-3xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-leading-tight">
              {course.name}
            </h1>

            {/* Description Preview */}
            <p className="tw-text-lg tw-leading-relaxed tw-line-clamp-2">
              {course?.shortdescription || "An comprehensive course designed to take you from beginner to expert."}
            </p>

            {/* Tags & Meta */}
            <div className="tw-flex tw-flex-wrap tw-gap-3">
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-px-4 tw-py-1.5 tw-bg-white/10 tw-backdrop-blur-sm tw-rounded-full tw-text-sm tw-font-medium tw-border tw-border-white/20">
                <FiTag size={16} /> {course.category}
              </span>
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-px-4 tw-py-1.5 tw-bg-white/10 tw-backdrop-blur-sm tw-rounded-full tw-text-sm tw-font-medium tw-border tw-border-white/20">
                <FiClock size={16} /> {course.duration}
              </span>

            </div>

            {/* Price / Offer Section */}
            <div className=" tw-border-t">
              {Number(course.price) === 0 ? (
                <div className="tw-space-y-2 tw-bg-green-50 tw-p-4 tw-border tw-border-green-200 tw-rounded-xl">
                  <span className="tw-text-xl tw-font-bold tw-text-green-600">
                    🎉 Free Course
                  </span>

                  <p className="tw-text-md tw-text-gray-600">
                    This course is completely free when you enroll in or purchase any
                    other paid course.
                  </p>

                  <p className="tw-text-base tw-text-gray-500">

                    • No additional charges
                  </p>
                </div>
              ) : (
                <div className="tw-bg-gray-50 tw-p-4 tw-border tw-rounded-xl">
                  <h3 className="tw-text-lg tw-font-semibold tw-mb-4">
                    What’s Included
                  </h3>

                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-5">

                    {/* Live Classes */}
                    <div className="tw-flex tw-items-start tw-gap-3">
                      <div className="tw-flex-shrink-0 tw-bg-blue-100 tw-text-blue-600 tw-p-2 sm:tw-p-3 tw-rounded-lg">
                        <FiVideo className="tw-text-base sm:tw-text-lg" />
                      </div>

                      <div className="tw-leading-tight">
                        <p className="tw-text-sm sm:tw-text-base tw-font-semibold tw-m-0">
                          Live Interactive Classes
                        </p>
                        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-600 tw-m-0">
                          Attend real-time sessions with expert mentors.
                        </p>
                      </div>
                    </div>

                    {/* Soft Skills Free */}
                    <div className="tw-flex tw-items-start tw-gap-3">
                      <div className="tw-flex-shrink-0 tw-bg-green-100 tw-text-green-600 tw-p-2 sm:tw-p-3 tw-rounded-lg">
                        <FiAward className="tw-text-base sm:tw-text-lg" />
                      </div>

                      <div className="tw-leading-tight">
                        <p className="tw-text-sm sm:tw-text-base tw-font-semibold tw-m-0">
                          Free Soft Skills Course
                        </p>
                        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-600 tw-m-0">
                          Communication, interview prep & personality development included.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>


          </div>

          {/* Right - Price Card in Hero */}
          <div className="lg:tw-mt-0">
            <div className="tw-bg-white tw-rounded-2xl tw-shadow-2xl tw-overflow-hidden tw-sticky tw-top-24">
              {/* Thumbnail */}
              <div className="tw-relative tw-h-48 tw-bg-gradient-to-br tw-from-gray-900 tw-to-gray-800">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                ) : (
                  <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
                    <FiImage size={48} className="tw-text-gray-500" />
                  </div>
                )}
                {/* Play Button Overlay */}
                <button className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/20 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                  <div className="tw-w-16 tw-h-16 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center">
                    <FiPlayCircle className="tw-w-8 tw-h-8 tw-text-blue-600" />
                  </div>
                </button>
              </div>

              {/* Price Details */}
              <div className="tw-p-6">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                  <span className="tw-text-sm tw-font-medium tw-text-gray-500">Course Price</span>
                  {Number(course.price) > 0 && (
                    <span className="tw-text-xs tw-bg-green-100 tw-text-green-700 tw-px-2 tw-py-1 tw-rounded-full">
                      Includes GST
                    </span>
                  )}
                </div>

                <div className="tw-flex tw-items-baseline tw-gap-2 tw-mb-4">
                  {Number(course.price) === 0 ? (
                    <>
                      <span className="tw-text-4xl tw-font-bold tw-text-green-600">Free</span>
                      <span className="tw-text-sm tw-text-gray-500">• No payment required</span>
                    </>
                  ) : (
                    <>
                      <span className="tw-text-4xl tw-font-bold tw-text-gray-900">
                        ₹{Number(course.price).toLocaleString('en-IN')}
                      </span>
                      <span className="tw-text-sm tw-text-gray-500">+ taxes</span>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="tw-space-y-3">
                  {role === "admin" ? (
                    <button
                      onClick={handleEdit}
                      className="tw-w-full tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-6 tw-py-3 tw-bg-blue-600 tw-text-white tw-rounded-xl hover:tw-bg-blue-700 tw-transition-colors tw-duration-200 tw-font-medium"
                    >
                      <FiEdit size={18} /> Edit Course Details
                    </button>
                  ) : (
                    <>


                      <div className="tw-flex tw-gap-2">
                        <button
                          onClick={handleAdd}
                          className="tw-w-full tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-6 tw-py-3 tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-700 tw-text-white tw-rounded-xl hover:tw-from-blue-700 hover:tw-to-blue-800 tw-transition-all tw-duration-200 tw-font-medium tw-shadow-lg hover:tw-shadow-xl"
                        >
                          <FiShoppingCart size={18} /> Add to Cart
                        </button>

                        <button
                          onClick={handleShare}
                          className="tw-flex-1 tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-3 tw-border tw-border-gray-200 tw-rounded-xl hover:tw-border-blue-200 hover:tw-bg-blue-50 tw-text-gray-600 hover:tw-text-blue-600 tw-transition-all tw-duration-200"
                        >
                          <FiShare2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="tw-max-w-7xl tw-mx-auto  md:tw-space-y-8 tw-space-y-3 tw-mt-6">

        {/* Description */}
        {details?.description && (
          <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-gray-200 tw-p-6 md:tw-p-8 tw-shadow-sm">
            <h2 className="tw-font-bold tw-text-xl md:tw-text-2xl tw-text-gray-900 tw-mb-4">
              Course Description
            </h2>
            <p className="tw-text-gray-700  lg:tw-text-lg tw-text-sm">
              {details.description}
            </p>
          </div>
        )}

        {/* Objectives & Requirements */}
        <div className="tw-grid md:tw-grid-cols-2 tw-gap-4 md:tw-gap-6">
          {details?.objectives?.length > 0 && (
            <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-gray-200 tw-p-4 sm:tw-p-6 md:tw-p-8 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-6">
                <div className="tw-bg-green-100 tw-p-2.5 tw-rounded-xl">
                  <FiTarget className="tw-text-green-600" size={22} />
                </div>
                <h3 className="tw-font-semibold tw-text-base sm:tw-text-lg tw-text-gray-900">What you'll learn</h3>
              </div>
              <ul className="tw-space-y-3 sm:tw-space-y-4">
                {details.objectives.map((item, i) => (
                  <li
                    key={i}
                    className="tw-flex tw-items-start tw-gap-3 tw-group"
                  >
                    <FiCheckCircle className="tw-text-green-500 tw-mt-0.5 tw-flex-shrink-0 group-hover:tw-scale-110 tw-transition-transform" size={20} />
                    <span className="tw-text-gray-700 group-hover:tw-text-gray-900 tw-transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {details?.requirements?.length > 0 && (
            <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-gray-200 tw-p-6 md:tw-p-8 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-6">
                <div className="tw-bg-orange-100 tw-p-2.5 tw-rounded-xl">
                  <FiFileText className="tw-text-orange-600" size={22} />
                </div>
                <h3 className="tw-font-semibold tw-text-base sm:tw-text-lg tw-text-gray-900">Requirements</h3>
              </div>
              <ul className="tw-space-y-3 sm:tw-space-y-4">
                {details.requirements.map((req, i) => (
                  <li key={i} className="tw-flex tw-items-start tw-gap-3 tw-text-sm sm:tw-text-base tw-text-gray-700">
                    <span className="tw-w-1.5 tw-h-1.5 tw-bg-orange-500 tw-rounded-full tw-mt-2.5"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Curriculum */}
        {details?.curriculum?.length > 0 && (
          <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-gray-200 tw-p-4 sm:tw-p-6 md:tw-p-8 tw-shadow-sm">

            {/* Header */}
            <div className="tw-flex tw-items-start sm:tw-items-center tw-justify-between tw-flex-col sm:tw-flex-row tw-gap-4 tw-mb-6 sm:tw-mb-8">

              {/* Left */}
              <div className="tw-flex tw-items-center tw-gap-3">
                <div className="tw-bg-gradient-to-br tw-from-blue-600 tw-to-blue-700 tw-p-2.5 sm:tw-p-3 tw-rounded-xl tw-shadow-lg">
                  <FiBookOpen className="tw-text-white" size={20} />
                </div>

                <div>
                  <h2 className="tw-font-bold tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-text-gray-900">
                    Course Curriculum
                  </h2>
                  <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500">
                    {details.curriculum.length} weeks • {totalSessions} sessions • {totalHours}+ hours
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="tw-flex tw-gap-3 sm:tw-gap-4">
                <div className="tw-text-center tw-px-3 tw-py-1.5 sm:tw-px-4 sm:tw-py-2 tw-bg-blue-50 tw-rounded-xl">
                  <span className="tw-block tw-text-base sm:tw-text-xl tw-font-bold tw-text-blue-600">
                    {details.curriculum.length}
                  </span>
                  <span className="tw-text-[10px] sm:tw-text-xs tw-text-gray-600">
                    Weeks
                  </span>
                </div>

                <div className="tw-text-center tw-px-3 tw-py-1.5 sm:tw-px-4 sm:tw-py-2 tw-bg-green-50 tw-rounded-xl">
                  <span className="tw-block tw-text-base sm:tw-text-xl tw-font-bold tw-text-green-600">
                    {totalSessions}
                  </span>
                  <span className="tw-text-[10px] sm:tw-text-xs tw-text-gray-600">
                    Sessions
                  </span>
                </div>
              </div>
            </div>

            {/* Curriculum Timeline */}
            <div className="tw-space-y-3 sm:tw-space-y-4">
              {details.curriculum.map((week, w) => (
                <div
                  key={w}
                  className="tw-border tw-border-gray-200 tw-rounded-xl tw-overflow-hidden hover:tw-border-blue-200 tw-transition-colors"
                >

                  {/* Week Header */}
                  <div
                    onClick={() => toggleWeek(w)}
                    className="tw-p-3 sm:tw-p-4 md:tw-p-5 tw-bg-gradient-to-r tw-from-gray-50 tw-to-white tw-cursor-pointer hover:tw-from-blue-50/50 tw-transition-colors"
                  >
                    <div className="tw-flex tw-items-center tw-justify-between">

                      <div className="tw-flex tw-items-center tw-gap-3 sm:tw-gap-4">

                        {/* Week Number */}
                        <div className="tw-w-8 tw-h-8 sm:tw-w-10 sm:tw-h-10 tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 tw-rounded-lg sm:tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-white tw-text-sm sm:tw-text-base tw-font-bold tw-shadow-md">
                          {w + 1}
                        </div>

                        <div>
                          <h4 className="tw-font-semibold tw-text-gray-900 tw-text-sm sm:tw-text-base md:tw-text-lg">
                            {week.title}
                          </h4>
                          <p className="tw-text-[11px] sm:tw-text-sm tw-text-gray-500">
                            {week.sessions?.length || 0} sessions • {week.duration || "2-3 hours"}
                          </p>
                        </div>
                      </div>

                      <div className="tw-text-gray-400">
                        {expandedWeeks.includes(w) ? (
                          <FiChevronUp size={18} />
                        ) : (
                          <FiChevronDown size={18} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sessions */}
                  {expandedWeeks.includes(w) && (
                    <div className="tw-p-3 sm:tw-p-4 md:tw-p-5 tw-border-t tw-border-gray-100 tw-bg-white">

                      <div className="tw-grid tw-gap-2 sm:tw-gap-3">
                        {week.sessions.map((s, i) => (
                          <div
                            key={i}
                            className="tw-flex tw-items-start tw-gap-3 tw-p-2 sm:tw-p-3 tw-rounded-lg hover:tw-bg-gray-50 tw-transition-colors"
                          >

                            {/* Session Number */}
                            <div className="tw-w-7 tw-h-7 sm:tw-w-8 sm:tw-h-8 tw-bg-gray-100 tw-rounded-md sm:tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-text-xs sm:tw-text-sm tw-font-medium tw-text-gray-600">
                              {i + 1}
                            </div>

                            <div className="tw-flex-1">
                              <p className="tw-text-sm sm:tw-text-base tw-text-gray-900 tw-font-medium">
                                {s.title}
                              </p>

                              {(s.duration || s.type) && (
                                <p className="tw-text-[11px] sm:tw-text-sm tw-text-gray-500">
                                  {s.duration && `${s.duration} min`}
                                  {s.duration && s.type && " • "}
                                  {s.type}
                                </p>
                              )}
                            </div>

                            {s.isCompleted && (
                              <FiCheckCircle className="tw-text-green-500" size={16} />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Week Outcomes */}
                      {week.outcomes && week.outcomes.length > 0 && (
                        <div className="tw-mt-4 tw-pt-4 tw-border-t tw-border-dashed tw-border-gray-200">
                          <p className="tw-text-[10px] sm:tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider tw-mb-2 sm:tw-mb-3">
                            Week {w + 1} Outcomes
                          </p>

                          <div className="tw-flex tw-flex-wrap tw-gap-1.5 sm:tw-gap-2">
                            {week.outcomes.map((outcome, idx) => (
                              <span
                                key={idx}
                                className="tw-inline-flex tw-items-center tw-gap-1 tw-px-2 sm:tw-px-3 tw-py-0.5 sm:tw-py-1 tw-bg-blue-50 tw-text-blue-700 tw-rounded-full tw-text-[10px] sm:tw-text-xs tw-font-medium"
                              >
                                <FiTarget size={10} />
                                {outcome}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <RelatedCourses currentCourseId={course._id} />
      </div>
    </div>
  );
};

export default CommonCourseDetails;
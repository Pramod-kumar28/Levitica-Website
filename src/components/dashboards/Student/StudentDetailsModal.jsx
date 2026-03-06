import { Loader2, X, Mail, Phone, CheckCircle, BookOpen, Calendar, CreditCard } from "lucide-react";
import { useGetStudentEnrollmentsQuery } from "../../../Services/admin/assignService";

const StudentDetailsModal = ({ userId, handleClose }) => {
  const { data, isLoading, isError } = useGetStudentEnrollmentsQuery(userId);

  const student = data?.data?.user;
  const courses = data?.data?.enrolledCourses || [];

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="tw-min-h-[400px] tw-flex tw-items-center tw-justify-center">
        <div className="tw-text-center">
          <Loader2 className="tw-animate-spin tw-w-10 tw-h-10 tw-mx-auto tw-text-blue-600" />
          <p className="tw-mt-4 tw-text-gray-500">Loading student details...</p>
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <div className="tw-min-h-[400px] tw-flex tw-items-center tw-justify-center">
        <div className="tw-text-center tw-p-6">
          <div className="tw-w-16 tw-h-16 tw-mx-auto tw-bg-red-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <X className="tw-w-8 tw-h-8 tw-text-red-500" />
          </div>
          <p className="tw-mt-4 tw-text-red-600 tw-font-medium">Failed to load student details</p>
          <button 
            onClick={handleClose}
            className="tw-mt-4 tw-px-4 tw-py-2 tw-bg-gray-100 tw-rounded-lg tw-text-sm tw-text-gray-600 hover:tw-bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tw-max-h-[90vh] tw-overflow-y-auto">
      
      {/* ================= STICKY HEADER ================= */}
      <div className="tw-sticky tw-top-0 tw-bg-white tw-border-b tw-px-6 tw-py-4 tw-flex tw-items-center tw-justify-between tw-z-10">
        <div>
          <h2 className="tw-text-xl tw-font-semibold tw-text-gray-800">
            Student Profile
          </h2>
          <p className="tw-text-sm tw-text-gray-500">View detailed information and enrolled courses</p>
        </div>
        <button
          onClick={handleClose}
          className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="tw-text-gray-500" />
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="tw-p-6 tw-space-y-6">

        {/* ================= PROFILE CARD ================= */}
        <div className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-border tw-rounded-xl tw-p-6">
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-6 tw-items-start">
            
            {/* Avatar */}
            <div className="tw-relative">
              <img
                src={student?.profileImage?.url || "/default-avatar.png"}
                alt={student?.name}
                className="tw-w-24 tw-h-24 tw-rounded-full tw-object-cover tw-border-4 tw-border-white tw-shadow-lg"
              />
              {student?.emailVerified && (
                <div className="tw-absolute -tw-bottom-1 -tw-right-1 tw-bg-green-500 tw-rounded-full tw-p-1 tw-border-2 tw-border-white">
                  <CheckCircle className="tw-w-4 tw-h-4 tw-text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="tw-flex-1 tw-space-y-3">
              <div>
                <h3 className="tw-text-2xl tw-font-bold tw-text-gray-800">
                  {student?.name || "Unknown User"}
                </h3>
                {student?.emailVerified && (
                  <span className="tw-inline-block tw-mt-1 tw-text-xs tw-bg-green-100 tw-text-green-700 tw-px-2.5 tw-py-1 tw-rounded-full">
                    Email Verified
                  </span>
                )}
              </div>

              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-3">
                <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                  <Mail className="tw-w-4 tw-h-4 tw-flex-shrink-0" />
                  <span className="tw-text-sm">{student?.email || "No email provided"}</span>
                </div>
                
                <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                  <Phone className="tw-w-4 tw-h-4 tw-flex-shrink-0" />
                  <span className="tw-text-sm">{student?.mobile || "Mobile not provided"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COURSES SECTION ================= */}
        <div>
          {/* Section Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-5">
            <div className="tw-flex tw-items-center tw-gap-2">
              <BookOpen className="tw-w-5 tw-h-5 tw-text-blue-600" />
              <h3 className="tw-font-semibold tw-text-lg tw-text-gray-800">
                Enrolled Courses
              </h3>
            </div>
            <span className="tw-text-sm tw-bg-blue-100 tw-text-blue-700 tw-px-3 tw-py-1.5 tw-rounded-full tw-font-medium">
              {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
            </span>
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="tw-border-2 tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-p-12">
              <div className="tw-text-center">
                <BookOpen className="tw-w-12 tw-h-12 tw-mx-auto tw-text-gray-300" />
                <p className="tw-mt-3 tw-text-gray-500">No courses enrolled yet.</p>
              </div>
            </div>
          )}

          {/* Course Grid */}
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
            {courses.map((courseItem, index) => {
              const course = courseItem.course;

              return (
                <div
                  key={index}
                  className="tw-group tw-border tw-rounded-xl tw-overflow-hidden hover:tw-shadow-lg tw-transition-all tw-duration-200"
                >
                  {/* Course Header with Thumbnail */}
                  <div className="tw-relative tw-h-32 tw-bg-gray-100">
                    <img
                      src={course?.thumbnail || "/course-placeholder.png"}
                      alt={course?.name}
                      className="tw-w-full tw-h-full tw-object-cover"
                    />
                    {courseItem.completed && (
                      <div className="tw-absolute tw-top-2 tw-right-2">
                        <span className="tw-bg-green-500 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded-full tw-shadow-lg">
                          Completed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="tw-p-4 tw-space-y-3">
                    {/* Title and Category */}
                    <div>
                      <h4 className="tw-font-semibold tw-text-gray-800 tw-line-clamp-1">
                        {course?.name || "Course removed"}
                      </h4>
                      <p className="tw-text-xs tw-text-gray-500 tw-mt-0.5">
                        {course?.category || "No category"}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-text-xs">
                      {/* Batch */}
                      <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-600">
                        <Calendar className="tw-w-3.5 tw-h-3.5" />
                        <span className="tw-truncate">
                          {courseItem.batch?.batchName || "No batch"}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="tw-flex tw-items-center tw-gap-1 tw-text-gray-600">
                        <span className="tw-font-medium">Duration:</span>
                        <span>{course?.duration || "N/A"}</span>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="tw-flex tw-items-center tw-justify-between tw-pt-2 tw-border-t">
                      <div className="tw-flex tw-items-center tw-gap-1 tw-text-xs">
                        <CreditCard className="tw-w-3.5 tw-h-3.5 tw-text-gray-400" />
                        <span className="tw-text-gray-600">Payment:</span>
                      </div>
                      {courseItem.paymentId ? (
                        <span className="tw-text-sm tw-font-semibold tw-text-green-600">
                          ₹{courseItem.paymentId.amountInRupees}
                        </span>
                      ) : (
                        <span className="tw-text-xs tw-text-gray-400">
                          No payment record
                        </span>
                      )}
                    </div>

                    {/* Enrollment Date if available */}
                    {courseItem.enrolledAt && (
                      <div className="tw-text-xs tw-text-gray-400">
                        Enrolled: {new Date(courseItem.enrolledAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="tw-border-t tw-pt-4 tw-mt-4">
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-text-center">
            <div>
              <p className="tw-text-2xl tw-font-bold tw-text-blue-600">{courses.length}</p>
              <p className="tw-text-xs tw-text-gray-500">Total Courses</p>
            </div>
            <div>
              <p className="tw-text-2xl tw-font-bold tw-text-green-600">
                {courses.filter(c => c.completed).length}
              </p>
              <p className="tw-text-xs tw-text-gray-500">Completed</p>
            </div>
            <div>
              <p className="tw-text-2xl tw-font-bold tw-text-purple-600">
                {courses.filter(c => c.paymentId).length}
              </p>
              <p className="tw-text-xs tw-text-gray-500">Paid Courses</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDetailsModal;
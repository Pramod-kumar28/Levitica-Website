import { Loader2, X, Mail, Phone, CheckCircle, BookOpen, Calendar, CreditCard } from "lucide-react";
import { useTheme } from '@/context/ThemeContext';
import { useGetStudentEnrollmentsQuery } from '@/Services/admin/assignService';

const StudentDetailsModal = ({ userId, handleClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data, isLoading, isError } = useGetStudentEnrollmentsQuery(userId);

  const student = data?.data?.user;
  const courses = data?.data?.enrolledCourses || [];

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className={`animate-spin w-10 h-10 mx-auto ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Loading student details...</p>
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-6">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            isDark
              ? 'bg-red-900/30'
              : 'bg-red-100'
          }`}>
            <X className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
          </div>
          <p className={`mt-4 font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>Failed to load student details</p>
          <button 
            onClick={handleClose}
            className={`mt-4 px-4 py-2 rounded-lg text-sm transition-colors ${
              isDark
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-h-[90vh] overflow-y-auto transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
      
      {/* ================= STICKY HEADER ================= */}
      <div className={`sticky top-0 border-b px-6 py-4 flex items-center justify-between z-10 transition-colors ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className={`text-xl font-semibold transition-colors ${
            isDark
              ? 'text-slate-100'
              : 'text-gray-800'
          }`}>
            Student Profile
          </h2>
          <p className={`text-sm transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-gray-500'
          }`}>View detailed information and enrolled courses</p>
        </div>
        <button
          onClick={handleClose}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? 'hover:bg-slate-700 text-slate-400'
              : 'hover:bg-gray-100 text-gray-500'
          }`}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="p-6 space-y-6">

        {/* ================= PROFILE CARD ================= */}
        <div className={`border rounded-xl p-6 transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-700/40'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/40'
        }`}>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={student?.profileImage?.url || "/default-avatar.png"}
                alt={student?.name}
                className={`w-24 h-24 rounded-full object-cover border-4 shadow-lg ${
                  isDark
                    ? 'border-slate-700'
                    : 'border-white'
                }`}
              />
              {student?.emailVerified && (
                <div className={`absolute -bottom-1 -right-1 rounded-full p-1 border-2 ${
                  isDark
                    ? 'bg-green-600 border-slate-700'
                    : 'bg-green-500 border-white'
                }`}>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className={`text-2xl font-bold transition-colors ${
                  isDark
                    ? 'text-slate-100'
                    : 'text-gray-800'
                }`}>
                  {student?.name || "Unknown User"}
                </h3>
                {student?.emailVerified && (
                  <span className={`inline-block mt-1 text-xs px-2.5 py-1 rounded-full transition-colors ${
                    isDark
                      ? 'bg-green-600/30 text-green-300'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    Email Verified
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`flex items-center gap-2 transition-colors ${
                  isDark
                    ? 'text-slate-300'
                    : 'text-gray-600'
                }`}>
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{student?.email || "No email provided"}</span>
                </div>
                
                <div className={`flex items-center gap-2 transition-colors ${
                  isDark
                    ? 'text-slate-300'
                    : 'text-gray-600'
                }`}>
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{student?.mobile || "Mobile not provided"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COURSES SECTION ================= */}
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-5 h-5 transition-colors ${
                isDark
                  ? 'text-blue-400'
                  : 'text-blue-600'
              }`} />
              <h3 className={`font-semibold text-lg transition-colors ${
                isDark
                  ? 'text-slate-100'
                  : 'text-gray-800'
              }`}>
                Enrolled Courses
              </h3>
            </div>
            <span className={`text-sm px-3 py-1.5 rounded-full font-medium transition-colors ${
              isDark
                ? 'bg-blue-600/30 text-blue-300'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
            </span>
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className={`border-2 border-dashed rounded-xl p-12 transition-colors ${
              isDark
                ? 'border-slate-600 bg-slate-700/30'
                : 'border-gray-200 bg-white'
            }`}>
              <div className="text-center">
                <BookOpen className={`w-12 h-12 mx-auto transition-colors ${
                  isDark
                    ? 'text-slate-600'
                    : 'text-gray-300'
                }`} />
                <p className={`mt-3 transition-colors ${
                  isDark
                    ? 'text-slate-400'
                    : 'text-gray-500'
                }`}>No courses enrolled yet.</p>
              </div>
            </div>
          )}

          {/* Course Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {courses.map((courseItem, index) => {
              const course = courseItem.course;

              return (
                <div
                  key={index}
                  className={`group border rounded-xl overflow-hidden transition-all duration-200 ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 hover:shadow-lg hover:border-slate-500'
                      : 'bg-white border-slate-200 hover:shadow-lg'
                  }`}
                >
                  {/* Course Header with Thumbnail */}
                  <div className={`relative h-32 ${isDark ? 'bg-slate-600' : 'bg-gray-100'}`}>
                    <img
                      src={course?.thumbnail || "/course-placeholder.png"}
                      alt={course?.name}
                      className="w-full h-full object-cover"
                    />
                    {courseItem.completed && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                          Completed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-4 space-y-3">
                    {/* Title and Category */}
                    <div>
                      <h4 className={`font-semibold line-clamp-1 transition-colors ${
                        isDark
                          ? 'text-slate-100'
                          : 'text-gray-800'
                      }`}>
                        {course?.name || "Course removed"}
                      </h4>
                      <p className={`text-xs mt-0.5 transition-colors ${
                        isDark
                          ? 'text-slate-400'
                          : 'text-gray-500'
                      }`}>
                        {course?.category || "No category"}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* Batch */}
                      <div className={`flex items-center gap-1 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-gray-600'
                      }`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="truncate">
                          {courseItem.batch?.batchName || "No batch"}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className={`flex items-center gap-1 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-gray-600'
                      }`}>
                        <span className="font-medium">Duration:</span>
                        <span>{course?.duration || "N/A"}</span>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className={`flex items-center justify-between pt-2 border-t transition-colors ${
                      isDark
                        ? 'border-slate-600'
                        : 'border-slate-200'
                    }`}>
                      <div className={`flex items-center gap-1 text-xs transition-colors ${
                        isDark
                          ? 'text-slate-400'
                          : 'text-gray-600'
                      }`}>
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Payment:</span>
                      </div>
                      {courseItem.paymentId ? (
                        <span className={`text-sm font-semibold transition-colors ${
                          isDark
                            ? 'text-green-400'
                            : 'text-green-600'
                        }`}>
                          ₹{courseItem.paymentId.amountInRupees}
                        </span>
                      ) : (
                        <span className={`text-xs transition-colors ${
                          isDark
                            ? 'text-slate-500'
                            : 'text-gray-400'
                        }`}>
                          No payment record
                        </span>
                      )}
                    </div>

                    {/* Enrollment Date if available */}
                    {courseItem.enrolledAt && (
                      <div className={`text-xs transition-colors ${
                        isDark
                          ? 'text-slate-500'
                          : 'text-gray-400'
                      }`}>
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
        <div className={`border-t pt-4 mt-4 transition-colors ${
          isDark
            ? 'border-slate-700'
            : 'border-slate-200'
        }`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className={`text-2xl font-bold transition-colors ${
                isDark
                  ? 'text-blue-400'
                  : 'text-blue-600'
              }`}>{courses.length}</p>
              <p className={`text-xs transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-gray-500'
              }`}>Total Courses</p>
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors ${
                isDark
                  ? 'text-green-400'
                  : 'text-green-600'
              }`}>
                {courses.filter(c => c.completed).length}
              </p>
              <p className={`text-xs transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-gray-500'
              }`}>Completed</p>
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors ${
                isDark
                  ? 'text-purple-400'
                  : 'text-purple-600'
              }`}>
                {courses.filter(c => c.paymentId).length}
              </p>
              <p className={`text-xs transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-gray-500'
              }`}>Paid Courses</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDetailsModal;
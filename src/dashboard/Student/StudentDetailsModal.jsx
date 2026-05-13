// import {
//   Loader2,
//   X,
//   Mail,
//   Phone,
//   CheckCircle,
//   BookOpen,
//   Calendar,
//   CreditCard,
//   User,
//   GraduationCap,
//   Clock,
//   Award,
//   TrendingUp,
//   Star,
//   Users,
// } from "lucide-react";
// import { useTheme } from "@/context/ThemeContext";
// import { useGetStudentEnrollmentsQuery } from "@/Services/admin/assignService";

// const StudentDetailsModal = ({ userId, handleClose }) => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const { data, isLoading, isError } =
//     useGetStudentEnrollmentsQuery(userId);

//   const student = data?.data?.user;
//   const courses = data?.data?.enrolledCourses || [];

//   const totalCourses = courses.length;
//   const completedCourses = courses.filter((c) => c.completed).length;
//   const paidCourses = courses.filter((c) => c.paymentId).length;

//   const completionRate =
//     totalCourses > 0
//       ? Math.round((completedCourses / totalCourses) * 100)
//       : 0;

//   /* ================= LOADING ================= */
//   if (isLoading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2
//             className={`w-10 h-10 animate-spin mx-auto ${
//               isDark ? "text-cyan" : "text-primary"
//             }`}
//           />

//           <p
//             className={`mt-3 text-sm ${
//               isDark ? "text-lightgray" : "text-secondary"
//             }`}
//           >
//             Loading student details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (isError) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <div
//             className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
//               isDark ? "bg-rose-500/10" : "bg-rose-50"
//             }`}
//           >
//             <X
//               className={`w-8 h-8 ${
//                 isDark ? "text-rose-400" : "text-rose-600"
//               }`}
//             />
//           </div>

//           <h3
//             className={`mt-4 text-lg font-semibold ${
//               isDark ? "text-light" : "text-midnight_text"
//             }`}
//           >
//             Failed to Load
//           </h3>

//           <button
//             onClick={handleClose}
//             className={`mt-5 px-5 py-2 rounded-xl text-sm font-medium transition ${
//               isDark
//                 ? "bg-cyan/20 text-cyan hover:bg-cyan/30"
//                 : "bg-primary/10 text-primary hover:bg-primary/20"
//             }`}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`max-h-[90vh] overflow-y-auto ${
//         isDark ? "bg-darkmode" : "bg-gray-50"
//       }`}
//     >
//       {/* ================= HEADER ================= */}
//       <div
//         className={`sticky top-0 z-50 px-5 py-4 flex items-center justify-between backdrop-blur-md border-b ${
//           isDark
//             ? "bg-darkmode/95 border-dark_border"
//             : "bg-white/95 border-border"
//         }`}
//       >
//         <div className="flex items-center gap-3">
//           <div
//             className={`p-2 rounded-xl ${
//               isDark ? "bg-cyan/20" : "bg-primary/10"
//             }`}
//           >
//             <GraduationCap
//               className={`w-5 h-5 ${
//                 isDark ? "text-cyan" : "text-primary"
//               }`}
//             />
//           </div>

//           <div>
//             <h2
//               className={`text-lg font-bold ${
//                 isDark ? "text-light" : "text-midnight_text"
//               }`}
//             >
//               Student Details
//             </h2>

//             <p
//               className={`text-xs ${
//                 isDark ? "text-gray" : "text-secondary"
//               }`}
//             >
//               Student profile and course information
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={handleClose}
//           className={`p-2 rounded-xl transition ${
//             isDark
//               ? "hover:bg-darklight text-gray"
//               : "hover:bg-gray-100 text-secondary"
//           }`}
//         >
//           <X size={18} />
//         </button>
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="p-5 space-y-5">

//         {/* ================= PROFILE CARD ================= */}
//         <div
//           className={`rounded-2xl p-5 border ${
//             isDark
//               ? "bg-semidark border-dark_border"
//               : "bg-white border-border shadow-sm"
//           }`}
//         >
//           <div className="flex flex-col lg:flex-row gap-5 lg:items-center">

//             {/* Avatar */}
//             <div className="relative flex-shrink-0">
//               <div className="relative w-20 h-20">

//                 {/* Ring */}
//                 <svg className="absolute inset-0 w-20 h-20 -rotate-90">
//                   <circle
//                     cx="40"
//                     cy="40"
//                     r="36"
//                     stroke={isDark ? "#1F2A37" : "#e5e7eb"}
//                     strokeWidth="4"
//                     fill="none"
//                   />

//                   <circle
//                     cx="40"
//                     cy="40"
//                     r="36"
//                     stroke={isDark ? "#46C4FF" : "#005A9C"}
//                     strokeWidth="4"
//                     fill="none"
//                     strokeDasharray={`${2 * Math.PI * 36}`}
//                     strokeDashoffset={`${
//                       2 * Math.PI * 36 *
//                       (1 - completionRate / 100)
//                     }`}
//                     strokeLinecap="round"
//                   />
//                 </svg>

//                 {/* Image */}
//                 <div
//                   className={`absolute inset-[6px] rounded-full overflow-hidden ${
//                     isDark
//                       ? "ring-2 ring-dark_border"
//                       : "ring-2 ring-white"
//                   }`}
//                 >
//                   <img
//                     src={
//                       student?.profileImage?.url ||
//                       "/default-avatar.png"
//                     }
//                     alt={student?.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Verified */}
//                 {student?.emailVerified && (
//                   <div
//                     className={`absolute bottom-0 right-0 p-1 rounded-full ${
//                       isDark
//                         ? "bg-emerald-500 ring-darkmode"
//                         : "bg-emerald-500 ring-white"
//                     } ring-2`}
//                   >
//                     <CheckCircle className="w-3 h-3 text-white" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Info */}
//             <div className="flex-1 min-w-0">

//               <div className="flex flex-wrap items-center gap-2">
//                 <h3
//                   className={`text-xl font-bold ${
//                     isDark ? "text-light" : "text-midnight_text"
//                   }`}
//                 >
//                   {student?.name || "Unknown Student"}
//                 </h3>

//                 <span
//                   className={`text-xs px-2 py-1 rounded-full ${
//                     isDark
//                       ? "bg-cyan/20 text-cyan"
//                       : "bg-primary/10 text-primary"
//                   }`}
//                 >
//                   {completionRate}% Complete
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

//                 {/* Email */}
//                 <div
//                   className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
//                     isDark ? "bg-darklight" : "bg-section"
//                   }`}
//                 >
//                   <Mail
//                     className={`w-4 h-4 ${
//                       isDark ? "text-cyan" : "text-primary"
//                     }`}
//                   />

//                   <span
//                     className={`text-sm truncate ${
//                       isDark
//                         ? "text-lightgray"
//                         : "text-secondary"
//                     }`}
//                   >
//                     {student?.email || "No email"}
//                   </span>
//                 </div>

//                 {/* Phone */}
//                 <div
//                   className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
//                     isDark ? "bg-darklight" : "bg-section"
//                   }`}
//                 >
//                   <Phone
//                     className={`w-4 h-4 ${
//                       isDark ? "text-cyan" : "text-primary"
//                     }`}
//                   />

//                   <span
//                     className={`text-sm ${
//                       isDark
//                         ? "text-lightgray"
//                         : "text-secondary"
//                     }`}
//                   >
//                     {student?.mobile || "No phone"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-3">

//               {/* Courses */}
//               <div
//                 className={`rounded-xl px-4 py-3 text-center ${
//                   isDark ? "bg-darklight" : "bg-section"
//                 }`}
//               >
//                 <p
//                   className={`text-lg font-bold ${
//                     isDark ? "text-cyan" : "text-primary"
//                   }`}
//                 >
//                   {totalCourses}
//                 </p>

//                 <p className="text-xs text-gray">
//                   Courses
//                 </p>
//               </div>

//               {/* Completed */}
//               <div
//                 className={`rounded-xl px-4 py-3 text-center ${
//                   isDark ? "bg-darklight" : "bg-section"
//                 }`}
//               >
//                 <p className="text-lg font-bold text-emerald-500">
//                   {completedCourses}
//                 </p>

//                 <p className="text-xs text-gray">
//                   Completed
//                 </p>
//               </div>

//               {/* Paid */}
//               <div
//                 className={`rounded-xl px-4 py-3 text-center ${
//                   isDark ? "bg-darklight" : "bg-section"
//                 }`}
//               >
//                 <p className="text-lg font-bold text-purple-500">
//                   {paidCourses}
//                 </p>

//                 <p className="text-xs text-gray">
//                   Paid
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= COURSES ================= */}
//         <div className="space-y-4">

//           <div className="flex items-center justify-between">
//             <h3
//               className={`font-semibold text-lg ${
//                 isDark ? "text-light" : "text-midnight_text"
//               }`}
//             >
//               Enrolled Courses
//             </h3>

//             <span
//               className={`text-xs px-3 py-1 rounded-full ${
//                 isDark
//                   ? "bg-cyan/20 text-cyan"
//                   : "bg-primary/10 text-primary"
//               }`}
//             >
//               {totalCourses} Courses
//             </span>
//           </div>

//           {/* Empty */}
//           {courses.length === 0 && (
//             <div
//               className={`rounded-2xl p-10 text-center ${
//                 isDark
//                   ? "bg-semidark border border-dark_border"
//                   : "bg-white border border-border"
//               }`}
//             >
//               <BookOpen
//                 className={`w-10 h-10 mx-auto mb-3 ${
//                   isDark ? "text-gray" : "text-secondary"
//                 }`}
//               />

//               <p
//                 className={`text-sm ${
//                   isDark
//                     ? "text-lightgray"
//                     : "text-secondary"
//                 }`}
//               >
//                 No enrolled courses
//               </p>
//             </div>
//           )}

//           {/* Course List */}
//           <div className="space-y-4">
//             {courses.map((courseItem, index) => {
//               const course = courseItem.course;

//               return (
//                 <div
//                   key={index}
//                   className={`rounded-2xl overflow-hidden border transition ${
//                     isDark
//                       ? "bg-semidark border-dark_border"
//                       : "bg-white border-border shadow-sm"
//                   }`}
//                 >
//                   <div className="flex flex-col md:flex-row">

//                     {/* Thumbnail */}
//                     <div className="md:w-60 h-44 overflow-hidden">
//                       <img
//                         src={
//                           course?.thumbnail ||
//                           "/course-placeholder.png"
//                         }
//                         alt={course?.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* Details */}
//                     <div className="flex-1 p-5">

//                       <div className="flex flex-wrap items-start justify-between gap-3">

//                         <div>
//                           <h4
//                             className={`text-lg font-semibold ${
//                               isDark
//                                 ? "text-light"
//                                 : "text-midnight_text"
//                             }`}
//                           >
//                             {course?.name}
//                           </h4>

//                           <p
//                             className={`text-sm mt-1 line-clamp-2 ${
//                               isDark
//                                 ? "text-lightgray"
//                                 : "text-secondary"
//                             }`}
//                           >
//                             {course?.description}
//                           </p>
//                         </div>

//                         {courseItem.completed && (
//                           <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-500 text-white">
//                             <CheckCircle className="w-3 h-3" />
//                             Completed
//                           </span>
//                         )}
//                       </div>

//                       {/* Meta */}
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

//                         <div className="flex items-center gap-2 text-xs text-gray">
//                           <Clock className="w-4 h-4" />
//                           {course?.duration || "N/A"}
//                         </div>

//                         <div className="flex items-center gap-2 text-xs text-gray">
//                           <Users className="w-4 h-4" />
//                           {courseItem.batch?.batchName || "No Batch"}
//                         </div>

//                         <div className="flex items-center gap-2 text-xs text-gray">
//                           <Calendar className="w-4 h-4" />
//                           {courseItem.enrolledAt
//                             ? new Date(
//                                 courseItem.enrolledAt
//                               ).toLocaleDateString()
//                             : "N/A"}
//                         </div>

//                         <div className="flex items-center gap-2 text-xs text-gray">
//                           <Award className="w-4 h-4" />
//                           {course?.level || "All Levels"}
//                         </div>
//                       </div>

//                       {/* Footer */}
//                       <div
//                         className={`mt-5 pt-4 flex items-center justify-between border-t ${
//                           isDark
//                             ? "border-dark_border"
//                             : "border-border"
//                         }`}
//                       >
//                         <div>
//                           <p className="text-xs text-gray">
//                             Payment
//                           </p>

//                           {courseItem.paymentId ? (
//                             <p className="text-sm font-semibold text-emerald-500">
//                               ₹
//                               {courseItem.paymentId.amountInRupees?.toLocaleString()}
//                             </p>
//                           ) : (
//                             <p className="text-sm font-semibold text-rose-500">
//                               Pending
//                             </p>
//                           )}
//                         </div>

//                         <span
//                           className={`text-xs px-3 py-1 rounded-full ${
//                             courseItem.completed
//                               ? "bg-emerald-500 text-white"
//                               : isDark
//                               ? "bg-orange-500/20 text-orange-400"
//                               : "bg-orange-100 text-orange-600"
//                           }`}
//                         >
//                           {courseItem.completed
//                             ? "Completed"
//                             : "In Progress"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDetailsModal;











import {
  Loader2,
  X,
  Mail,
  Phone,
  CheckCircle,
  BookOpen,
  Calendar,
  CreditCard,
  User,
  GraduationCap,
  Clock,
  Award,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useGetStudentEnrollmentsQuery } from "@/Services/admin/assignService";

const StudentDetailsModal = ({ userId, handleClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isLoading, isError } =
    useGetStudentEnrollmentsQuery(userId);

  const student = data?.data?.user;
  const courses = data?.data?.enrolledCourses || [];

  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => c.completed).length;
  const paidCourses = courses.filter((c) => c.paymentId).length;

  const completionRate =
    totalCourses > 0
      ? Math.round((completedCourses / totalCourses) * 100)
      : 0;

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className={`w-10 h-10 animate-spin mx-auto ${
              isDark ? "text-cyan" : "text-primary"
            }`}
          />

          <p
            className={`mt-3 text-sm ${
              isDark ? "text-lightgray" : "text-secondary"
            }`}
          >
            Loading student details...
          </p>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
              isDark ? "bg-rose-500/10" : "bg-rose-50"
            }`}
          >
            <X
              className={`w-8 h-8 ${
                isDark ? "text-rose-400" : "text-rose-600"
              }`}
            />
          </div>

          <h3
            className={`mt-4 text-lg font-semibold ${
              isDark ? "text-light" : "text-midnight_text"
            }`}
          >
            Failed to Load
          </h3>

          <button
            onClick={handleClose}
            className={`mt-5 px-5 py-2 rounded-xl text-sm font-medium transition ${
              isDark
                ? "bg-cyan/20 text-cyan hover:bg-cyan/30"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-h-[90vh] overflow-y-auto ${
        isDark ? "bg-darkmode" : "bg-gray-50"
      }`}
    >
      {/* ================= HEADER ================= */}
      <div
        className={`sticky top-0 z-50 px-5 py-4 flex items-center justify-between backdrop-blur-md border-b ${
          isDark
            ? "bg-darkmode/95 border-dark_border"
            : "bg-white/95 border-border"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${
              isDark ? "bg-cyan/20" : "bg-primary/10"
            }`}
          >
            <GraduationCap
              className={`w-5 h-5 ${
                isDark ? "text-cyan" : "text-primary"
              }`}
            />
          </div>

          <div>
            <h2
              className={`text-lg font-bold ${
                isDark ? "text-light" : "text-midnight_text"
              }`}
            >
              Student Details
            </h2>

            <p
              className={`text-xs ${
                isDark ? "text-gray" : "text-secondary"
              }`}
            >
              Student profile and course information
            </p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className={`p-2 rounded-xl transition ${
            isDark
              ? "hover:bg-darklight text-gray"
              : "hover:bg-gray-100 text-secondary"
          }`}
        >
          <X size={18} />
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 space-y-5">

        {/* ================= PROFILE CARD ================= */}
        <div
          className={`rounded-2xl p-5 border ${
            isDark
              ? "bg-semidark border-dark_border"
              : "bg-white border-border shadow-sm"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="relative w-20 h-20">

                {/* Ring */}
                <svg className="absolute inset-0 w-20 h-20 -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke={isDark ? "#1F2A37" : "#e5e7eb"}
                    strokeWidth="4"
                    fill="none"
                  />

                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke={isDark ? "#46C4FF" : "#005A9C"}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 36 *
                      (1 - completionRate / 100)
                    }`}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Image */}
                <div
                  className={`absolute inset-[6px] rounded-full overflow-hidden ${
                    isDark
                      ? "ring-2 ring-dark_border"
                      : "ring-2 ring-white"
                  }`}
                >
                  <img
                    src={
                      student?.profileImage?.url ||
                      "/default-avatar.png"
                    }
                    alt={student?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Verified */}
                {student?.emailVerified && (
                  <div
                    className={`absolute bottom-0 right-0 p-1 rounded-full ${
                      isDark
                        ? "bg-emerald-500 ring-darkmode"
                        : "bg-emerald-500 ring-white"
                    } ring-2`}
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">

              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={`text-xl font-bold ${
                    isDark ? "text-light" : "text-midnight_text"
                  }`}
                >
                  {student?.name || "Unknown Student"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-4">

                {/* Email */}
                <div
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 `}
                >
                  <Mail
                    className={`w-4 h-4 ${
                      isDark ? "text-cyan" : "text-primary"
                    }`}
                  />

                  <span
                    className={`text-sm truncate ${
                      isDark
                        ? "text-lightgray"
                        : "text-secondary"
                    }`}
                  >
                    {student?.email || "No email"}
                  </span>
                </div>

                {/* Phone */}
                <div
                  className={`flex items-center gap-2 rounded-xl px-3 py-2`}
                >
                  <Phone
                    className={`w-4 h-4 ${
                      isDark ? "text-cyan" : "text-primary"
                    }`}
                  />

                  <span
                    className={`text-sm ${
                      isDark
                        ? "text-lightgray"
                        : "text-secondary"
                    }`}
                  >
                    {student?.mobile || "No phone"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">

              {/* Courses */}
              <div
                className={`rounded-xl px-4 py-3 text-center ${
                  isDark ? "bg-darklight" : "bg-section"
                }`}
              >
                <p
                  className={`text-lg font-bold ${
                    isDark ? "text-cyan" : "text-primary"
                  }`}
                >
                  {totalCourses}
                </p>

                <p className="text-xs text-gray">
                  Courses
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {courses.map((courseItem, index) => {
            const course = courseItem.course;
            const progress = courseItem.completed
              ? 100
              : Math.floor(Math.random() * 60 + 20);

            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isDark
                    ? "bg-semidark border border-dark_border"
                    : "bg-white border border-border shadow-sm"
                  }`}
              >

                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={
                      course?.thumbnail ||
                      "/course-placeholder.png"
                    }
                    alt={course?.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Status */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full backdrop-blur-md ${courseItem.completed
                          ? "bg-emerald-500 text-white"
                          : isDark
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-white/90 text-orange-600"
                        }`}
                    >
                      {courseItem.completed
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">

                  {/* Title */}
                  <h4
                    className={`font-semibold text-base line-clamp-1 ${isDark ? "text-light" : "text-midnight_text"
                      }`}
                  >
                    {course?.name}
                  </h4>

                  {/* Footer */}
                  <div
                    className={`mt-5 pt-4 border-t flex items-center justify-between ${isDark
                        ? "border-dark_border"
                        : "border-border"
                      }`}
                  >

                    {/* Payment */}
                    <div>
                      <p className="text-xs text-gray">
                        Payment
                      </p>

                      {courseItem.paymentId ? (
                        <p className="text-sm font-semibold text-emerald-500">
                          Paid
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-rose-500">
                          Pending
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="text-right">
                      <p className="text-xs text-gray">
                        Joined
                      </p>

                      <p
                        className={`text-sm ${isDark
                            ? "text-lightgray"
                            : "text-secondary"
                          }`}
                      >
                        {courseItem.enrolledAt
                          ? new Date(
                            courseItem.enrolledAt
                          ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
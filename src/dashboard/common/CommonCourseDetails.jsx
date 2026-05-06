// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import {
//   FiEdit,
//   FiShoppingCart,
//   FiClock,
//   FiTag,
//   FiCheckCircle,
//   FiVideo,
//   FiAward,
//   FiImage,
//   FiBookOpen,
//   FiChevronDown,
//   FiChevronUp,
//   FiTarget,
//   FiShare2,
//   FiPlayCircle,
//   FiFileText,

// } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import { useAddItemMutation } from '@/Services/student/cartServices';
// import {
//   useGetCourseByIdQuery,
// } from '@/Services/sharedServices/courses.Services';
// import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
// import { addItemToCart } from '@/features/cartSlice';
// import RelatedCourses from "./RelatedCourses";

// const CommonCourseDetails = () => {
//   const { id } = useParams();
//   const { openModal } = useModal();
//   const dispatch = useDispatch();
//   const [expandedWeeks, setExpandedWeeks] = useState([]);


//   const { data, isLoading } = useGetCourseByIdQuery(id);
//   const course = data?.data;

//   const role = useSelector((state) => state.auth.user?.role);
//   const userId = useSelector((state) => state.auth.user?.id);

//   const [addItem] = useAddItemMutation();

//   const handleAdd = async () => {
//     if (!userId) {
//       toast.error("Please login to add items to cart");
//       return;
//     }
//     try {
//       await addItem({ userId, courseId: course._id }).unwrap();
//       dispatch(addItemToCart(course));
//       toast.success("Added to cart!");
//     } catch {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const handleEdit = () => {
//     openModal(MODAL_TYPES.EDIT_COURSE_DETAILS, {
//       courseId: course._id,
//       initialData: details,
//     });
//   };

//   const toggleWeek = (weekIndex) => {
//     setExpandedWeeks(prev =>
//       prev.includes(weekIndex)
//         ? prev.filter(i => i !== weekIndex)
//         : [...prev, weekIndex]
//     );
//   };



//   const handleShare = () => {
//     navigator.clipboard?.writeText(window.location.href);
//     toast.success("Link copied to clipboard!");
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <div className="text-6xl">😕</div>
//           <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
//           <p className="text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
//         </div>
//       </div>
//     );
//   }

//   const details = course.details || {};
//   const totalSessions = details.curriculum?.reduce((acc, week) => acc + (week.sessions?.length || 0), 0) || 0;
//   const totalHours = details.curriculum?.reduce((acc, week) => acc + (parseInt(week.duration) || 2), 0) || 0;

//   return (
//     <div className="p-4">


//       <div className="relative max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-3 gap-8 items-start">
//           {/* Left Content */}
//           <div className="lg:col-span-2 md:space-y-6 space-y-3">


//             {/* Title */}
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
//               {course.name}
//             </h1>

//             {/* Description Preview */}
//             <p className="text-lg leading-relaxed line-clamp-2">
//               {course?.shortdescription || "An comprehensive course designed to take you from beginner to expert."}
//             </p>

//             {/* Tags & Meta */}
//             <div className="flex flex-wrap gap-3">
//               <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
//                 <FiTag size={16} /> {course.category}
//               </span>
//               <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
//                 <FiClock size={16} /> {course.duration}
//               </span>

//             </div>

//             {/* Price / Offer Section */}
//             <div className=" border-t">
//               {Number(course.price) === 0 ? (
//                 <div className="space-y-2 bg-green-50 p-4 border border-green-200 rounded-xl">
//                   <span className="text-xl font-bold text-green-600">
//                     🎉 Free Course
//                   </span>

//                   <p className="text-md text-gray-600">
//                     This course is completely free when you enroll in or purchase any
//                     other paid course.
//                   </p>

//                   <p className="text-base text-gray-500">

//                     • No additional charges
//                   </p>
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 p-4 border rounded-xl">
//                   <h3 className="text-lg font-semibold mb-4">
//                     What’s Included
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

//                     {/* Live Classes */}
//                     <div className="flex items-start gap-3">
//                       <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-2 sm:p-3 rounded-lg">
//                         <FiVideo className="text-base sm:text-lg" />
//                       </div>

//                       <div className="leading-tight">
//                         <p className="text-sm sm:text-base font-semibold m-0">
//                           Live Interactive Classes
//                         </p>
//                         <p className="text-xs sm:text-sm text-gray-600 m-0">
//                           Attend real-time sessions with expert mentors.
//                         </p>
//                       </div>
//                     </div>

//                     {/* Soft Skills Free */}
//                     <div className="flex items-start gap-3">
//                       <div className="flex-shrink-0 bg-green-100 text-green-600 p-2 sm:p-3 rounded-lg">
//                         <FiAward className="text-base sm:text-lg" />
//                       </div>

//                       <div className="leading-tight">
//                         <p className="text-sm sm:text-base font-semibold m-0">
//                           Free Soft Skills Course
//                         </p>
//                         <p className="text-xs sm:text-sm text-gray-600 m-0">
//                           Communication, interview prep & personality development included.
//                         </p>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               )}
//             </div>


//           </div>

//           {/* Right - Price Card in Hero */}
//           <div className="lg:mt-0">
//             <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
//               {/* Thumbnail */}
//               <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800">
//                 {course.thumbnail ? (
//                   <img
//                     src={course.thumbnail}
//                     alt={course.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <FiImage size={48} className="text-gray-500" />
//                   </div>
//                 )}
//                 {/* Play Button Overlay */}
//                 <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
//                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                     <FiPlayCircle className="w-8 h-8 text-blue-600" />
//                   </div>
//                 </button>
//               </div>

//               {/* Price Details */}
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-sm font-medium text-gray-500">Course Price</span>
//                   {Number(course.price) > 0 && (
//                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                       Includes GST
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-baseline gap-2 mb-4">
//                   {Number(course.price) === 0 ? (
//                     <>
//                       <span className="text-4xl font-bold text-green-600">Free</span>
//                       <span className="text-sm text-gray-500">• No payment required</span>
//                     </>
//                   ) : (
//                     <>
//                       <span className="text-4xl font-bold text-gray-900">
//                         ₹{Number(course.price).toLocaleString('en-IN')}
//                       </span>
//                       <span className="text-sm text-gray-500">+ taxes</span>
//                     </>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   {role === "admin" || role==='superadmin'? (
//                     <button
//                       onClick={handleEdit}
//                       className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
//                     >
//                       <FiEdit size={18} /> Edit Course Details
//                     </button>
//                   ) : (
//                     <>


//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleAdd}
//                           className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
//                         >
//                           <FiShoppingCart size={18} /> Add to Cart
//                         </button>

//                         <button
//                           onClick={handleShare}
//                           className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200"
//                         >
//                           <FiShare2 size={18} />
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>


//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto  md:space-y-8 space-y-3 mt-6">

//         {/* Description */}
//         {details?.description && (
//           <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
//             <h2 className="font-bold text-xl md:text-2xl text-gray-900 mb-4">
//               Course Description
//             </h2>
//             <p className="text-gray-700  lg:text-base text-sm">
//               {details.description}
//             </p>
//           </div>
//         )}

//         {/* Objectives & Requirements */}
//         <div className="grid md:grid-cols-2 gap-4 md:gap-6">
//           {details?.objectives?.length > 0 && (
//             <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="bg-green-100 p-2.5 rounded-xl">
//                   <FiTarget className="text-green-600" size={22} />
//                 </div>
//                 <h3 className="font-semibold text-base sm:text-lg text-gray-900">What you'll learn</h3>
//               </div>
//               <ul className="space-y-3 sm:space-y-4">
//                 {details.objectives.map((item, i) => (
//                   <li
//                     key={i}
//                     className="flex items-start gap-3 group"
//                   >
//                     <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
//                     <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {details?.requirements?.length > 0 && (
//             <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="bg-orange-100 p-2.5 rounded-xl">
//                   <FiFileText className="text-orange-600" size={22} />
//                 </div>
//                 <h3 className="font-semibold text-base sm:text-lg text-gray-900">Requirements</h3>
//               </div>
//               <ul className="space-y-3 sm:space-y-4">
//                 {details.requirements.map((req, i) => (
//                   <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
//                     <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5"></span>
//                     <span>{req}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Curriculum */}
//         {details?.curriculum?.length > 0 && (
//           <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm">

//             {/* Header */}
//             <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 mb-6 sm:mb-8">

//               {/* Left */}
//               <div className="flex items-center gap-3">
//                 <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 sm:p-3 rounded-xl shadow-lg">
//                   <FiBookOpen className="text-white" size={20} />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900">
//                     Course Curriculum
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-500">
//                     {details.curriculum.length} weeks • {totalSessions} sessions • {totalHours}+ hours
//                   </p>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-3 sm:gap-4">
//                 <div className="text-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 rounded-xl">
//                   <span className="block text-base sm:text-xl font-bold text-blue-600">
//                     {details.curriculum.length}
//                   </span>
//                   <span className="text-[10px] sm:text-xs text-gray-600">
//                     Weeks
//                   </span>
//                 </div>

//                 <div className="text-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-50 rounded-xl">
//                   <span className="block text-base sm:text-xl font-bold text-green-600">
//                     {totalSessions}
//                   </span>
//                   <span className="text-[10px] sm:text-xs text-gray-600">
//                     Sessions
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Curriculum Timeline */}
//             <div className="space-y-3 sm:space-y-4">
//               {details.curriculum.map((week, w) => (
//                 <div
//                   key={w}
//                   className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
//                 >

//                   {/* Week Header */}
//                   <div
//                     onClick={() => toggleWeek(w)}
//                     className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:from-blue-50/50 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">

//                       <div className="flex items-center gap-3 sm:gap-4">

//                         {/* Week Number */}
//                         <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-md">
//                           {w + 1}
//                         </div>

//                         <div>
//                           <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
//                             {week.title}
//                           </h4>
//                           <p className="text-[11px] sm:text-sm text-gray-500">
//                             {week.sessions?.length || 0} sessions • {week.duration || "2-3 hours"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="text-gray-400">
//                         {expandedWeeks.includes(w) ? (
//                           <FiChevronUp size={18} />
//                         ) : (
//                           <FiChevronDown size={18} />
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Sessions */}
//                   {expandedWeeks.includes(w) && (
//                     <div className="p-3 sm:p-4 md:p-5 border-t border-gray-100 bg-white">

//                       <div className="grid gap-2 sm:gap-3">
//                         {week.sessions.map((s, i) => (
//                           <div
//                             key={i}
//                             className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
//                           >

//                             {/* Session Number */}
//                             <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-md sm:rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600">
//                               {i + 1}
//                             </div>

//                             <div className="flex-1">
//                               <p className="text-sm sm:text-base text-gray-900 font-medium">
//                                 {s.title}
//                               </p>

//                               {(s.duration || s.type) && (
//                                 <p className="text-[11px] sm:text-sm text-gray-500">
//                                   {s.duration && `${s.duration} min`}
//                                   {s.duration && s.type && " • "}
//                                   {s.type}
//                                 </p>
//                               )}
//                             </div>

//                             {s.isCompleted && (
//                               <FiCheckCircle className="text-green-500" size={16} />
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Week Outcomes */}
//                       {week.outcomes && week.outcomes.length > 0 && (
//                         <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
//                           <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
//                             Week {w + 1} Outcomes
//                           </p>

//                           <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                             {week.outcomes.map((outcome, idx) => (
//                               <span
//                                 key={idx}
//                                 className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium"
//                               >
//                                 <FiTarget size={10} />
//                                 {outcome}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <RelatedCourses currentCourseId={course._id} />
//       </div>
//     </div>
//   );
// };

// export default CommonCourseDetails;























// CommonCourseDetails.jsx
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
  FiShare2,
  FiPlayCircle,
  FiFileText,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAddItemMutation } from '@/Services/student/cartServices';
import { useGetCourseByIdQuery } from '@/Services/sharedServices/courses.Services';
import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
import { addItemToCart } from '@/features/cartSlice';
import RelatedCourses from "./RelatedCourses";

const CommonCourseDetails = () => {
  const { id } = useParams();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [expandedWeeks, setExpandedWeeks] = useState([]);

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

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-section dark:bg-darkmode">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-border dark:border-dark_border border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-section dark:bg-darkmode">
        <div className="text-center space-y-4">
          <div className="text-6xl">😕</div>
          <h2 className="text-2xl font-bold text-midnight_text dark:text-white">
            Course Not Found
          </h2>
          <p className="text-gray dark:text-gray-400">
            The course you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const details = course.details || {};
  const totalSessions =
    details.curriculum?.reduce(
      (acc, week) => acc + (week.sessions?.length || 0),
      0
    ) || 0;

  const totalHours =
    details.curriculum?.reduce(
      (acc, week) => acc + (parseInt(week.duration) || 2),
      0
    ) || 0;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Hero Section - Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6 ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-midnight_text dark:text-white">
              {course.name}
            </h1>

            <p className="text-lg leading-relaxed text-gray dark:text-gray-300">
              {course?.shortdescription || "An comprehensive course designed to take you from beginner to expert."}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-light dark:bg-darklight rounded-full text-sm font-medium border border-border dark:border-dark_border text-midnight_text dark:text-white">
                <FiTag size={16} /> {course.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-light dark:bg-darklight rounded-full text-sm font-medium border border-border dark:border-dark_border text-midnight_text dark:text-white">
                <FiClock size={16} /> {course.duration}
              </span>
            </div>

            <div className="border-t border-border dark:border-dark_border pt-6">
              {Number(course.price) === 0 ? (
                <div className="space-y-2 bg-light dark:bg-darklight p-5 border border-border dark:border-dark_border rounded-xl">
                  <span className="text-xl font-bold text-primary">
                    🎉 Free Course
                  </span>
                  <p className="text-md text-gray dark:text-gray-300">
                    This course is completely free when you enroll in or purchase any
                    other paid course.
                  </p>
                  <p className="text-base text-gray dark:text-gray-400">
                    • No additional charges
                  </p>
                </div>
              ) : (
                <div className="bg-light dark:bg-darklight p-5 border border-border dark:border-dark_border rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-midnight_text dark:text-white">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 bg-white dark:bg-darkmode text-primary p-2 sm:p-3 rounded-lg">
                        <FiVideo className="text-base sm:text-lg" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-midnight_text dark:text-white">
                          Live Interactive Classes
                        </p>
                        <p className="text-xs sm:text-sm text-gray dark:text-gray-400">
                          Attend real-time sessions with expert mentors.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 bg-white dark:bg-darkmode text-primary p-2 sm:p-3 rounded-lg">
                        <FiAward className="text-base sm:text-lg" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-midnight_text dark:text-white">
                          Free Soft Skills Course
                        </p>
                        <p className="text-xs sm:text-sm text-gray dark:text-gray-400">
                          Communication, interview prep & personality development included.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Price Card */}
          <div className="lg:mt-0">
            <div className="bg-white dark:bg-semidark rounded-2xl border border-border dark:border-dark_border overflow-hidden sticky top-24">
              <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiImage size={48} className="text-gray-500" />
                  </div>
                )}
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <FiPlayCircle className="w-8 h-8 text-primary" />
                  </div>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray dark:text-gray-400">Course Price</span>
                  {Number(course.price) > 0 && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      Includes GST
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-5">
                  {Number(course.price) === 0 ? (
                    <>
                      <span className="text-4xl font-bold text-primary">Free</span>
                      <span className="text-sm text-gray dark:text-gray-400">• No payment required</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-midnight_text dark:text-white">
                        ₹{Number(course.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-gray dark:text-gray-400">+ taxes</span>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {role === "admin" || role === "superadmin" ? (
                    <button
                      onClick={handleEdit}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-skyBlue transition-colors duration-200 font-medium"
                    >
                      <FiEdit size={18} /> Edit Course Details
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleAdd}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-skyBlue transition-colors duration-200 font-medium"
                      >
                        <FiShoppingCart size={18} /> Add to Cart
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-border dark:border-dark_border rounded-xl hover:bg-light dark:hover:bg-darklight text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200"
                      >
                        <FiShare2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section - Clean, no card styling */}
        {details?.description && (
          <div className="mt-10 pt-6 border-t border-border dark:border-dark_border">
            <h2 className="text-xl md:text-2xl font-bold text-midnight_text dark:text-white mb-4">
              Course Description
            </h2>
            <p className="text-gray dark:text-gray-300 leading-relaxed">
              {details.description}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2  ">
          {/* Objectives Section */}
          {details?.objectives?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border dark:border-dark_border">
              <div className="flex items-center gap-3 mb-5">
                <FiTarget className="text-primary" size={22} />
                <h2 className="text-xl md:text-2xl font-bold text-midnight_text dark:text-white">
                  What you'll learn
                </h2>
              </div>
              <ul className="space-y-3">
                {details.objectives.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheckCircle className="text-primary mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements Section */}
          {details?.requirements?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border dark:border-dark_border">
              <div className="flex items-center gap-3 mb-5">
                <FiFileText className="text-primary" size={22} />
                <h2 className="text-xl md:text-2xl font-bold text-midnight_text dark:text-white">
                  Requirements
                </h2>
              </div>
              <ul className="space-y-3">
                {details.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                    <span className="text-gray dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Curriculum Section */}
        {details?.curriculum?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border dark:border-dark_border">
            <div className="flex items-center gap-3 mb-5">
              <FiBookOpen className="text-primary" size={22} />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-midnight_text dark:text-white">
                  Course Curriculum
                </h2>
                <p className="text-sm text-gray dark:text-gray-400">
                  {details.curriculum.length} weeks • {totalSessions} sessions • {totalHours}+ hours
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {details.curriculum.map((week, w) => (
                <div
                  key={w}
                  className="border border-border dark:border-dark_border rounded-xl overflow-hidden"
                >
                  <div
                    onClick={() => toggleWeek(w)}
                    className="p-4 bg-light dark:bg-darklight/30 cursor-pointer hover:bg-light dark:hover:bg-darklight/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {w + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-midnight_text dark:text-white">
                            {week.title}
                          </h4>
                          <p className="text-xs text-gray dark:text-gray-400">
                            {week.sessions?.length || 0} sessions • {week.duration || "2-3 hours"}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {expandedWeeks.includes(w) ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {expandedWeeks.includes(w) && (
                    <div className="p-4 border-t border-border dark:border-dark_border">
                      <div className="space-y-2">
                        {week.sessions.map((s, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-light dark:hover:bg-darklight/30 transition-colors"
                          >
                            <div className="w-6 h-6 bg-gray-100 dark:bg-darklight rounded-md flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-midnight_text dark:text-white font-medium">
                                {s.title}
                              </p>
                              {(s.duration || s.type) && (
                                <p className="text-xs text-gray dark:text-gray-400">
                                  {s.duration && `${s.duration} min`}
                                  {s.duration && s.type && " • "}
                                  {s.type}
                                </p>
                              )}
                            </div>
                            {s.isCompleted && (
                              <FiCheckCircle className="text-green-500" size={16} />
                            )}
                          </div>
                        ))}
                      </div>

                      {week.outcomes && week.outcomes.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-dashed border-border dark:border-dark_border">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            Week {w + 1} Outcomes
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {week.outcomes.map((outcome, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
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

        {/* Related Courses */}
        <div className="mt-10">
          <RelatedCourses currentCourseId={course._id} />
        </div>
      </div>
    </div>
  );
};

export default CommonCourseDetails;
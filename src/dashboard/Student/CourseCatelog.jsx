import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';
import { useAddItemMutation } from '@/Services/student/cartServices';

import { Clock, BookOpen, ShoppingCart, Search, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '@/features/cartSlice';
import { useCourses } from '@/hooks/useCourses';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

/* ============================
   Course Card Component
============================ */

const CourseCard = ({ course, handleAdd, isAdded, isEnrolled, index }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const canAddToCart = !isEnrolled && course.price > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={`rounded-2xl border shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col group ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Image Container */}
      <div className={`relative h-48 overflow-hidden ${
        isDark ? 'bg-slate-700' : 'bg-gray-100'
      }`}>
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur ${
            isDark
              ? 'bg-slate-700/95 text-slate-200'
              : 'bg-white/95 text-gray-900'
          }`}>
            {course.category}
          </span>
        </div>

        {/* Status Badge */}
        {isEnrolled ? (
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 ${
              isDark
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
            }`}>
              <Star size={12} className="fill-current" />
              Enrolled
            </span>
          </div>
        ) : course.price === 0 && (
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
            }`}>
              FREE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className={`font-bold text-base sm:text-lg line-clamp-2 mb-2 ${
          isDark ? 'text-slate-100' : 'text-gray-900'
        }`}>
          {course.name}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm line-clamp-2 mb-3 flex-1 ${
          isDark ? 'text-slate-400' : 'text-gray-600'
        }`}>
          {course.shortdescription}
        </p>

        {/* Meta Info Chips */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`flex items-center gap-1.5 rounded-lg p-2 ${
            isDark ? 'bg-slate-700' : 'bg-blue-50'
          }`}>
            <Clock size={14} className={`flex-shrink-0 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`text-xs font-medium ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>{course.duration}</span>
          </div>
          <div className={`flex items-center gap-1.5 rounded-lg p-2 ${
            isDark ? 'bg-slate-700' : 'bg-purple-50'
          }`}>
            <BookOpen size={14} className={`flex-shrink-0 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <span className={`text-xs font-medium ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>{course.totalLessons}</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className={`border-t pt-3 ${
          isDark ? 'border-slate-700' : 'border-gray-200'
        }`}>
          {/* Price */}
          <div className="mb-3">
            {course.price === 0 ? (
              <span className={`text-sm font-bold ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>
                Completely FREE
              </span>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className={`text-lg sm:text-xl font-bold ${
                  isDark ? 'text-slate-200' : 'text-gray-900'
                }`}>
                  ₹{course.price}
                </span>
                <span className={`text-xs ${
                  isDark ? 'text-slate-500' : 'text-gray-500'
                }`}>One-time</span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/dashboard/course/${course._id}`)}
              className={`flex-1 border text-xs sm:text-sm font-semibold py-2.5 rounded-lg transition ${
                isDark
                  ? 'border-slate-600 text-slate-200 hover:bg-slate-700'
                  : 'border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              View Details
            </motion.button>

            {canAddToCart && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAdd(course)}
                disabled={isAdded}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold py-2.5 rounded-lg transition ${
                  isAdded
                    ? isDark
                      ? 'bg-green-700 text-white hover:bg-green-800'
                      : 'bg-green-600 text-white hover:bg-green-700'
                    : isDark
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isAdded ? (
                  <>Added</>
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    Add Cart
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


/* ============================
   Course Catalog Component
============================ */

const CourseCatalog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [searchQuery, setSearchQuery] = useState('');
  const userId = useSelector(state => state.auth.user?.id);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /* ---------- Enrolled IDs ---------- */
  const {
    data: enrolledIdsData,
    isLoading: enrolledLoading,
    error: enrolledError
  } = useGetStudentEnrolledCoursesQuery({ type: "ids" });

  const enrolledIds = enrolledIdsData?.data || [];

  /* ---------- Unenrolled Courses ---------- */
  const {
    courses,
    isLoading: coursesLoading,
    error: coursesError
  } = useCourses();

  const [addItem] = useAddItemMutation();

  /* ---------- Add To Cart ---------- */
  const handleAdd = async (course) => {
    if (!userId) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addItem({ userId, courseId: course._id }).unwrap();
      dispatch(addItemToCart(course));
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  /* ---------- Search Filter ---------- */
  const filteredCourses = useMemo(() => {
    return courses?.filter(course =>
      [course.name, course.description]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  /* ---------- Loading ---------- */
  if (enrolledLoading || coursesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className={`w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4 ${
            isDark
              ? 'border-slate-600 border-t-indigo-500'
              : 'border-blue-200 border-t-blue-600'
          }`}></div>
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>Loading courses...</p>
        </div>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (enrolledError || coursesError) {
    return (
      <div className="text-center py-16">
        <h3 className={`font-semibold ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>Something went wrong</h3>
        <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Please try again later</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 ${
      isDark ? 'bg-slate-900' : 'bg-gray-50'
    }`}>

      {/* ===== Page Header with Gradient ===== */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg ${
          isDark
            ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
            : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-8 h-8" />
              Explore Courses
            </h1>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-blue-100'}`}>
              Discover and enroll in amazing courses to advance your skills
            </p>
          </div>
        </div>
      </motion.div>

      {/* ===== Search Bar ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="relative">
          <Search
            size={20}
            className={isDark ? 'absolute left-4 top-3.5 text-slate-500' : 'absolute left-4 top-3.5 text-gray-400'}
          />
          <input
            type="text"
            placeholder="Search courses by name or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 sm:py-4 border rounded-xl sm:rounded-2xl text-sm focus:outline-none focus:ring-2 transition shadow-sm hover:shadow-md ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-indigo-500 focus:border-transparent'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
        </div>
      </motion.div>

      {/* ===== Stats ===== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`border rounded-xl px-4 py-3 sm:py-4 ${
          isDark
            ? 'bg-slate-700/50 border-slate-600'
            : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100'
        }`}
      >
        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
          <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{filteredCourses?.length || 0}</span>
          <span className={isDark ? 'text-slate-400' : 'text-gray-600'}> courses available</span>
        </p>
      </motion.div>

      {/* ===== Course Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses?.map((course, index) => {
          const isEnrolled = enrolledIds.includes(course._id);
          const isAdded = cartItems?.some(item => item._id === course._id);

          return (
            <CourseCard
              key={course._id}
              course={course}
              handleAdd={handleAdd}
              isEnrolled={isEnrolled}
              isAdded={isAdded}
              index={index}
            />
          );
        })}
      </div>

      {/* ===== Empty State ===== */}
      {filteredCourses?.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <Search size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>No courses found</h3>
          <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Try adjusting your search or browse all available courses</p>
        </motion.div>
      )}
    </div>
  );
};

export default CourseCatalog;
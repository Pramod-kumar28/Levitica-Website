import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';
import { useAddItemMutation } from '@/Services/student/cartServices';
import { Clock, BookOpen, ShoppingCart, Search, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { addItemToCart } from '@/features/cartSlice';
import { useCourses } from '@/hooks/useCourses';
import { motion } from 'framer-motion';

/* ============================
   COURSE CARD
============================ */

const CourseCard = ({ course, handleAdd, isAdded, isEnrolled }) => {
  const navigate = useNavigate();
  const canAddToCart = !isEnrolled && course.price > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="
        rounded-2xl overflow-hidden flex flex-col group
        bg-white border border-border shadow-property
        hover:shadow-deatail_shadow transition-all
        dark:bg-semidark dark:border-dark_border
      "
    >
      <div className="relative h-48 overflow-hidden bg-light dark:bg-darklight">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-white dark:bg-darklight text-midnight_text dark:text-white">
          {course.category}
        </span>

        {isEnrolled && (
          <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-primary text-white flex items-center gap-1">
            <Star size={12} /> Enrolled
          </span>
        )}

        {!isEnrolled && course.price === 0 && (
          <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-skyBlue text-white">
            FREE
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-midnight_text dark:text-white mb-2 line-clamp-2">
          {course.name}
        </h3>

        <p className="text-sm text-gray mb-3 line-clamp-2 flex-1">
          {course.shortdescription}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-light dark:bg-darklight">
            <Clock size={14} className="text-primary" />
            <span className="text-xs text-gray">{course.duration}</span>
          </div>

          {/* <div className="flex items-center gap-2 p-2 rounded-lg bg-light dark:bg-darklight">
            <BookOpen size={14} className="text-skyBlue" />
            <span className="text-xs text-gray">{course.totalLessons}</span>
          </div> */}
        </div>

        <div className="border-t border-border dark:border-dark_border pt-3 mb-3">
          {course.price === 0 ? (
            <span className="text-primary font-semibold text-sm">
              Completely FREE
            </span>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-midnight_text dark:text-white">
                ₹{course.price}
              </span>
              <span className="text-xs text-gray">one-time</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/course/${course._id}`)}
            className="
              flex-1 py-2 rounded-lg text-sm font-medium
              border border-border text-midnight_text hover:bg-light
              dark:border-dark_border dark:text-white dark:hover:bg-darklight
            "
          >
            View
          </button>

          {canAddToCart && (
            <button
              onClick={() => handleAdd(course)}
              className={`
                  flex-1 flex items-center justify-center gap-1
                  py-2 rounded-lg text-sm font-medium transition
                  ${isAdded
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-primary text-white hover:bg-blue-700"
                      }
                  `}
            >
              <ShoppingCart size={14} />
              {isAdded ? "Added" : "Cart"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};


/* ============================
   MAIN PAGE
============================ */

const CourseCatalog = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  const userId = useSelector(state => state.auth.user?.id);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const { data: enrolledIdsData } = useGetStudentEnrolledCoursesQuery({ type: "ids" });
  const enrolledIds = enrolledIdsData?.data || [];

  const { courses = [], isLoading } = useCourses();
  const [addItem] = useAddItemMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = async (course) => {
    try {
      await addItem({ userId, courseId: course._id }).unwrap();
      dispatch(addItemToCart(course));
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed");
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  return (
    <div className="min-h-screen p-6 space-y-8 lg:px-6 lg:py-6">

      {/* HEADER */}
      <motion.div
        initial={mounted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className=" px-2
        "
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp size={24} className="text-primary" /> Explore <span className="text-primary">Courses</span>
        </h1>
        <p className="text-sm mt-1 text-gray opacity-90">
          Learn and grow your skills
        </p>
      </motion.div>

      {/* SEARCH */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-3 text-gray" />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search courses..."
          className="
            w-full pl-10 py-3 rounded-xl
            border border-border bg-white
            text-midnight_text
            focus:ring-2 focus:ring-primary
            dark:bg-semidark dark:border-dark_border dark:text-white
          "
        />
      </div>

      {/* GRID */}
      <div className="min-h-[500px]">
        {isLoading ? (
          <div className="text-center text-gray py-20">
            Loading courses...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                handleAdd={handleAdd}
                isEnrolled={enrolledIds.includes(course._id)}
                isAdded={cartItems.some(i => i._id === course._id)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default CourseCatalog;
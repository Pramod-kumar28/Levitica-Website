import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';
import { useAddItemMutation } from '@/Services/student/cartServices';

import { Clock, BookOpen, ShoppingCart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '@/features/cartSlice';
import { useCourses } from '@/hooks/useCourses';

/* ============================
   Course Card Component
============================ */

const CourseCard = ({ course, handleAdd, isAdded, isEnrolled }) => {
  const navigate = useNavigate();

  const canAddToCart = !isEnrolled && course.price > 0;

  return (
    <div className="bg-white border rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition">

      {/* Image */}
      <div className="relative h-40">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {course.category}
        </span>

        {/* Enrolled Badge */}
        {isEnrolled && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Enrolled
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">
          {course.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {course.shortdescription}
        </p>

        <div className="flex gap-4 text-xs text-gray-500 mt-3">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> {course.totalLessons} lessons
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          {course.price === 0 ? (
            <span className="text-green-600 font-semibold">
              FREE
            </span>
          ) : (
            <span className="font-semibold text-sm">
              ₹{course.price}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => navigate(`/dashboard/course/${course._id}`)}
            className="flex-1 border text-sm py-2 rounded-lg hover:bg-gray-100"
          >
            View Details
          </button>

          {canAddToCart && (
            <button
              onClick={() => handleAdd(course)}
              disabled={isAdded}
              className={`
                flex-1
                flex
                items-center
                justify-center
                gap-1
                text-sm
                py-2
                rounded-lg
                font-medium
                ${isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {isAdded ? 'Added' : 'Add to Cart'}
              {!isAdded && <ShoppingCart size={14} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


/* ============================
   Course Catalog Component
============================ */

const CourseCatalog = () => {
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
        <p className="text-gray-500">Loading courses...</p>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (enrolledError || coursesError) {
    return (
      <div className="text-center py-16">
        <h3 className="font-semibold">Something went wrong</h3>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Live Course Catalog</h1>
          <p className="text-sm text-gray-500">
            Browse and enroll in interactive live classes
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border rounded-lg py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses?.map(course => {
          const isEnrolled = enrolledIds.includes(course._id);
          const isAdded = cartItems?.some(item => item._id === course._id);

          return (
            <CourseCard
              key={course._id}
              course={course}
              handleAdd={handleAdd}
              isEnrolled={isEnrolled}
              isAdded={isAdded}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses?.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-400" />
          <h3 className="mt-4 font-semibold">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
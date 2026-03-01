import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useGetStudentEnrolledCoursesQuery } from '../../../Services/student/enrollFormServices';
import { useAddItemMutation } from '../../../Services/student/cartServices';

import { Clock, BookOpen, ShoppingCart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../../features/cartSlice';
import { useCourses } from '../../../hooks/useCourses';

/* ============================
   Course Card Component
============================ */

const CourseCard = ({ course, handleAdd, isAdded, isEnrolled }) => {
  const navigate = useNavigate();

  const canAddToCart = !isEnrolled && course.price > 0;

  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-overflow-hidden tw-flex tw-flex-col hover:tw-shadow-lg tw-transition">

      {/* Image */}
      <div className="tw-relative tw-h-40">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="tw-w-full tw-h-full tw-object-cover"
        />

        <span className="tw-absolute tw-top-2 tw-left-2 tw-bg-black/70 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded">
          {course.category}
        </span>

        {/* Enrolled Badge */}
        {isEnrolled && (
          <span className="tw-absolute tw-top-2 tw-right-2 tw-bg-green-600 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded">
            Enrolled
          </span>
        )}
      </div>

      {/* Content */}
      <div className="tw-p-4 tw-flex-1">
        <h3 className="tw-font-semibold tw-text-sm tw-line-clamp-2">
          {course.name}
        </h3>

        <p className="tw-text-xs tw-text-gray-500 tw-mt-1 tw-line-clamp-2">
          {course.shortdescription}
        </p>

        <div className="tw-flex tw-gap-4 tw-text-xs tw-text-gray-500 tw-mt-3">
          <span className="tw-flex tw-items-center tw-gap-1">
            <Clock size={14} /> {course.duration}
          </span>
          <span className="tw-flex tw-items-center tw-gap-1">
            <BookOpen size={14} /> {course.totalLessons} lessons
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="tw-border-t tw-p-4">
        <div className="tw-flex tw-items-center tw-justify-between">
          {course.price === 0 ? (
            <span className="tw-text-green-600 tw-font-semibold">
              FREE
            </span>
          ) : (
            <span className="tw-font-semibold tw-text-sm">
              ₹{course.price}
            </span>
          )}
        </div>

        <div className="tw-flex tw-gap-2 tw-mt-3">
          <button
            onClick={() => navigate(`/dashboard/course/${course._id}`)}
            className="tw-flex-1 tw-border tw-text-sm tw-py-2 tw-rounded-lg hover:tw-bg-gray-100"
          >
            View Details
          </button>

          {canAddToCart && (
            <button
              onClick={() => handleAdd(course)}
              disabled={isAdded}
              className={`
                tw-flex-1
                tw-flex
                tw-items-center
                tw-justify-center
                tw-gap-1
                tw-text-sm
                tw-py-2
                tw-rounded-lg
                tw-font-medium
                ${isAdded
                  ? 'tw-bg-green-600 tw-text-white'
                  : 'tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white'
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
      <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
        <p className="tw-text-gray-500">Loading courses...</p>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (enrolledError || coursesError) {
    return (
      <div className="tw-text-center tw-py-16">
        <h3 className="tw-font-semibold">Something went wrong</h3>
        <p className="tw-text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="tw-w-full tw-space-y-8">

      {/* Header */}
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4">
        <div>
          <h1 className="tw-text-2xl tw-font-bold">Live Course Catalog</h1>
          <p className="tw-text-sm tw-text-gray-500">
            Browse and enroll in interactive live classes
          </p>
        </div>

        {/* Search */}
        <div className="tw-relative tw-w-full md:tw-w-80">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="tw-w-full tw-border tw-rounded-lg tw-py-2 tw-pl-10 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
          <Search
            size={18}
            className="tw-absolute tw-left-3 tw-top-2.5 tw-text-gray-400"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6">
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
        <div className="tw-text-center tw-py-16">
          <Search size={48} className="tw-mx-auto tw-text-gray-400" />
          <h3 className="tw-mt-4 tw-font-semibold">No courses found</h3>
          <p className="tw-text-gray-500">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
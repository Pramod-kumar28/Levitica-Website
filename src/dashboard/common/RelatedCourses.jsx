import { useNavigate } from "react-router-dom";
import { useCourses } from '@/hooks/useCourses';

const RelatedCourses = ({ currentCourseId }) => {
  const navigate = useNavigate();
  const { courses, isLoading } = useCourses();

  if (isLoading) return null;

  // Remove current course
  const filteredCourses =
    courses?.filter((c) => c._id !== currentCourseId) || [];

  // Shuffle and pick 3 random courses
  const randomCourses = [...filteredCourses]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (randomCourses.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mt-8">
      <h2 className="font-bold text-2xl text-gray-900 mb-6">
        You might also like
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomCourses.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/dashboard/course/${item._id}`)}
            className="group cursor-pointer transition duration-300 hover:scale-[1.02]"
          >
            {/* Thumbnail */}
            <div className="relative h-40 rounded-xl mb-3 overflow-hidden bg-gray-100">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>

            {/* Short Description */}
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.shortDescription || "Explore this comprehensive course."}
            </p>

            {/* Price */}
            <p className="text-sm font-bold mt-1">
              {Number(item.price) === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span className="text-blue-600">
                  ₹{item.price}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedCourses;
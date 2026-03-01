import { useNavigate } from "react-router-dom";
import { useCourses } from "../../../hooks/useCourses";

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
    <div className="tw-bg-white tw-rounded-2xl tw-border tw-border-gray-200 tw-p-6 md:tw-p-8 tw-shadow-sm tw-mt-8">
      <h2 className="tw-font-bold tw-text-2xl tw-text-gray-900 tw-mb-6">
        You might also like
      </h2>

      <div className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
        {randomCourses.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/dashboard/course/${item._id}`)}
            className="tw-group tw-cursor-pointer tw-transition tw-duration-300 hover:tw-scale-[1.02]"
          >
            {/* Thumbnail */}
            <div className="tw-relative tw-h-40 tw-rounded-xl tw-mb-3 tw-overflow-hidden tw-bg-gray-100">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="tw-w-full tw-h-full tw-object-cover"
                />
              ) : (
                <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="tw-font-semibold tw-text-gray-900 group-hover:tw-text-blue-600 tw-transition-colors">
              {item.name}
            </h3>

            {/* Short Description */}
            <p className="tw-text-sm tw-text-gray-500 tw-line-clamp-2">
              {item.shortDescription || "Explore this comprehensive course."}
            </p>

            {/* Price */}
            <p className="tw-text-sm tw-font-bold tw-mt-1">
              {Number(item.price) === 0 ? (
                <span className="tw-text-green-600">Free</span>
              ) : (
                <span className="tw-text-blue-600">
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
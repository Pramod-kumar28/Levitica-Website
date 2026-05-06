import { useNavigate } from "react-router-dom";
import { useCourses } from '@/hooks/useCourses';

const RelatedCourses = ({ currentCourseId }) => {
  const navigate = useNavigate();
  const { courses, isLoading } = useCourses();

  if (isLoading) return null;

  const filteredCourses =
    courses?.filter((c) => c._id !== currentCourseId) || [];

  const randomCourses = [...filteredCourses]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (randomCourses.length === 0) return null;

  return (
    <div className="
      bg-white dark:bg-semidark
      rounded-2xl
      border border-border dark:border-dark_border
      p-6 md:p-8
      shadow-property
      hover:shadow-deatail_shadow
      transition-all duration-300
      mt-8
    ">
      <h2 className="
        font-bold text-2xl
        text-midnight_text dark:text-white
        mb-6
      ">
        You might also like
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomCourses.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/dashboard/course/${item._id}`)}
            className="
              group cursor-pointer
              transition-all duration-300
              hover:scale-[1.02]
            "
          >
            {/* Thumbnail */}
            <div className="
              relative h-40 rounded-xl mb-3 overflow-hidden
              bg-light dark:bg-darklight
            ">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="
                  flex items-center justify-center h-full
                  text-gray
                ">
                  No Image
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="
              font-semibold
              text-midnight_text dark:text-white
              group-hover:text-primary
              transition-colors duration-200
            ">
              {item.name}
            </h3>

            {/* Description */}
            <p className="
              text-sm text-gray
              line-clamp-2
            ">
              {item.shortDescription || "Explore this comprehensive course."}
            </p>

            {/* Price */}
            <p className="text-sm font-bold mt-1">
              {Number(item.price) === 0 ? (
                <span className="text-primary">
                  Free
                </span>
              ) : (
                <span className="text-primary">
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
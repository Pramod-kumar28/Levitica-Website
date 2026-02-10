import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiEdit,
  FiShoppingCart,
  FiClock,
  FiTag,
  FiCheckCircle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAddItemMutation } from '../../../Services/student/cartServices';


import {
  useGetCourseByIdQuery,
  
} from "../../../Services/sharedServices/courses.Services";
import { MODAL_TYPES, useModal } from "../Admin/Modals/ModalContext";

const CommonCourseDetails = () => {

  const { id } = useParams();

  const{openModal}=useModal()

  console.log('common for both ' ,id)

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


  if (isLoading) {
    return <div className="tw-p-6">Loading...</div>;
  }

  if (!course) {
    return <div className="tw-p-6">Course not found</div>;
  }
  console.log("iam common ",course)

  const details = course.details;
return (
  <div className="tw-max-w-7xl tw-mx-auto tw-p-4 sm:tw-p-6 tw-space-y-8">
    {/* ===== Hero Section ===== */}
    <div className="tw-grid lg:tw-grid-cols-3 tw-gap-6">
      {/* Left: Info */}
      <div className="lg:tw-col-span-2 tw-space-y-4">
        <h1 className="tw-text-2xl sm:tw-text-3xl tw-font-bold">
          {course.name}
        </h1>

        <div className="tw-flex tw-flex-wrap tw-gap-4 tw-text-sm tw-text-gray-600">
          <span className="tw-flex tw-items-center tw-gap-1">
            <FiTag /> {course.category}
          </span>
          <span className="tw-flex tw-items-center tw-gap-1">
            <FiClock /> {course.duration}
          </span>
        </div>

        {/* Action buttons */}
        <div className="tw-flex tw-gap-6 tw-items-center tw-flex-wrap">
          {role === "admin" ? (
            <button
              onClick={handleEdit}
              className="tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-border tw-px-4 tw-py-2 tw-bg-blue-700 tw-text-white hover:tw-bg-blue-500"
            >
              <FiEdit /> Edit Course Details
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-bg-blue-600 tw-text-white tw-px-5 tw-py-2 hover:tw-bg-blue-700"
            >
              <FiShoppingCart /> Add to Cart
            </button>
          )}
          
        </div>
      </div>

      {/* Right: Thumbnail */}
      <div className="tw-bg-white tw-border tw-rounded-xl tw-overflow-hidden tw-shadow-sm">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.name}
            className="tw-w-full tw-h-56 sm:tw-h-70 tw-object-cover"
          />
        ) : (
          <div className="tw-h-56 sm:tw-h-64 tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-text-gray-400">
            No Image
          </div>
        )}

        {/* Price */}
        <div className="tw-p-4 tw-border-t">

      <span className="tw-text-xl tw-font-bold tw-text-orange-600">
  ₹{course.price}
</span>
        </div>
       
      </div>
    </div>

    {/* ===== Description ===== */}
    {details?.description && (
      <div className="tw-bg-white tw-rounded-xl tw-border tw-p-5">
        <h2 className="tw-font-semibold tw-text-lg tw-mb-2">
          Course Description
        </h2>
        <p className="tw-text-gray-700 tw-leading-relaxed">
          {details.description}
        </p>
      </div>
    )}

    {/* ===== Objectives & Requirements ===== */}
    <div className="tw-grid md:tw-grid-cols-2 tw-gap-6">
      {details?.objectives?.length > 0 && (
        <div className="tw-bg-white tw-rounded-xl tw-border tw-p-5">
          <h3 className="tw-font-semibold tw-mb-3">What you’ll learn</h3>
          <ul className="tw-space-y-2">
            {details.objectives.map((item, i) => (
              <li
                key={i}
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm"
              >
                <FiCheckCircle className="tw-text-green-600 tw-mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {details?.requirements?.length > 0 && (
        <div className="tw-bg-white tw-rounded-xl tw-border tw-p-5">
          <h3 className="tw-font-semibold tw-mb-3">Requirements</h3>
          <ul className="tw-space-y-2 tw-text-sm tw-text-gray-700">
            {details.requirements.map((req, i) => (
              <li key={i}>• {req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* ===== Curriculum ===== */}
    {details?.curriculum?.length > 0 && (
      <div className="tw-bg-white tw-rounded-xl tw-border tw-p-5">
        <h2 className="tw-font-semibold tw-text-lg tw-mb-4">
          Course Curriculum
        </h2>

        <div className="tw-space-y-4">
          {details.curriculum.map((week, w) => (
            <div
              key={w}
              className="tw-border tw-rounded-lg tw-p-4"
            >
              <h4 className="tw-font-medium">
                Week {w+1 } : {week.title}
              </h4>

              <ul className="tw-mt-2 tw-space-y-1 tw-text-sm tw-text-gray-700">
                {week.sessions.map((s, i) => (
                  <li key={i}>• {s.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

};

export default CommonCourseDetails;

import { Loader2, X } from "lucide-react";
import { useGetStudentEnrollmentsQuery } from "../../../Services/admin/assignService";

const StudentDetailsModal = ({ userId, handleClose }) => {
  const { data, isLoading, isError } = useGetStudentEnrollmentsQuery(userId);

  const student = data?.data?.user;
  const courses = data?.data?.enrolledCourses || [];
  console.log(data)


  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="tw-p-10 tw-text-center">
        <Loader2 className="tw-animate-spin tw-mx-auto" />
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <div className="tw-p-6 tw-text-red-500">
        Failed to load student details
      </div>
    );
  }

  return (
    <div className="tw-p-6 tw-space-y-6 tw-max-h-[80vh] tw-overflow-y-auto">
      
      {/* ================= HEADER ================= */}
      <div className="tw-flex tw-justify-between tw-items-center">
        <h2 className="tw-text-xl tw-font-bold">Student Details</h2>
        <button onClick={handleClose}>
          <X size={20} />
        </button>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="tw-flex tw-items-center tw-gap-4 tw-border tw-rounded-lg tw-p-4">
        <img
          src={student?.profileImage?.url || "/default-avatar.png"}
          alt={student?.name}
          className="tw-w-14 tw-h-14 tw-rounded-full tw-object-cover"
        />

        <div>
          <p className="tw-font-semibold">{student?.name || "Unknown User"}</p>

          <p className="tw-text-sm tw-text-gray-500">
            {student?.email || "No email"}
          </p>

          <p className="tw-text-sm">
            {student?.mobile || "Mobile not provided"}
          </p>

          <p className="tw-text-xs tw-mt-1">
            Status:{" "}
            <span
              className={`tw-font-medium ${
                student?.emailVerified
                  ? "tw-text-green-600"
                  : "tw-text-yellow-600"
              }`}
            >
              {student?.emailVerified ? "Verified" : "Pending"}
            </span>
          </p>
        </div>
      </div>

      {/* ================= COURSES ================= */}
      <div>
        <h3 className="tw-font-semibold tw-mb-3">
          Enrolled Courses ({courses.length})
        </h3>

        {/* -------- No courses -------- */}
        {courses.length === 0 && (
          <div className="tw-border tw-rounded-lg tw-p-6 tw-text-center tw-text-gray-500">
            This student hasn't enrolled in any course yet.
          </div>
        )}

        {/* -------- Course list -------- */}
        <div className="tw-space-y-3">
          {courses.map((courseItem, i) => {
            const course = courseItem.course;

            return (
              <div
                key={i}
                className="tw-border tw-rounded-lg tw-p-4 tw-flex tw-gap-4"
              >
                {/* Thumbnail */}
                <img
                  src={course?.thumbnail || "/course-placeholder.png"}
                  alt={course?.name}
                  className="tw-w-16 tw-h-16 tw-object-cover tw-rounded"
                />

                {/* Course info */}
                <div className="tw-flex-1">
                  <p className="tw-font-medium">
                    {course?.name || "Course removed"}
                  </p>

                  <p className="tw-text-xs tw-text-gray-500">
                    {course?.category || "No category"}
                  </p>

                  <p className="tw-text-xs tw-text-gray-400">
                    Duration: {course?.duration || "N/A"}
                  </p>

                  {/* Batch */}
                  <p className="tw-text-xs tw-mt-1">
                    Batch:{" "}
                    <span className="tw-font-medium">
                      {courseItem.batch?.batchName || "Not assigned"}
                    </span>
                  </p>

                  {/* Payment */}
                  <p className="tw-text-xs tw-mt-1">
                    Payment:{" "}
                    {courseItem.paymentId ? (
                      <span className="tw-text-green-600">
                        ₹{courseItem.paymentId.amountInRupees}
                      </span>
                    ) : (
                      <span className="tw-text-gray-500">
                        No payment record
                      </span>
                    )}
                  </p>

                  {/* Progress */}
                  <p className="tw-text-xs tw-mt-1">
                    Progress: {courseItem.progress || 0}%
                  </p>

                  {/* Completed */}
                  {courseItem.completed && (
                    <span className="tw-text-xs tw-text-green-600 tw-font-medium">
                      Completed
                    </span>
                  )}
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
import { api } from "../api";

export const enrollCourseApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ENROLLED COURSE DETAILS
    getStudentEnrolledCoursedetails: builder.query({
      query: (courseId) => ({
        url: `/student/enrollments/details/${courseId}`,
        method: "GET",
      }),
      providesTags: (result, error, courseId) => [
        { type: "Enrollments", id: courseId },
      ],
    }),

    // ✅ GET ALL ENROLLED COURSES
    getStudentEnrolledCourses: builder.query({
      query: ({ type }) => ({
        url: "/student/enrollments",
        method: "GET",
        params: { type },
      }),
      providesTags: ["Enrollments"],
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetStudentEnrolledCoursedetailsQuery,
  useGetStudentEnrolledCoursesQuery,
} = enrollCourseApi;
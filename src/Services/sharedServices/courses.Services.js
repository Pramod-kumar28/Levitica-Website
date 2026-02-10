// redux/api/courseApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from "../../config/apiConfig";

export const courseApi = createApi({
  ...createApiService({
    reducerPath: 'courseApi',
    baseUrl: '/api/courses',
    tagTypes: ['Course'],
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/',
      providesTags: ['Course']
    }),
   
   
     getCourseById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

   
  })
});

export const {
  
  useGetCoursesQuery,
  
  useLazyGetCoursesQuery,
 
  useGetCourseByIdQuery,
  
} = courseApi;


import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const statsApi = createApi({
  ...createApiService({
    reducerPath: 'statsApi',
    baseUrl: '/admin/stats',
    tagTypes: ['adminstats'],
  }),
  endpoints: (builder) => ({
    
    getStats:builder.query({
      query:()=>({
        url:`/get-stats`,
        method:'GET'
      }),
      providesTags: ['adminstats'],
    }),
    createUser:builder.mutation({
      query:(data)=>({
        url:'/create-user',
        method:"POST",
        body:data
      }),
      invalidatesTags:['adminstats']
    })
  }),
});

export const { useGetStatsQuery,useCreateUserMutation} = statsApi;
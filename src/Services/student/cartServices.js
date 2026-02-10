// Services/student/cartServices.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const cartApi = createApi({
  ...createApiService({ 
    reducerPath: 'cartApi',
    baseUrl: '/api/cart',
    tagTypes: ['Cart'],
  }),
  endpoints: (builder) => ({
    getCart: builder.query({  
      query: (userId) => `/${userId}`,
      providesTags: ['Cart']
    }),
    addItem: builder.mutation({
      query: ({ userId, courseId }) => ({
        url: '/add',
        method: 'POST',
        body: { userId, courseId }
      }),
      invalidatesTags: ['Cart']
    }),
    removeItem: builder.mutation({
      query: ({ userId, courseId }) => ({
        url: '/remove',
        method: 'POST',
        body: { userId, courseId }
      }),
      invalidatesTags: ['Cart']
    }),
  
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/clear/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    })
  })
});

export const { 
  useGetCartQuery, 
  useAddItemMutation, 
  useRemoveItemMutation, 
  useClearCartMutation
} = cartApi;
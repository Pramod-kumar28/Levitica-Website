import { api } from "../api";

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // 🔹 Get Profile
        getProfile: builder.query({
            query: () => ({
                url: "/api/profile",
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        updateProfileInfo: builder.mutation({
            query: (data) => ({
                url: "/api/profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),

        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: "/api/profile/image",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Profile"],
        }),


        // 🔹 Delete Profile Image
        deleteProfileImage: builder.mutation({
            query: () => ({
                url: "/api/profile/image",
                method: "DELETE",
            }),
            invalidatesTags: ["Profile"],
        }),

    }),
    overrideExisting: false,
});

export const {
    useGetProfileQuery,
    useUpdateProfileInfoMutation,
    useUpdateProfileImageMutation,
    useDeleteProfileImageMutation,
} = profileApi;
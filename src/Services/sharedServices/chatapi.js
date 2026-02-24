import { api } from "../api"; 

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ message, userId }) => ({
        url: "/api/chat",
        method: "POST",
        body: { message, userId },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
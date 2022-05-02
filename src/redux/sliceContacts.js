import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import logger from "redux-logger";
// import { contacts } from "./sliceContacts";

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://626e3588034ec185d33a4426.mockapi.io/contacts" }),
  tagTypes: ["contacts"],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ["contacts"],
    }),
createContact: builder.mutation({
  query: (newContact) => ({
    url: `/contacts`,
    method: "POST",
    body: newContact,  
  }),
  invalidatesTags: ['contacts'],
}),
  removeContact: builder.mutation({
    query: (contactId) => ({
      url: `/contacts/${contactId}`,
      method: "DELETE",
    }),
    invalidatesTags: ["contacts"],
  }),
}),
})

export const {
  useFetchContactsQuery, useCreateContactMutation, useRemoveContactMutation,
} = contactsApi;
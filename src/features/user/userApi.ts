// src/features/user/userApi.ts
import { baseApi } from "../../lib/baseApi";
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
   
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body: { email: string; password: string }) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["User"],
     
    }),
    register:builder.mutation({
      query:(body)=>({url:"/auth/register",method:"POST",body}),
      invalidatesTags:["User"]
    })
  }),
  overrideExisting: true
});

export const {  useLoginMutation,useRegisterMutation } = userApi;

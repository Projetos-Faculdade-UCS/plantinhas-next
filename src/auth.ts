import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { ApiClient } from "./shared/api-client";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google
  ],
  callbacks: {
    jwt(params) {
      const authApiUrl = process.env.AUTH_API_URL;

      if (!params.account || !params.account.id_token) {
        return params;
      }

      ApiClient.getInstance().post(`${authApiUrl}/auth/api/v1/google/`, {}, {
        headers: {
          Authorization: `Bearer ${params.account.id_token}`,
          "Content-Type": "application/json",
        }
      })

      return params;
    },
  }
})
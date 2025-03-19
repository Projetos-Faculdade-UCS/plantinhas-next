import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { ApiClient } from './shared/api-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        jwt(params) {
            const authApiUrl = process.env.AUTH_API_URL;

            ApiClient.getInstance().post(
                `${authApiUrl}/sign-on`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${params.account?.access_token}`,
                    },
                },
            );

            return params;
        },
    },
});

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        jwt(params) {
            // const authApiUrl = process.env.AUTH_API_URL;

            // ApiClient.getInstance().post(
            //     `${authApiUrl}/sign-on`,
            //     {},
            //     {
            //         headers: {
            //             Authorization: `Bearer ${params.account?.access_token}`,
            //         },
            //     },
            // );

            return params;
        },
        session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
});

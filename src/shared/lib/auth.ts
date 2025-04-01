import NextAuth, { User as UserAuth } from 'next-auth';
import Google from 'next-auth/providers/google';
import { Services } from '../api/services';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID || '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.id_token) {
                const userSessionToken = await Services.auth.googleSignIn(
                    account.id_token,
                );
                if (userSessionToken.status === 200) {
                    const { access, refresh } = userSessionToken.data;
                    token.accessToken = access;
                    token.refreshToken = refresh;

                    const userData = await Services.auth.getUser(
                        token.accessToken,
                    );
                    token.user = {
                        ...token.user,
                        ...userData,
                    };
                } else {
                    console.error('Error on sign in', userSessionToken);
                }
            }

            return token;
        },
        async session({ session, token }) {
            session.refreshToken = token.refreshToken;
            session.accessToken = token.accessToken;
            session.user = {
                ...token.user,
                emailVerified: null,
                id: token.user.id!,
                email: token.user.email!,
            };
            return session;
        },
    },
});

declare module 'next-auth' {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    interface User {
        id?: string;
        username: string;
        first_name: string;
        last_name: string;
        picture: string;
    }
    interface Session {
        accessToken: string;
        refreshToken?: string;
    }
}
declare module '@auth/core/jwt' {
    interface JWT {
        accessToken: string;
        refreshToken?: string;
        user: UserAuth;
    }
}

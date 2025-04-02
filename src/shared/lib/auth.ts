import NextAuth, { User as UserAuth } from 'next-auth';
import Google from 'next-auth/providers/google';
import { Services } from '../api/services';

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        error: '/signin',
        signIn: '/signin',
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID || '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.id_token) {
                try {
                    const {
                        data: { access, refresh, exp },
                    } = await Services.auth.googleSignIn(account.id_token);
                    token.accessToken = access;
                    token.refreshToken = refresh;
                    token.exp = exp;

                    try {
                        const userData = await Services.auth.getUser(access);
                        token.user = {
                            ...token.user,
                            ...userData,
                        };
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        throw error;
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    throw error;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token.exp && token.exp < Date.now() / 1000) {
                try {
                    const newSession = await Services.auth.refreshToken(
                        token.refreshToken!,
                    );
                    const { access, refresh, exp } = newSession.data;
                    token.accessToken = access;
                    token.refreshToken = refresh;
                    session.accessToken = access;
                    session.refreshToken = refresh;
                    token.exp = exp;
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    session.error = 'RefreshTokenError';
                }
            }

            session.refreshToken = token.refreshToken;
            session.accessToken = token.accessToken;
            const { id, email, ...user } = token.user;
            session.user = {
                ...user,
                emailVerified: null,
                id: id!,
                email: email!,
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
        error?: 'RefreshTokenError';
    }
}
declare module '@auth/core/jwt' {
    interface JWT {
        accessToken: string;
        refreshToken?: string;
        user: UserAuth;
    }
}

import NextAuth, { User as UserAuth } from 'next-auth';
import Google from 'next-auth/providers/google';
import { Repositories } from '../api/repositories';

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        error: '/signin',
        signIn: '/signin',
    },
    session: {
        //TODO: Token.exp está fixo em 1 hora, mas deveria ser dinâmico
        // de acordo com o token retornado pelo servidor em `Repositories.auth.googleSignIn`
        maxAge: 1 * 60 * 60,
        strategy: 'jwt',
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
                    } = await Repositories.auth.googleSignIn(account.id_token);
                    token.accessToken = access;
                    token.refreshToken = refresh;
                    token.exp = exp;

                    try {
                        const userData =
                            await Repositories.profile.static.getUser(access);
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
            if (token.exp) {
                const expDate = new Date(token.exp! * 1000);
                if (expDate < new Date()) {
                    try {
                        const newSession = await Repositories.auth.refreshToken(
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

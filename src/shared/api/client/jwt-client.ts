import { auth, signIn } from '../../lib/auth';
import { HttpClient } from './http-client';

export class JWTClient extends HttpClient {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async getHeaders(headers: HeadersInit = {}) {
        const superHeaders = await super.getHeaders(headers);
        const session = await auth();
        if (session?.error === 'RefreshTokenError') {
            await signIn('google');
        }

        return {
            ...superHeaders,
            Authorization: `Bearer ${session?.accessToken}`,
        };
    }
}

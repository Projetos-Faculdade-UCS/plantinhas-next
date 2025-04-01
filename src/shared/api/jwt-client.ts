import { auth } from '../lib/auth';
import { HttpClient } from './http-client';

export class JWTClient extends HttpClient {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async getHeaders(headers: HeadersInit = {}) {
        const superHeaders = super.getHeaders(headers);
        const session = await auth();

        return {
            ...superHeaders,
            Authorization: `Bearer ${session?.accessToken}`,
        };
    }
}

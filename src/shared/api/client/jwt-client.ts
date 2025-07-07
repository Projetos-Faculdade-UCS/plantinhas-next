import { ResponseError } from '@/shared/types/http';
import { redirect } from 'next/navigation';
import { auth, signIn } from '../../lib/auth';
import { ForbiddenError } from './errors';
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

    protected async responseHandler<T>(response: Response) {
        try {
            return await super.responseHandler<T>(response);
        } catch (error) {
            if (error instanceof ForbiddenError) {
                const apiError = error.data as ResponseError;
                if (
                    apiError.errors.some(
                        (err) => err.code === 'authentication_failed',
                    )
                ) {
                    return redirect('/signin?error=authentication_failed');
                }
            }
            throw error;
        }
    }
}

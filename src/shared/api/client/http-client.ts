import { cookies } from 'next/headers';
import { Client } from '../../types/client';
import { CustomFetchProps, CustomResponse } from '../../types/http';
import { BadRequestError, NetWorkError } from './errors';

export class HttpClient implements Client {
    private baseUrl: string;
    private headers: HeadersInit = {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        'Accept-Language': 'pt-br',
    };

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
        if (!this.baseUrl) {
            throw new Error('Base URL is required');
        }
    }

    public async get<T>(url: string, init?: CustomFetchProps) {
        const { cache, headers, ...config } = init || {};
        const resp = await fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            headers: await this.getHeaders(headers),
            cache: cache,
            ...config,
        });

        return this.responseHandler<T>(resp);
    }

    public async post<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ) {
        const csrf = (await cookies()).get('csrftoken')?.value;
        const { headers, ...config } = init || {};

        const resp = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: await this.getHeaders({
                'X-CSRF-Token': csrf || '',
                ...headers,
            }),
            body: JSON.stringify(body),
            ...config,
        });

        return this.responseHandler<T>(resp);
    }

    public async patch<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ) {
        const csrf = (await cookies()).get('csrftoken')?.value;
        const { headers, ...config } = init || {};

        const resp = await fetch(`${this.baseUrl}${url}`, {
            method: 'PATCH',
            headers: await this.getHeaders({
                'X-CSRF-Token': csrf || '',
                ...headers,
            }),
            body: JSON.stringify(body),
            ...config,
        });

        return this.responseHandler<T>(resp);
    }

    public async delete(url: string, init?: CustomFetchProps) {
        const { headers, ...config } = init || {};
        const resp = await fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
            headers: await this.getHeaders(headers),
            ...config,
        });

        if (resp.status === 204) {
            return { status: resp.status, data: null };
        }
    }

    public async options<T>(url: string, init: CustomFetchProps) {
        const { headers, ...config } = init || {};

        const resp = await fetch(`${this.baseUrl}${url}`, {
            method: 'OPTIONS',
            headers: await this.getHeaders(headers),
            ...config,
        });

        return this.responseHandler<T>(resp) as Promise<{
            status: number;
            data: T;
        }>;
    }

    private async responseHandler<T>(response: Response) {
        const res = response as CustomResponse<T>;

        if (res.status === 200 || res.status === 201) {
            // Handle successful responses

            const data = await res.json();
            return { status: res.status, data: data as T };
        }
        if (res.status === 204) {
            return { status: res.status, data: null as T };
        }

        // Try to parse error response body
        let errorData;
        try {
            errorData = await res.json();
        } catch (error) {
            console.error('Error parsing response body:', error);
            errorData = { message: res.statusText || 'Unknown error' };
        }

        if (res.status === 400) {
            throw new BadRequestError(
                `Requisição retornou ${res.status} - ${res.statusText}`,
                errorData,
            );
        }

        if (res.status === 401) {
            throw new NetWorkError(
                `Não autorizado: ${res.statusText}`,
                res.status,
                errorData,
            );
        }

        if (res.status === 403) {
            throw new NetWorkError(
                `Acesso proibido: ${res.statusText}`,
                res.status,
                errorData,
            );
        }

        if (res.status === 404) {
            throw new NetWorkError(
                `Recurso não encontrado: ${res.statusText}`,
                res.status,
                errorData,
            );
        }

        if (res.status >= 500) {
            throw new NetWorkError(
                `Erro do servidor: ${res.statusText}`,
                res.status,
                errorData,
            );
        }

        throw new NetWorkError(
            `Requisição retornou ${res.status} - ${res.statusText}`,
            res.status,
            errorData,
        );
    }

    public async getHeaders(headers: HeadersInit = {}) {
        return {
            ...this.headers,
            ...headers,
        };
    }

    /**
     * Define novos headers para as proximas requisições
     * @param headers Headers a serem definidos
     */
    public setHeaders(headers: HeadersInit) {
        this.headers = headers;
    }
}

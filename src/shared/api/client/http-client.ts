import { cookies } from 'next/headers';
import { Client } from '../../types/client';
import {
    CustomFetchProps,
    CustomResponse,
    ResponseError,
    ValidationError,
} from '../../types/http';
import {
    BadRequestError,
    ForbiddenError,
    NetWorkError,
    NotFoundError,
    ServerError,
    UnauthorizedError,
} from './errors';

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

    /**
     * Performs a GET request to retrieve a Blob from the API
     * @param url API URL
     * @param init Request configuration
     * @returns Promise with the Blob data and status code
     * @throws {NetWorkError} For other network-related errors
     */
    public async getBlob(
        absoluteUrl: string,
        init?: CustomFetchProps,
    ): Promise<{
        status: number;
        data: Blob;
    }> {
        const { headers, ...config } = init || {};

        const resp = await fetch(absoluteUrl, {
            method: 'GET',
            headers: await this.getHeaders(headers),
            ...config,
        });

        if (!resp.ok) {
            throw new NetWorkError(
                `Requisição retornou ${resp.status} - ${resp.statusText}`,
                resp.status,
            );
        }
        const data = await resp.blob();
        return { status: resp.status, data };
    }

    protected async responseHandler<T>(response: Response) {
        const res = response as CustomResponse<T>;

        if (res.status === 200 || res.status === 201 || res.status === 204) {
            const data = await this.parseJson<T>(res);
            return { status: res.status, data: data as T };
        }

        if (res.status === 400) {
            throw new BadRequestError(
                `Requisição retornou ${res.status} - ${res.statusText}`,
                (await this.parseJson(res)) as ValidationError,
            );
        }

        if (res.status === 401) {
            throw new UnauthorizedError(
                `Não autorizado: ${res.statusText}`,
                await this.parseJson(res),
            );
        }

        if (res.status === 403) {
            throw new ForbiddenError(
                `Acesso proibido: ${res.statusText}`,
                await this.parseJson(res),
            );
        }

        if (res.status === 404) {
            throw new NotFoundError(
                `Recurso não encontrado: ${res.statusText}`,
                await this.parseJson(res),
            );
        }

        if (res.status >= 500) {
            throw new ServerError(
                `Erro do servidor: ${res.statusText}`,
                await this.parseJson(res),
            );
        }

        throw new NetWorkError(
            `Requisição retornou ${res.status} - ${res.statusText}`,
            res.status,
            await this.parseJson(res),
        );
    }

    protected async parseJson<T>(response: CustomResponse<T>) {
        try {
            return await response.json();
        } catch (e) {
            console.error('Error parsing JSON response:', e);
            return {
                type: 'ParseError',
                errors: [
                    {
                        code: 'JSON_PARSE_ERROR',
                        detail: 'Failed to parse JSON response',
                        attr: null,
                    },
                ],
            } as ResponseError;
        }
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

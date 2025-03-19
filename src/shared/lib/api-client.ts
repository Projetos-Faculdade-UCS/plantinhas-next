import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CustomFetchProps, CustomResponse } from './http';

/**
 * Classe singleton para gerenciar a instância da API.
 *
 * Ler doc para entender sobre o
 * [fetch e cache](https://nextjs.org/docs/app/api-reference/functions/fetch)
 * e sobre a
 * [remoção do cache](https://nextjs.org/docs/app/api-reference/functions/revalidateTag),
 *
 * Para habilitar cache:
 * `{ next: { revalidate: 10, tags: ['getCarros'] } }`
 *
 * Para remover o cache:
 * `revalidateTag('getCarros')`
 */
export class ApiClient {
    private static instance: ApiClient;
    private apiUrl = '';
    private headers: HeadersInit = {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        'Accept-Language': 'pt-br',
    };

    private constructor() {
        // if (!this.apiUrl) {
        //     throw new Error("API URL or API Key is not defined in the next.config environment variables.");
        // }
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    /**
     * Faz uma requisição GET para a API
     * @param url URL da API com search params já incluídos (ex: /users?name=John)
     * @param config Configurações da requisição
     * @template T Tipo do retorno da requisição
     * @returns Promise com o resultado da requisição
     */
    public async get<T>(url: string, init?: CustomFetchProps) {
        const { cache, ...config } = init || {};
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'GET',
            headers: await this.getHeaders(),
            cache: cache,
            ...config,
        });

        return this.responseHandler<T>(resp) as Promise<{
            status: number;
            data: T;
        }>;
    }

    /**
     *  Faz uma requisição POST para a API
     * @param url URL da API
     * @param body Corpo da requisição
     * @param config Configurações da requisição
     * @returns Promise com o resultado da requisição
     * @template T Tipo do retorno da requisição
     */
    public async post<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ) {
        const csrf = (await cookies()).get('csrftoken')?.value;

        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'POST',
            headers: {
                ...(await this.getHeaders()),
                'X-CSRF-Token': csrf || '',
            },
            body: JSON.stringify(body),
            ...init,
        });

        return this.responseHandler<T>(resp);
    }

    public async patch<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ) {
        const csrf = (await cookies()).get('csrftoken')?.value;

        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'PATCH',
            headers: {
                ...(await this.getHeaders()),
                'X-CSRF-Token': csrf || '',
            },
            body: JSON.stringify(body),
            ...init,
        });

        return this.responseHandler<T>(resp);
    }

    /**
     * Faz uma requisição DELETE para a API
     * @param url URL da API
     * @param config Configurações da requisição
     * @returns Promise com o resultado da requisição
     * @template T Tipo do retorno da requisição
     */
    public async delete(url: string, config?: CustomFetchProps) {
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'DELETE',
            headers: await this.getHeaders(),
            ...config,
        });

        if (resp.status === 204) {
            return { status: resp.status, data: null };
        }
    }

    // protected abstract put<T>(url: string, body: CustomFetchProps['body'], config: Omit<CustomFetchProps, 'body'>): Promise<T>;
    public async options<T>(url: string, config: CustomFetchProps) {
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'OPTIONS',
            headers: await this.getHeaders(),
            ...config,
        });

        return this.responseHandler<T>(resp) as Promise<{
            status: number;
            data: T;
        }>;
    }

    private async responseHandler<T>(response: Response) {
        const res = response as CustomResponse<T>;

        if ([200, 201, 400].includes(res.status)) {
            const data = await res.json();
            return { status: res.status, data: data };
        }
        if (res.status === 401) {
            redirect('/login');
        }

        throw new Error(
            `Requisição retornou ${res.status} - ${res.statusText}`,
        );
    }

    // private async getAuthToken(){
    //     const session = (await getServerSession(authConfig));
    //     return session?.apiKey;
    // }

    private async getHeaders() {
        return {
            ...this.headers,
            // Authorization: `Token ${await this.getAuthToken()}`
        };
    }
}

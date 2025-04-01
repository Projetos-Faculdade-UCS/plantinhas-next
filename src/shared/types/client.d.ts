import { BadRequest, CustomFetchProps } from './http';

/**
 * Interface for API client that manages requests to a specific endpoint.
 *
 * Read documentation to understand about
 * [fetch and cache](https://nextjs.org/docs/app/api-reference/functions/fetch)
 * and about
 * [cache invalidation](https://nextjs.org/docs/app/api-reference/functions/revalidateTag),
 *
 * To enable cache:
 * `{ next: { revalidate: 10, tags: ['getCarros'] } }`
 *
 * To remove cache:
 * `revalidateTag('getCarros')`
 */
export interface Client {
    /**
     * Performs a GET request to the API
     * @param url API URL with search params included (e.g., /users?name=John)
     * @param init Request configuration
     * @template T Type of the request response
     * @returns Promise with the request result
     */
    get<T>(
        url: string,
        init?: CustomFetchProps,
    ): Promise<{
        status: number;
        data: T | BadRequest;
    }>;

    /**
     * Performs a POST request to the API
     * @param url API URL
     * @param body Request body
     * @param init Request configuration
     * @template T Type of the request response
     * @returns Promise with the request result
     */
    post<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ): Promise<{
        status: number;
        data: T | BadRequest;
    }>;

    /**
     * Performs a PATCH request to the API
     * @param url API URL
     * @param body Request body
     * @param init Request configuration
     * @template T Type of the request response
     * @returns Promise with the request result
     */
    patch<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ): Promise<{
        status: number;
        data: T | BadRequest;
    }>;

    /**
     * Performs a DELETE request to the API
     * @param url API URL
     * @param config Request configuration
     * @returns Promise with the request result
     */
    delete(
        url: string,
        config?: CustomFetchProps,
    ): Promise<
        | {
              status: number;
              data: null;
          }
        | undefined
    >;

    /**
     * Performs an OPTIONS request to the API
     * @param url API URL
     * @param config Request configuration
     * @template T Type of the request response
     * @returns Promise with the request result
     */
    options<T>(
        url: string,
        config: CustomFetchProps,
    ): Promise<{
        status: number;
        data: T;
    }>;
}

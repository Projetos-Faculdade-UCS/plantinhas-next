export type CustomFetchProps = Omit<RequestInit, 'method'>;

export type BadRequest = { code: 'bad_request'; message: string };

export type CustomResponse<T> =
    | (Omit<Response, 'json'> & {
          status: 201 | 200 | 204;
          json: () => T | PromiseLike<T>;
      })
    | (Omit<Response, 'json'> & {
          status: 400 | 401 | 403 | 404 | 500 | 502 | 503;
          json: () => BadRequest | PromiseLike<BadRequest>;
      });

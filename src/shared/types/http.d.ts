export type CustomFetchProps = Omit<RequestInit, 'method'>;

export type ResponseError = { code: string; message: string };

export type ValidationError = {
    [key: string]: string[] | ValidationError[];
};

export type CustomResponse<T> =
    | (Omit<Response, 'json'> & {
          status: 201 | 200 | 204;
          json: () => T | PromiseLike<T>;
      })
    | (Omit<Response, 'json'> & {
          status: 401 | 403 | 404 | 500 | 502 | 503;
          json: () => ResponseError | PromiseLike<ResponseError>;
      })
    | (Omit<Response, 'json'> & {
          status: 400;
          json: () => ValidationError | PromiseLike<ValidationError>;
      });

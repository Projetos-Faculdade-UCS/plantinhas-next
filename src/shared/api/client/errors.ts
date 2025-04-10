import { ValidationError } from '@/shared/types/http';

export class NetWorkError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = 'NetworkError';
        this.status = status;
        this.data = data;
    }
}

export class BadRequestError extends NetWorkError {
    data!: ValidationError;

    constructor(message: string, data?: ValidationError) {
        super(message, 400, data);
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends NetWorkError {
    constructor(message: string, data?: unknown) {
        super(message, 401, data);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends NetWorkError {
    constructor(message: string, data?: unknown) {
        super(message, 403, data);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends NetWorkError {
    constructor(message: string, data?: unknown) {
        super(message, 404, data);
        this.name = 'NotFoundError';
    }
}

export class ServerError extends NetWorkError {
    constructor(message: string, data?: unknown) {
        super(message, 500, data);
        this.name = 'ServerError';
    }
}

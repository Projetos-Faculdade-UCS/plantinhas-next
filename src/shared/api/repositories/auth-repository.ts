import { SessionToken } from '@/shared/types/auth';
import { Client } from '@/shared/types/client';
import { HttpClient } from '../client/http-client';

export class AuthRepository {
    private url: string = process.env.AUTH_API_URL || '';
    private client: Client;

    constructor() {
        this.client = new HttpClient(this.url);
    }

    /**
     * Cria sessão para um usuário com o token do Google
     *
     * Caso o usuário ainda não exista, ele será criado
     *
     * @param googleToken token retornado pelo oauth do Google
     * @returns Promise<SessionToken>
     */
    public async googleSignIn(googleToken: string) {
        const response = await this.client.post<SessionToken>(
            '/auth/api/v1/google/',
            {},
            {
                headers: {
                    Authorization: `Bearer ${googleToken}`,
                },
            },
        );
        return response;
    }

    /**
     * Atualiza o token de acesso do usuário
     *
     * @param refreshToken token de atualização do usuário
     */
    public async refreshToken(refreshToken: string) {
        const response = await this.client.post<SessionToken>(
            '/auth/api/v1/refresh/', //TODO: este path está errado
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        );
        return response;
    }
}

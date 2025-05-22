import { ProfilePreview, SessionToken } from '@/shared/types/auth';
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
     * Retorna o informações básicas do usuário
     *
     * @param accessToken token da sessão do usuário
     */
    public async getUser(accessToken: string) {
        const response = await this.client.get<ProfilePreview>('/profile/', {
            cache: 'force-cache',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            id: String(response.data.user.id),
            username: response.data.user.username,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            picture: response.data.profile_picture,
        };
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

import { ProfilePreview } from '@/shared/types/auth';
import { Client } from '@/shared/types/client';
import { JWTClient } from '../client/jwt-client';
import { Repositories } from '../repositories';

export class ProfileRepository {
    private url: string = process.env.AUTH_API_URL || '';
    private client: Client;

    constructor() {
        this.client = new JWTClient(this.url);
    }

    /**
     * Retorna a própria classe para acesso estático
     */
    public get static(): typeof ProfileRepository {
        return ProfileRepository;
    }

    /**
     * Busca as informações básicas do usuário sem usar a sessão.
     * Útil para acessar informações do usuário antes de criar uma sessão.
     *
     * @param accessToken token retornado pela Api de autenticação
     * @returns Promise<SessionToken>
     */
    public static async getUser(accessToken: string) {
        const cli = Repositories.createHttpRepository(
            process.env.AUTH_API_URL || '',
        );
        const response = await cli.get<ProfilePreview>('/profile/', {
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
     * Retorna o informações básicas do usuário
     */
    public async getUser() {
        const response = await this.client.get<ProfilePreview>('/profile/', {
            cache: 'force-cache',
            next: {
                revalidate: 1000,
                tags: ['user'],
            },
        });
        return response;
    }
}

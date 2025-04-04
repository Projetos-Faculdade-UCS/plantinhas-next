import { UserPreview } from '@/shared/types/auth';
import { Client } from '@/shared/types/client';
import { JWTClient } from '../client/jwt-client';

export class ProfileService {
    private url: string = process.env.PROFILE_API_URL || '';
    private client: Client;

    constructor() {
        this.client = new JWTClient(this.url);
    }
    /**
     * Retorna o informações básicas do usuário
     */
    public async getUser() {
        const response = await this.client.get<UserPreview>('/profile/', {
            cache: 'force-cache',
            next: {
                revalidate: 1000,
                tags: ['user'],
            },
        });
        return response;
    }
}

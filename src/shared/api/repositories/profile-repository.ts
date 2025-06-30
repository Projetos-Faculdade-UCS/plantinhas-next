import { ProfilePreview } from '@/shared/types/auth';
import { Client } from '@/shared/types/client';
import { JWTClient } from '../client/jwt-client';

export class ProfileRepository {
    private url: string = process.env.AUTH_API_URL || '';
    private client: Client;

    constructor() {
        this.client = new JWTClient(this.url);
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

    /**
     * Retorna as habilidades existentes do usuário.
     * @returns Uma lista de strings representando as habilidades.
     *
     * TODO: No futuro, buscar de um endpoint de API.
     */
    public async getHabilidadesExistentes(): Promise<string[]> {
        // Dados mockados por enquanto
        return Promise.resolve([
            'Habilidade em jardinagem',
            'Conhecimento sobre plantas aromáticas',
            'Experiência com hortas urbanas',
        ]);
    }
}

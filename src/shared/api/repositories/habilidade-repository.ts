import { Client } from '@/shared/types/client';
import { Habilidade } from '@/shared/types/habilidades';
import { JWTClient } from '../client/jwt-client';

export class HabilidadeRepository {
    private url: string | undefined = process.env.HABILIDADES_API_URL;
    private client: Client;

    constructor() {
        if (!this.url) {
            throw new Error(
                'HABILIDADES_API_URL não está definida no ambiente.',
            );
        }
        this.client = new JWTClient(this.url);
    }

    public async getHabilidades() {
        return this.client.get<Habilidade[]>('/habilidades/', {
            next: {
                revalidate: 1000,
                tags: ['habilidades'],
            },
        });
    }
}

import { Client } from '@/shared/types/client';
import { Habilidade, MultiplicarXpResponse } from '@/shared/types/habilidades';
import { revalidateTag } from 'next/cache';
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

    public async getHabilidade(habilidadeId: number) {
        return this.client.get<Habilidade>(`/habilidades/${habilidadeId}/`, {
            next: {
                revalidate: 1000,
                tags: [`habilidade-${habilidadeId}`],
            },
        });
    }

    public async multiplicarXp(habilidadeId: number, multiplicadorXp: number) {
        const resp = await this.client.post<MultiplicarXpResponse>(
            `/habilidades/${habilidadeId}/multiplicar-xp/`,
            { multiplicador: multiplicadorXp },
        );

        revalidateTag(`habilidade-${habilidadeId}`);
        return resp;
    }
}

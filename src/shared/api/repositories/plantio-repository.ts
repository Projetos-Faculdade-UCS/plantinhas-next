import { Client } from '@/shared/types/client';
import { ListagemPlantios, Plantio } from '@/shared/types/plantio';
import { JWTClient } from '../client/jwt-client';

export class PlantioRepository {
    private url: string = process.env.PLANTIOS_API_URL || '';
    private client: Client;

    constructor() {
        this.client = new JWTClient(this.url);
    }
    /**
     * Retorna uma lista de plantios
     * @param page Página atual
     * @returns Retorna uma lista de plantios
     *
     * cache de 1 minuto
     */
    public async getPlantios(page?: number) {
        const params = new URLSearchParams();
        if (page) {
            params.append('page', page.toString());
        }
        return this.client.get<ListagemPlantios>(
            `/gerenciamento/plantios/?${params.toString()}`,
            {
                next: {
                    tags: ['plantios'],
                    revalidate: 0,
                },
            },
        );
    }
    /**
     * Retorna um plantio específico
     * @param id ID do plantio
     * @returns Retorna um plantio específico
     *
     * cache de 1 minuto
     */
    public async getPlantio(id: number) {
        return this.client.get<Plantio>(`/gerenciamento/plantios/${id}/`, {
            next: {
                tags: ['plantio', `${id}`],
                revalidate: 60,
            },
        });
    }
}

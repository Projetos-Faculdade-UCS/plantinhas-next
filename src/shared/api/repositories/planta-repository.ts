import { Client } from '@/shared/types/client';
import { Catalogo } from '@/shared/types/planta';
import { JWTClient } from '../client/jwt-client';

export class PlantaRepository {
    private url: string = process.env.PLANTAS_API_URL || '';
    private client: Client;

    constructor() {
        this.client = new JWTClient(this.url);
    }

    /**
     * Catálogo inicial de plantas separadas por categorias
     * @returns Retorna uma lista de categorias com as principais plantas
     */
    public async getCatalogo() {
        return this.client.get<Catalogo>('/gerenciamento/categorias/');
    }
}

import { getProgresSituacao } from '@/entities/card-plantio/lib/utils';
import { Client } from '@/shared/types/client';
import {
    FormPlantio,
    Plantio,
    PlantioPreview,
    RawPlantio,
    RawPlantioPreview,
} from '@/shared/types/plantio';
import { PagedResponse } from '@/shared/types/utils';
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
        const query = await this.client.get<PagedResponse<RawPlantioPreview>>(
            `/plantios/?${params.toString()}`,
            {
                next: {
                    tags: ['plantios'],
                    revalidate: 0,
                },
            },
        );
        // Adiciona a propriedade situacao com o valor correto
        const plantios: PlantioPreview[] = query.data.itens.map((plantio) => {
            return {
                ...plantio,
                situacao: {
                    label: plantio.situacao,
                    value: getProgresSituacao(plantio.situacao),
                },
            };
        });
        return {
            ...query,
            data: {
                ...query.data,
                itens: plantios,
            },
        };
    }
    /**
     * Cria um novo plantio
     * @param plantio Formulário com os dados do plantio
     * @returns Retorna o plantio criado
     */
    public async postPlantio(plantio: FormPlantio) {
        const query = await this.client.post<RawPlantioPreview>(
            '/plantios/',
            plantio,
        );
        const situacao: Plantio['situacao'] = {
            label: query.data.situacao,
            value: getProgresSituacao(query.data.situacao),
        };
        return {
            ...query,
            data: {
                ...query.data,
                situacao: situacao,
            },
        };
    }

    /**
     * Atualiza um plantio
     * @param id ID do plantio
     * @param plantio Formulário com os dados do plantio
     * @returns Retorna o plantio atualizado
     */
    public async updatePlantio(id: number, plantio: Partial<FormPlantio>) {
        const query = await this.client.patch<RawPlantio>(
            `/plantios/${id}/`,
            plantio,
        );
        const situacao: Plantio['situacao'] = {
            label: query.data.situacao,
            value: getProgresSituacao(query.data.situacao),
        };
        return {
            ...query,
            data: {
                ...query.data,
                situacao: situacao,
            },
        };
    }

    /**
     * Retorna um plantio específico
     * @param id ID do plantio
     * @returns Retorna um plantio específico
     *
     * cache de 1 minuto
     */
    public async getPlantio(id: number) {
        const query = await this.client.get<RawPlantio>(`/plantios/${id}/`, {
            next: {
                tags: ['plantio', `${id}`],
                revalidate: 0,
            },
        });

        const situacao: Plantio['situacao'] = {
            label: query.data.situacao,
            value: getProgresSituacao(query.data.situacao),
        };
        return {
            ...query,
            data: {
                ...query.data,
                situacao: situacao,
            },
        };
    }

    public async deletePlantio(plantioId: number) {
        const query = await this.client.delete(`/plantios/${plantioId}/`);
        return query;
    }
}

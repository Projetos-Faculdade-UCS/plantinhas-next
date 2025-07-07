import { getProgresSituacao } from '@/entities/card-plantio/lib/utils';
import { Client } from '@/shared/types/client';
import {
    Plantio,
    PlantioPreview,
    RawPlantio,
    RawPlantioPreview,
} from '@/shared/types/plantio';
import { TarefaPlantio } from '@/shared/types/tarefa';
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

    public async postPlantio(plantio: RawPlantio) {
        const query = await this.client.post<RawPlantio>('/plantios/', plantio);
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
    /**
     * Retorna as tarefas de um plantio específico
     * @param id ID do plantio
     * @returns Array de tarefas do plantio
     */
    public async getTarefasPlantio(id: number) {
        const tarefas = await this.client.get<TarefaPlantio[]>(
            `/plantios/${id}/tarefas/`,
        );
        return tarefas.data;
    }
}

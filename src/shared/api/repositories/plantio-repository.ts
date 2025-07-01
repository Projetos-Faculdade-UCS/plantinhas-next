import { getProgresSituacao } from '@/entities/card-plantio/utils';
import { Client } from '@/shared/types/client';
import {
    ListagemPlantios,
    Plantio,
    PlantioPreview,
    TarefaPlantio,
} from '@/shared/types/plantio';
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
        const plantiosData = await this.client.get<ListagemPlantios>(
            `/gerenciamento/plantios/?${params.toString()}`,
            {
                next: {
                    tags: ['plantios'],
                    revalidate: 0,
                },
            },
        );
        // Adiciona a propriedade situacao com o valor correto
        const plantioItens = plantiosData.data.itens.map((plantio) => {
            const situacao =
                plantio.situacao as unknown as PlantioPreview['situacao']['label'];
            plantio.situacao = {
                label: situacao,
                value: getProgresSituacao(situacao),
            };
            return plantio;
        });
        return {
            ...plantiosData,
            data: {
                ...plantiosData.data,
                itens: plantioItens,
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
        const plantioData = await this.client.get<Plantio>(
            `/gerenciamento/plantios/${id}/`,
            {
                next: {
                    tags: ['plantio', `${id}`],
                    revalidate: 0,
                },
            },
        );

        const situacaoPlantio = plantioData.data
            .situacao as unknown as PlantioPreview['situacao']['label'];
        plantioData.data.situacao = {
            label: situacaoPlantio,
            value: getProgresSituacao(situacaoPlantio),
        };
        return plantioData;
    }
    /**
     * Retorna as tarefas de um plantio específico
     * @param id ID do plantio
     * @returns Array de tarefas do plantio
     */
    public async getTarefasPlantio(id: number) {
        const tarefas = await this.client.get<TarefaPlantio[]>(
            `/gerenciamento/plantios/${id}/tarefas/`
        );
        return tarefas.data;
    }
}

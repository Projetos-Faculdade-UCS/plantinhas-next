import { Client } from '@/shared/types/client';
import {
    FormTarefas,
    TarefaPlantio,
    TarefaPlantioPreview,
    TarefaRealizadaResponse,
} from '@/shared/types/tarefa';
import { revalidateTag } from 'next/cache';
import { JWTClient } from '../client/jwt-client';

export class TarefaRepository {
    private url: string | undefined = process.env.TAREFAS_API_URL;
    private client: Client;

    constructor() {
        if (!this.url) {
            throw new Error('TAREFAS_API_URL is not defined');
        }
        this.client = new JWTClient(this.url);
    }

    /**
     * Retorna as tarefas de um plantio específico
     * @param id ID do plantio
     * @returns Array de tarefas do plantio
     */
    public async getTarefas(plantioId: number) {
        const tarefas = await this.client.get<TarefaPlantioPreview[]>(
            `/tarefas/?plantio_id=${plantioId}`,
            {
                next: {
                    revalidate: 60, // Revalida a cada 60 segundos
                    tags: ['tarefas', `plantio-${plantioId}`],
                },
            },
        );
        return {
            data: tarefas.data.reverse(),
            status: tarefas.status,
        };
    }

    /**
     * Cria novas tarefas para um plantio específico
     * @param tarefas Formulário com as tarefas a serem criadas
     * @returns Mensagem de sucesso e ID do plantio
     */
    public async postTarefas(tarefas: FormTarefas) {
        const query = await this.client.post<{
            message: string;
            plantioId: number;
            tarefas: TarefaPlantioPreview[];
        }>('/tarefas/', tarefas);
        return query;
    }

    public async getTarefa(tarefaId: number) {
        const tarefa = await this.client.get<TarefaPlantio>(
            `/tarefas/${tarefaId}/`,
            {
                next: {
                    revalidate: 60, // Revalida a cada 60 segundos
                    tags: [`tarefa-detail-${tarefaId}`],
                },
            },
        );
        return tarefa;
    }

    public async realizarTarefa(tarefaId: number) {
        const tarefa = await this.client.post<TarefaRealizadaResponse>(
            `/tarefas/${tarefaId}/realizar/`,
            {},
        );
        revalidateTag(`tarefa-detail-${tarefaId}`);
        revalidateTag('tarefas');
        revalidateTag('check-pendencias');
        return tarefa;
    }

    public async checkTarefasPendentes(plantioId: number) {
        const tarefasPendentes = await this.client.get<{
            message: string;
            count: number;
        }>(`/tarefas/check_pendencias/?plantio_id=${plantioId}`, {
            next: {
                revalidate: 60, // Revalida a cada 60 segundos
                tags: [`check-pendencias`, `check-pendencias-${plantioId}`],
            },
        });
        return tarefasPendentes;
    }
}

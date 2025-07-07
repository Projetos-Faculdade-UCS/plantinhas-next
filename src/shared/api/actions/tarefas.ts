'use server';

import { NetWorkError } from '../client/errors';
import { Repositories } from '../repositories';

export async function getDetalheTarefa(tarefaId: number) {
    try {
        const resp = await Repositories.tarefas.getTarefa(tarefaId);
        return { data: resp.data };
    } catch (error) {
        console.error(error);
        return {
            error:
                error instanceof NetWorkError
                    ? error.message
                    : 'Erro ao buscar detalhes da tarefa.',
        };
    }
}

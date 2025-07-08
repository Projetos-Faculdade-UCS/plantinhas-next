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

export async function realizarTarefa(tarefaId: number) {
    try {
        const { data: atualizarHabilidade } =
            await Repositories.tarefas.realizarTarefa(tarefaId);

        const { data: habilidade } =
            await Repositories.habilidades.getHabilidade(
                atualizarHabilidade.habilidade.id,
            );

        const { data: novoXP } = await Repositories.habilidades.multiplicarXp(
            atualizarHabilidade.habilidade.id,
            atualizarHabilidade.habilidade.multiplicadorXp,
        );
        return {
            data: {
                habilidade,
                uppouNivel:
                    (habilidade.detalhes?.nivel || 0) < novoXP.novoNivel,
                novoNivel: novoXP.novoNivel,
                xpGanho: novoXP.xpGanho,
                mensagem: novoXP.status,
            },
            code: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            error:
                error instanceof NetWorkError
                    ? error.message
                    : 'Erro ao realizar tarefa.',
        };
    }
}

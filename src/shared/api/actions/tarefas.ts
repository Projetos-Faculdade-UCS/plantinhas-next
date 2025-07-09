'use server';

import { TarefaPlantio } from '@/shared/types/tarefa';
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

export async function realizarTarefa(tarefa: TarefaPlantio) {
    try {
        const { data: atualizarHabilidade } =
            await Repositories.tarefas.realizarTarefa(tarefa.id);

        if (tarefa.tipo === 'cultivo') {
            await Repositories.plantios.updatePlantio(tarefa.plantioId, {
                situacao: 'Germinando',
            });
        }

        const { data: habilidadeAntes } =
            await Repositories.habilidades.getHabilidade(
                atualizarHabilidade.habilidade.id,
            );

        const { data: novoXP } = await Repositories.habilidades.multiplicarXp(
            atualizarHabilidade.habilidade.id,
            atualizarHabilidade.habilidade.multiplicadorXp,
        );

        return {
            data: {
                uppouNivel:
                    (habilidadeAntes.detalhes?.nivel || 0) < novoXP.novoNivel,
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

export async function checkTarefasPendentes(plantioId: number) {
    try {
        const { data: tarefasPendentes } =
            await Repositories.tarefas.checkTarefasPendentes(plantioId);
        return tarefasPendentes.count > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

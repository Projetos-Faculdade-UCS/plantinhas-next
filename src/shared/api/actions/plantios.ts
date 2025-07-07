'use server';

import { AISaidaPlantio } from '@/shared/types/ai';
import { FormPlantio } from '@/shared/types/plantio';
import { FormTarefas } from '@/shared/types/tarefa';
import { Repositories } from '../repositories';

export async function createPlantio(
    plantioGerado: AISaidaPlantio,
    plantaId: number,
) {
    const hoje = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    const plantio: FormPlantio = {
        planta_id: plantaId,
        data_plantio: hoje,
        data_colheita: plantioGerado.data_fim_plantio,
        saude: 1,
        sede: 1,
        situacao: 'Para plantar',
        informacoes_adicionais: plantioGerado.informacoes_adicionais || '',
    };

    const tarefas: FormTarefas['tarefas'] = plantioGerado.tarefas.map(
        (tarefa) => ({
            ...tarefa,
            habilidade: {
                id: Number(tarefa.habilidade.id),
                multiplicador_xp: tarefa.habilidade.multiplicador_xp,
            },
        }),
    );
    try {
        const plantioCriado = await Repositories.plantios
            .postPlantio(plantio)
            .then((response) => {
                console.log('Plantio criado com sucesso:', response.data);
                return response.data;
            });

        const tarefasCriadas = await Repositories.tarefas
            .postTarefas({ plantio_id: plantioCriado.id, tarefas })
            .then((response) => {
                console.log('Tarefas criadas com sucesso:', response.data);
                return response.data;
            });

        return {
            data: {
                plantio: plantioCriado,
                tarefas: tarefasCriadas.tarefas,
            },
            code: 201,
        };
    } catch (error) {
        console.error('Erro ao criar plantio:', error);
        return {
            code: 500,
            error: 'Erro ao criar plantio',
        };
    }
}

export async function deletePlantio(plantioId: number) {
    try {
        const response = await Repositories.plantios.deletePlantio(plantioId);
        return response;
    } catch (error) {
        console.error('Erro ao deletar plantio:', error);
        return {
            status: 500,
            error: 'Erro ao deletar plantio',
        };
    }
}

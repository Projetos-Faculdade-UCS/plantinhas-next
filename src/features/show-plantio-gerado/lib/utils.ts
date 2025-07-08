import { AISaidaPlantio } from '@/shared/types/ai';
import { PlantaPreview } from '@/shared/types/planta';
import { PlantioPreview } from '@/shared/types/plantio';
import { TarefaPlantio, TarefaPlantioPreview } from '@/shared/types/tarefa';

export function getPlantioFake(plantaId: PlantaPreview['id']) {
    return {
        id: 999,
        plantaId: plantaId,
        quantidade: 1,
        saude: {
            value: 1,
            label: 'Saudável',
        },
        sede: {
            value: 1,
            label: 'Sede',
        },
        situacao: {
            value: 0,
            label: 'Para plantar',
        },
    } as PlantioPreview;
}

export function getTarefasFake(tarefas: AISaidaPlantio['tarefas']) {
    return tarefas.map(
        (tarefa) =>
            ({
                ...tarefa,
                tipo: tarefa.tipo as TarefaPlantio['tipo'],
                quantidadeTotal: tarefa.quantidade_total,
                quantidadeCompletada: 0, // Placeholder for now
                concluido: false, // Placeholder for now
                podeRealizarTarefa: false, // Placeholder for now
                id: Math.floor(Math.random() * 1000), // Unique ID for each task
                ultimaAlteracao: new Date().toISOString(),
            }) as TarefaPlantioPreview,
    );
}

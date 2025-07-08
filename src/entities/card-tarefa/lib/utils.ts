import { TarefaPlantioPreview } from '@/shared/types/tarefa';

export const getTarefaImage = (tipo: TarefaPlantioPreview['tipo']) => {
    return `/assets/thumbnail-tarefas/${tipo}.png`;
};

export const getBadgeStatus = (
    concluido: boolean,
    podeRealizarTarefa: boolean,
) => {
    if (concluido) return 'concluido';
    if (podeRealizarTarefa) return 'alerta';
    return null;
};

export const getBgColor = (tipo: TarefaPlantioPreview['tipo']) => {
    switch (tipo) {
        case 'colheita':
            return '#FFCDD2'; // Light green
        case 'cultivo':
            return '#F0F4C3'; // Light yellow
        case 'inspecao':
            return '#B3E5FC'; // Light blue
        case 'irrigacao':
            return '#FFECB3'; // Light purple
        case 'nutricao':
            return '#D7CCC8'; // light brown
        case 'poda':
            return '#EEEEEE'; // light gray
        default:
            return '#FFFFFF'; // Default white
    }
};

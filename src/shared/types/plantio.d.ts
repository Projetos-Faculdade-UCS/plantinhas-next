import { PlantaPreview } from './planta';

export interface Plantio {
    id: number;
    planta: PlantaPreview;
    situacao: {
        value: number;
        label:
            | 'Germinando'
            | 'Crescendo'
            | 'Florescendo'
            | 'Frutificando'
            | 'Pronto para colheita'
            | 'Colhido'
            | 'Para plantar';
    };
    saude: {
        label: string;
        value: number;
    };
    sede: {
        label: string;
        value: number;
    };
    quantidade: number;
    dataPlantio: string;
    dataColheita: string;
    informacoesAdicionais: string;
}

export type PlantioPreview = Pick<
    Plantio,
    'id' | 'planta' | 'situacao' | 'saude' | 'sede' | 'quantidade'
>;

export interface ListagemPlantios {
    total: number;
    itensPorPagina: number;
    paginaAtual: number;
    ultimaPagina: number;
    itens: PlantioPreview[];
}

export interface TarefaPlantio {
    id: number;
    descricao: string;
    ultimaAlteracao: string; // ISO date string
    frequencia: 'Diária' | 'Semanal' | 'Mensal' | 'Anual';
    quantidadeTotal: number;
    quantidadeCompletada: number;
    status: 'Pendente' | 'Concluído'
}
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
    dataPlantio: string;
    dataColheita: string;
    informacoesAdicionais: string;
}

export type PlantioPreview = Pick<
    Plantio,
    'id' | 'planta' | 'situacao' | 'saude' | 'sede'
>;

export interface ListagemPlantios {
    total: number;
    itensPorPagina: number;
    paginaAtual: number;
    ultimaPagina: number;
    itens: PlantioPreview[];
}

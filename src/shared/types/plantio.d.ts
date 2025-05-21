import { PlantaPreview } from './planta';

export interface Plantio {
    id: number;
    planta: PlantaPreview;
    situacao:
        | 'Plantado'
        | 'Germinando'
        | 'Crescendo'
        | 'Florescendo'
        | 'Frutificando'
        | 'Pronto para colheita'
        | 'Colhido'
        | 'Finalizado';
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

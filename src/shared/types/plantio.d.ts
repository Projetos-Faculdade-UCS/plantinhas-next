type SituacaoPlantio =
    | 'Germinando'
    | 'Crescendo'
    | 'Florescendo'
    | 'Frutificando'
    | 'Pronto para colheita'
    | 'Colhido'
    | 'Para plantar';

export interface Plantio {
    id: number;
    plantaId: number;
    situacao: {
        value: number;
        label: SituacaoPlantio;
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
    'id' | 'plantaId' | 'situacao' | 'saude' | 'sede' | 'quantidade'
>;

/**
 * Representação de um plantio da forma que vem da API.
 * Esta representação é usada para mapear os dados recebidos da API e
 * transformá-los na estrutura esperada pelo frontend.
 */
export type RawPlantio = Omit<Plantio, 'situacao'> & {
    situacao: SituacaoPlantio;
};

export type RawPlantioPreview = Pick<
    RawPlantio,
    'id' | 'plantaId' | 'situacao' | 'saude' | 'sede' | 'quantidade'
>;

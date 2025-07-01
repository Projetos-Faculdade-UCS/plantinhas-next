export interface Plantio {
    id: number;
    plantaId: number;
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

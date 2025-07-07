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

export interface TarefaPlantio {
    id: number;
    nome: string;
    concluido: boolean;
    dataProximaOcorrencia: string;
    podeConcluirTarefa: boolean;
    tipo:
        | 'cultivo'
        | 'irrigacao'
        | 'nutricao'
        | 'inspecao'
        | 'poda'
        | 'colheita';
    quantidadeTotal: number;
    quantidadeCompletada: number;
    ultimaAlteracao: string;
    frequencia: string;
    habilidadeRequerida: number;
    tutorial: {
        materiais: [
            {
                nome: string;
                quantidade: number;
                unidade: string;
            },
        ];
        etapas: [
            {
                descricao: string;
                ordem: number;
            },
        ];
    };
}

export type TarefaPlantioPreview = Pick<
    TarefaPlantio,
    | 'id'
    | 'concluido'
    | 'podeConcluirTarefa'
    | 'nome'
    | 'quantidadeTotal'
    | 'quantidadeCompletada'
    | 'ultimaAlteracao'
    | 'tipo'
>;

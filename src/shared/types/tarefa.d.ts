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

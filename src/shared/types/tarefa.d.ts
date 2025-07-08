export interface TarefaPlantio {
    id: number;
    nome: string;
    concluido: boolean;
    dataProximaOcorrencia: string;
    podeRealizarTarefa: boolean;
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
    | 'nome'
    | 'concluido'
    | 'tipo'
    | 'quantidadeTotal'
    | 'quantidadeCompletada'
    | 'ultimaAlteracao'
    | 'podeRealizarTarefa'
>;

export type FormTarefas = {
    plantio_id: number;
    tarefas: {
        nome: string;
        tipo: TarefaPlantio['tipo'];
        quantidade_total: number;
        cron: string;
        habilidade: {
            id: number;
            multiplicador_xp: number;
        };
        tutorial: {
            materiais: {
                nome: string;
                quantidade: number;
                unidade: string;
            }[];
            etapas: {
                descricao: string;
                ordem: number;
            }[];
        };
    }[];
};

export type TarefaRealizadaResponse = {
    message: string;
    habilidade: {
        id: number;
        multiplicadorXp: number;
    };
};

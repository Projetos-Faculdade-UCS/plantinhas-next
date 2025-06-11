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
    nome: string;
    status: 'Pendente' | 'Concluído'
    tipo: 'cultivo', 'irrigacao', 'nutricao' , 'inspecao', 'poda', 'colheita';
    quantidadeTotal: number;
    quantidadeCompletada: number;
    ultimaAlteracao: string; // ISO date string
    frequencia: string; // pesquisar lib para transformar cron em frequencia(?)
    habilidadeRequerida: number,
    tutorial: {
        materiais: [
            {
            nome: string,
            quantidade: number,
            unidade: string
            },
        ],
        etapas: [
            {
            descricao: string,
            ordem: number
            },
        ]
    }
}
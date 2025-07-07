import { Planta } from './planta';

export interface IAEntradaPlantio {
    data_inicio_plantio: string;
    planta: {
        nome: Planta['nome'];
        nome_cientifico: Planta['nomeCientifico'];
        dificuldade: Planta['dificuldade'];
        dias_maturidade: Planta['diasMaturidade'];
        temperatura_minima: Planta['temperaturaMinima'];
        temperatura_maxima: Planta['temperaturaMaxima'];
        temperatura_ideal: Planta['temperaturaIdeal'];
    };
    quantidade: number;
    ambiente: string;
    sistemaCultivo: string;
    informacoes_adicionais: string;
    habilidades_existentes: Habilidade[];
}

export interface AISaidaPlantio {
    data_fim_plantio: string;
    informacoes_adicionais?: string;
    tarefas: IATarefa[];
}

export interface IATarefa {
    nome: string;
    tipo: string;
    quantidade_total: number;
    cron: string;
    habilidade: IAHabilidade;
    tutorial: IATutorial;
}

export interface IAHabilidade {
    id: string;
    multiplicador_xp: number;
}

export interface IATutorial {
    materiais: {
        nome: string;
        quantidade: string;
        unidade: string;
    }[];
    etapas: {
        descricao: string;
        ordem: number;
    }[];
}

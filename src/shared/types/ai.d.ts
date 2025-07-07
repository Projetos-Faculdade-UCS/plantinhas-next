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

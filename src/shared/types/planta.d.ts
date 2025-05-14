import { ValueLabel } from './index';

export interface Planta {
    id: number;
    nome: string;
    nomeCientifico: string;
    foto?: string;
    descricao: string;
    estacaoIdeal: 'Outono' | 'Verão' | 'Inverno' | 'Primavera' | 'Todo o ano';
    teparaturaIdeal: {
        minima: number;
        maxima: number;
    };
    categoria: CategoriaPreview;
    subCategorias: string[];
    dificuldade: ValueLabel;
}

export type PlantaPreview = Pick<
    Planta,
    'id' | 'nome' | 'foto' | 'dificuldade'
>;

export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    quantidadePlantas: number;
}

export type CategoriaPreview = Pick<Categoria, 'id' | 'nome' | 'descricao'>;

export interface ListagemCategorias {
    quantidade: number;
    items: (Categoria & { plantas: PlantaPreview[] })[];
}

export interface ListagemPlantas {
    total: number;
    itensPorPagina: number;
    paginaAtual: number;
    ultimaPagina: number;
    itens: PlantaPreview[];
}

export interface Planta {
    id: number;
    nome: string;
    nomeCientifico: string;
    foto?: string;
    horasSol: string;
    descricao: string;
    estacaoIdeal: 'Outono' | 'Verão' | 'Inverno' | 'Primavera' | 'Todo o ano';
    temperaturaMinima: number;
    temperaturaMaxima: number;
    temperaturaIdeal: number;
    categoria: Categoria;
    subcategorias: SubcategoriaPreview[];
    dificuldade: {
        label: string;
        value: number;
    };
}

export type PlantaPreview = Pick<
    Planta,
    'id' | 'nome' | 'foto' | 'dificuldade' | 'nomeCientifico' | 'temperatura'
>;

export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    quantidadePlantas: number;
}

export type CategoriaPreview = Pick<Categoria, 'id' | 'nome' | 'descricao'>;

export interface SubcategoriaPreview {
    id: number;
    nome: string;
    descricao: string;
}

export interface ListagemCategorias {
    total: number;
    itensPorPagina: number;
    paginaAtual: number;
    ultimaPagina: number;
    itens: (Categoria & { plantas: PlantaPreview[] })[];
}

export interface ListagemPlantas {
    total: number;
    itensPorPagina: number;
    paginaAtual: number;
    ultimaPagina: number;
    itens: PlantaPreview[];
}

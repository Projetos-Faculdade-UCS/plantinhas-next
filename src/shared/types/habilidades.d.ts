export interface Habilidade {
    id: number;
    nome: string;
    descricao: string;
    detalhes: DetalhesHabilidade;
}

export interface DetalhesHabilidade {
    xp: string;
    nivel: number;
    xpParaUpar: number;
    porcentagem: number;
}

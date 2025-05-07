export interface PlantaPreview {
    id: number;
    name: string;
    foto?: string;
}

export interface Catalogo {
    quantidade: number;
    items: {
        id: number;
        nome: string;
        quantidadePlantas: number;
        plantas: PlantaPreview[];
    }[];
}

import { PlantioPreview } from '@/shared/types/plantio';

export const getProgresSituacao = (
    situacao: PlantioPreview['situacao']['label'],
) => {
    switch (situacao) {
        case 'Colhido':
            return 1.1;
        case 'Pronto para colheita':
            return 1;
        case 'Frutificando':
            return 0.9;
        case 'Florescendo':
            return 0.8;
        case 'Crescendo':
            return 0.7;
        case 'Germinando':
            return 0.6;
        case 'Para plantar':
            return 0;
    }
};

import { PlantioPreview } from '@/shared/types/plantio';

export const getProgresSituacao = (
    situacao: PlantioPreview['situacao']['label'],
) => {
    switch (situacao) {
        case 'Colhido':
            return 1.1;
        case 'Pronto para colheita':
            return 0.5;
        case 'Frutificando':
            return 0.4;
        case 'Florescendo':
            return 0.3;
        case 'Crescendo':
            return 0.2;
        case 'Germinando':
            return 0.1;
        case 'Para plantar':
            return 0;
    }
};

import { Habilidade } from '@/shared/types/habilidades';

export function getImagemHabilidade(nome: Habilidade['nome']): string {
    const base = '/assets/thumbnail-habilidades/';
    switch (nome) {
        case 'Preparação do solo':
            return `${base}1.png`;
        case 'Seleção e plantio de sementes':
            return `${base}1.png`;
        case 'Irrigação eficiente':
            return `${base}4.png`;
        case 'Controle de pragas e doenças':
            return `${base}2.png`;
        case 'Colheita e pós-colheita':
            return `${base}3.png`;
        default:
            return `${base}4.png`; // Imagem padrão caso não encontre a habilidade
    }
}

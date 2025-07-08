'use client';
import { AISaidaPlantio } from '@/shared/types/ai';
import { PlantaPreview } from '@/shared/types/planta';
import { createContext, useContext } from 'react';

export interface PlantioAiContextType {
    show: boolean;
    plantioGerado?: AISaidaPlantio;
    plantaId?: PlantaPreview['id'];
    onClose: () => void;
    openWith: (plantio: AISaidaPlantio, plantaId: PlantaPreview['id']) => void;
}

export const PlantioAiContext = createContext<PlantioAiContextType | undefined>(
    undefined,
);

export function usePlantioAi() {
    const context = useContext(PlantioAiContext);
    if (!context) {
        throw new Error(
            'usePlantioGerado deve ser usado dentro de um PlantioGeradoProvider',
        );
    }
    return context;
}

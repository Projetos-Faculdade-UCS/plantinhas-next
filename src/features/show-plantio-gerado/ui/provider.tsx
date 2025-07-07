'use client';
import { AISaidaPlantio } from '@/shared/types/ai';
import { useCallback, useState } from 'react';
import { PlantioAiContext } from '../lib/context';

type PlantioGeradoProviderProps = {
    children: React.ReactNode;
};

export function PlantioAiProvider({ children }: PlantioGeradoProviderProps) {
    const [show, setShow] = useState(false);
    const [plantaId, setPlantaId] = useState<number | undefined>(undefined);
    const [plantioGerado, setPlantioGerado] = useState<
        AISaidaPlantio | undefined
    >();

    const onClose = useCallback(() => {
        setShow(false);
        setPlantaId(undefined);
        setPlantioGerado(undefined);
    }, []);

    const openWith = useCallback(
        (plantio?: AISaidaPlantio, plantaId?: number) => {
            setPlantioGerado(plantio);
            setPlantaId(plantaId);
            setShow(true);
        },
        [],
    );

    const value = {
        show,
        plantioGerado,
        plantaId,
        onClose,
        openWith,
    };

    return (
        <PlantioAiContext.Provider value={value}>
            {children}
        </PlantioAiContext.Provider>
    );
}

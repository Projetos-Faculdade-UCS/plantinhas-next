import { PlantaPreview } from '@/shared/types/planta';
import { Card } from '@/shared/ui/card';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { ListaPlantasPreview } from './lista-plantas-preview';
import { PlantaPreviewPanel } from './planta-preview-panel';
type PokedexProps = {
    control: Control<NewPlantioForm>;
    isBusy?: boolean;
};
export function Pokedex({ control, isBusy = false }: PokedexProps) {
    const [plantaSelecionada, setPlantaSelecionada] =
        useState<PlantaPreview | null>(null);
    return (
        <div className="flex h-[350px]">
            <Card className="w-fit shrink-0 rounded-r-none border">
                <ListaPlantasPreview
                    onSelectPlanta={(planta) => setPlantaSelecionada(planta)}
                />
            </Card>
            <Card className="grow rounded-l-none border-l-0">
                <PlantaPreviewPanel
                    control={control}
                    isBusy={isBusy}
                    planta={plantaSelecionada}
                />
            </Card>
        </div>
    );
}

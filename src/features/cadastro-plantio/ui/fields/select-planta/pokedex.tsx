import { NewPlantioForm } from '@/features/cadastro-plantio/lib/cadastro-plantio.schema';
import { getPlantaById } from '@/shared/api/actions/plantas';
import { PlantaPreview } from '@/shared/types/planta';
import { Card } from '@/shared/ui/card';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { ListaPlantasPreview } from './lista-plantas-preview';
import { PlantaPreviewPainel } from './planta-preview-panel';
type PokedexProps = {
    control: Control<NewPlantioForm>;
    isBusy?: boolean;
};
export function Pokedex({ control, isBusy = false }: PokedexProps) {
    const [plantaSelecionada, setPlantaSelecionada] =
        useState<PlantaPreview | null>(null);
    const plantaIdController = useController({
        name: 'plantaId',
        control,
    });

    useEffect(() => {
        if (plantaIdController.field.value && !plantaSelecionada) {
            getPlantaById(plantaIdController.field.value).then(
                ({ data: planta }) => {
                    if (planta) {
                        setPlantaSelecionada({
                            id: planta.id,
                            nome: planta.nome,
                            foto: planta.foto,
                            dificuldade: planta.dificuldade,
                        });
                    }
                },
            );
        }
    }, [plantaIdController.field.value, plantaSelecionada]);

    return (
        <div className="flex h-[300px]">
            <Card className="bg-muted w-fit shrink-0 rounded-r-none border pt-4 pb-1">
                <ListaPlantasPreview
                    onSelectPlanta={(planta) => {
                        plantaIdController.field.onChange(planta.id);
                        setPlantaSelecionada(planta);
                    }}
                />
            </Card>
            <Card className="grow rounded-l-none border-l-0 px-0 py-4">
                <PlantaPreviewPainel
                    control={control}
                    isBusy={isBusy}
                    planta={plantaSelecionada}
                    hasError={!!plantaIdController.formState.errors.plantaId}
                />
            </Card>
        </div>
    );
}

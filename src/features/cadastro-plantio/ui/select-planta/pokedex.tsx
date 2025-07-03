import { getPlantaById } from '@/shared/api/actions/plantas';
import { PlantaPreview } from '@/shared/types/planta';
import { Card } from '@/shared/ui/card';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
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
        <div className="flex h-[350px]">
            <Card className="w-fit shrink-0 rounded-r-none border">
                <ListaPlantasPreview
                    onSelectPlanta={(planta) => {
                        plantaIdController.field.onChange(planta.id);
                        setPlantaSelecionada(planta);
                    }}
                />
            </Card>
            <Card className="grow rounded-l-none border-l-0">
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
